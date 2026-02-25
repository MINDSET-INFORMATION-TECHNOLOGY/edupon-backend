"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../generated/prisma/enums");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuthDto) {
        const hashed = await bcrypt.hash(createAuthDto.password, 10);
        try {
            const user = await this.prisma.user.create({
                data: {
                    ...createAuthDto,
                    password: hashed,
                },
            });
            delete user.password;
            return user;
        }
        catch (e) {
            if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
                throw new common_1.BadRequestException('Email already in use');
            }
            throw e;
        }
    }
    async findAll() {
        return this.prisma.user.findMany({ omit: { password: true } });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id.toString() },
            omit: { password: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, updateAuthDto) {
        if (updateAuthDto.password) {
            updateAuthDto.password = await bcrypt.hash(updateAuthDto.password, 10);
        }
        const user = await this.prisma.user.update({
            where: { id: id.toString() },
            data: updateAuthDto,
            omit: { password: true },
        });
        return user;
    }
    async remove(id) {
        const user = await this.prisma.user.delete({
            where: { id: id.toString() },
            omit: { password: true },
        });
        return user;
    }
    async signInWithProviderCallback(provider, dto) {
        if (dto.password !== dto.confirmPassword) {
            throw new common_1.BadRequestException('Password and confirm password do not match');
        }
        const tokens = await this.exchangeCodeForToken(provider, dto.code);
        const profile = await this.fetchProviderProfile(provider, tokens.accessToken);
        const payload = {
            providerUserId: profile.providerUserId,
            email: profile.email,
            fullname: profile.fullname,
            avatar: profile.avatar,
            role: dto.role,
            institution: dto.institution,
            area_of_interest: dto.area_of_interest,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            password: dto.password,
        };
        return this.upsertSocialProvider(provider, payload);
    }
    getProviderSignInUrl(provider) {
        const config = this.getProviderConfig(provider);
        const state = (0, crypto_1.randomUUID)();
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: config.clientId,
            redirect_uri: config.callbackUrl,
            scope: config.scopes.join(' '),
            state,
        });
        return {
            url: `${config.authorizationUrl}?${params.toString()}`,
            state,
        };
    }
    getProviderConfig(provider) {
        if (provider === enums_1.AuthProviderType.GOOGLE) {
            return this.validateProviderConfig(provider, {
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
                callbackUrl: process.env.GOOGLE_CALLBACK_URL ?? '',
                authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
                tokenUrl: 'https://oauth2.googleapis.com/token',
                scopes: ['openid', 'email', 'profile'],
            });
        }
        return this.validateProviderConfig(provider, {
            clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
            callbackUrl: process.env.LINKEDIN_CALLBACK_URL ?? '',
            authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
            tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
            scopes: ['openid', 'profile', 'email'],
        });
    }
    validateProviderConfig(provider, config) {
        if (!config.clientId || !config.clientSecret || !config.callbackUrl) {
            throw new common_1.BadRequestException(`Missing OAuth configuration for provider: ${provider}`);
        }
        return config;
    }
    async exchangeCodeForToken(provider, code) {
        const config = this.getProviderConfig(provider);
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            redirect_uri: config.callbackUrl,
        });
        const response = await fetch(config.tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        const tokenPayload = (await response.json().catch(() => ({})));
        if (!response.ok || !tokenPayload.access_token) {
            throw new common_1.BadRequestException(tokenPayload?.error_description ?? tokenPayload?.error ?? 'Failed to exchange OAuth code for access token');
        }
        return {
            accessToken: tokenPayload.access_token,
            refreshToken: tokenPayload.refresh_token,
        };
    }
    async fetchProviderProfile(provider, accessToken) {
        if (provider === enums_1.AuthProviderType.GOOGLE) {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const payload = (await response.json().catch(() => ({})));
            if (!response.ok || !payload.sub || !payload.email) {
                throw new common_1.BadRequestException('Failed to fetch Google user profile');
            }
            const fullname = payload.name?.trim() ||
                [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
                payload.email;
            return {
                providerUserId: payload.sub,
                email: payload.email,
                fullname,
                avatar: typeof payload.picture === 'string' ? payload.picture : undefined,
            };
        }
        const response = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const payload = (await response.json().catch(() => ({})));
        if (!response.ok || !payload.sub || !payload.email) {
            throw new common_1.BadRequestException('Failed to fetch LinkedIn user profile');
        }
        const fullname = payload.name?.trim() ||
            [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
            payload.email;
        return {
            providerUserId: payload.sub,
            email: payload.email,
            fullname,
            avatar: typeof payload.picture === 'string'
                ? payload.picture
                : typeof payload.picture?.url === 'string'
                    ? payload.picture.url
                    : undefined,
        };
    }
    async findOrCreateSocialUser(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            if (dto.avatar && existingUser.avatar !== dto.avatar) {
                return this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: { avatar: dto.avatar },
                });
            }
            return existingUser;
        }
        try {
            return await this.prisma.user.create({
                data: {
                    email: dto.email,
                    fullname: dto.fullname,
                    password: await bcrypt.hash(dto.password ?? (0, crypto_1.randomUUID)(), 10),
                    role: dto.role ?? enums_1.Role.STUDENT,
                    institution: dto.institution,
                    area_of_interest: dto.area_of_interest,
                    avatar: dto.avatar,
                },
            });
        }
        catch (e) {
            if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
                throw new common_1.BadRequestException('Email already in use');
            }
            throw e;
        }
    }
    async upsertSocialProvider(provider, dto) {
        const existingProvider = await this.prisma.authProvider.findUnique({
            where: {
                provider_providerUserId: {
                    provider,
                    providerUserId: dto.providerUserId,
                },
            },
            include: {
                user: { omit: { password: true } },
            },
        });
        if (existingProvider) {
            if (dto.avatar && existingProvider.user.avatar !== dto.avatar) {
                return this.prisma.user.update({
                    where: { id: existingProvider.user.id },
                    data: { avatar: dto.avatar },
                    omit: { password: true },
                });
            }
            return existingProvider.user;
        }
        const resolvedPayload = await this.resolveSocialSignInPayload(provider, dto);
        const user = await this.findOrCreateSocialUser(resolvedPayload);
        await this.prisma.authProvider.upsert({
            where: {
                userId_provider: {
                    userId: user.id,
                    provider,
                },
            },
            update: {
                providerUserId: resolvedPayload.providerUserId,
                accessToken: resolvedPayload.accessToken,
                refreshToken: resolvedPayload.refreshToken,
            },
            create: {
                userId: user.id,
                provider,
                providerUserId: resolvedPayload.providerUserId,
                accessToken: resolvedPayload.accessToken,
                refreshToken: resolvedPayload.refreshToken,
            },
        });
        return this.prisma.user.findUnique({
            where: { id: user.id },
            omit: { password: true },
        });
    }
    async resolveSocialSignInPayload(provider, dto) {
        let { email, fullname, avatar } = dto;
        if ((!email || !fullname || !avatar) && dto.accessToken) {
            const profile = await this.fetchProviderProfile(provider, dto.accessToken);
            email = email ?? profile.email;
            fullname = fullname ?? profile.fullname;
            avatar = avatar ?? profile.avatar;
        }
        if (!email || !fullname) {
            throw new common_1.BadRequestException('Email and fullname are required for first-time social sign-in. Provide them directly or include accessToken.');
        }
        return {
            ...dto,
            email,
            fullname,
            avatar,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map