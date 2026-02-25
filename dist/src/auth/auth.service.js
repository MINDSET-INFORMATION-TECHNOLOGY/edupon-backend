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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../generated/prisma/enums");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    static { AuthService_1 = this; }
    prisma;
    mailService;
    static OTP_TTL_MS = 5 * 60 * 1000;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async create(createAuthDto) {
        const normalizedEmail = createAuthDto.email.trim().toLowerCase();
        const existingUser = await this.findUserByEmail(normalizedEmail);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashed = await bcrypt.hash(createAuthDto.password, 10);
        const profile = this.buildRoleProfile({
            email: normalizedEmail,
            fullname: createAuthDto.fullname,
            avatar: createAuthDto.avatar ?? null,
            password: hashed,
            role: createAuthDto.role,
            institution: createAuthDto.institution ?? null,
            industry: createAuthDto.industry ?? null,
            area_of_interest: createAuthDto.area_of_interest ?? null,
            company_email: createAuthDto.company_email ?? null,
            is_verified: false,
        });
        const user = await this.prisma.user.create({
            data: { profile: profile },
        });
        return this.toPublicUser(user);
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map((user) => this.toPublicUser(user));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.toPublicUser(user);
    }
    async update(id, updateAuthDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentProfile = this.readUserProfile(existingUser.profile);
        const normalizedNextEmail = (updateAuthDto.email ?? currentProfile.email).trim().toLowerCase();
        if (normalizedNextEmail !== currentProfile.email) {
            const duplicate = await this.findUserByEmail(normalizedNextEmail);
            if (duplicate && duplicate.id !== id) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        let nextPassword = currentProfile.password;
        if (updateAuthDto.password) {
            nextPassword = await bcrypt.hash(updateAuthDto.password, 10);
        }
        const nextProfile = this.buildRoleProfile({
            email: normalizedNextEmail,
            fullname: updateAuthDto.fullname ?? currentProfile.fullname,
            avatar: updateAuthDto.avatar ?? currentProfile.avatar ?? null,
            password: nextPassword,
            role: updateAuthDto.role ?? currentProfile.role,
            institution: updateAuthDto.institution ?? currentProfile.institution ?? null,
            industry: updateAuthDto.industry ?? currentProfile.industry ?? null,
            area_of_interest: updateAuthDto.area_of_interest ?? currentProfile.area_of_interest ?? null,
            company_email: updateAuthDto.company_email ?? currentProfile.company_email ?? null,
            is_verified: currentProfile.is_verified,
        });
        const user = await this.prisma.user.update({
            where: { id },
            data: { profile: nextProfile },
        });
        return this.toPublicUser(user);
    }
    async remove(id) {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        return this.toPublicUser(user);
    }
    async requestOtp(dto) {
        const email = dto.email.trim().toLowerCase();
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentProfile = this.readUserProfile(user.profile);
        if (currentProfile.is_verified) {
            throw new common_1.BadRequestException('User is already verified');
        }
        const otp = this.generateOtpCode();
        const expiresAt = new Date(Date.now() + AuthService_1.OTP_TTL_MS);
        const otpHash = await bcrypt.hash(otp, 10);
        await this.prisma.userOtp.upsert({
            where: { userId: user.id },
            update: {
                codeHash: otpHash,
                expiresAt,
                verifiedAt: null,
            },
            create: {
                userId: user.id,
                codeHash: otpHash,
                expiresAt,
            },
        });
        await this.mailService.sendOtpVerificationEmail({
            to: email,
            otp,
            expiresAt,
            fullname: currentProfile.fullname,
        });
        return {
            message: 'OTP generated and sent successfully',
            expires_at: expiresAt.toISOString(),
        };
    }
    async verifyOtp(dto) {
        const email = dto.email.trim().toLowerCase();
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentProfile = this.readUserProfile(user.profile);
        if (currentProfile.is_verified) {
            return { message: 'User is already verified' };
        }
        const otpRecord = await this.prisma.userOtp.findUnique({
            where: { userId: user.id },
        });
        if (!otpRecord) {
            throw new common_1.BadRequestException('OTP has not been requested');
        }
        if (otpRecord.verifiedAt) {
            throw new common_1.BadRequestException('OTP has already been used');
        }
        if (Date.now() > otpRecord.expiresAt.getTime()) {
            throw new common_1.BadRequestException('OTP has expired');
        }
        const isValidOtp = await bcrypt.compare(dto.otp, otpRecord.codeHash);
        if (!isValidOtp) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        const nextProfile = this.buildRoleProfile({
            ...currentProfile,
            is_verified: true,
        });
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: user.id },
                data: { profile: nextProfile },
            }),
            this.prisma.userOtp.update({
                where: { id: otpRecord.id },
                data: { verifiedAt: new Date() },
            }),
        ]);
        return { message: 'OTP verified successfully' };
    }
    async signInWithProviderCallback(provider, dto) {
        const tokens = await this.exchangeCodeForToken(provider, dto.code);
        const profile = await this.fetchProviderProfile(provider, tokens.accessToken);
        const payload = {
            providerUserId: profile.providerUserId,
            email: profile.email,
            fullname: profile.fullname,
            avatar: profile.avatar,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
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
        const existingUser = await this.findUserByEmail(dto.email);
        if (existingUser) {
            const existingProfile = this.readUserProfile(existingUser.profile);
            if (dto.avatar && existingProfile.avatar !== dto.avatar) {
                const updatedUser = await this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        profile: {
                            ...existingProfile,
                            avatar: dto.avatar,
                        },
                    },
                });
                return updatedUser;
            }
            return existingUser;
        }
        const profile = this.buildRoleProfile({
            email: dto.email,
            fullname: dto.fullname,
            avatar: dto.avatar ?? null,
            password: await bcrypt.hash((0, crypto_1.randomUUID)(), 10),
            role: enums_1.Role.STUDENT,
            institution: 'Not provided',
            industry: null,
            area_of_interest: 'General',
            company_email: null,
            is_verified: true,
        });
        return this.prisma.user.create({
            data: {
                profile: profile,
            },
        });
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
                user: true,
            },
        });
        if (existingProvider) {
            const existingProfile = this.readUserProfile(existingProvider.user.profile);
            if (dto.avatar && existingProfile.avatar !== dto.avatar) {
                const updatedUser = await this.prisma.user.update({
                    where: { id: existingProvider.user.id },
                    data: {
                        profile: {
                            ...existingProfile,
                            avatar: dto.avatar,
                        },
                    },
                });
                return this.toPublicUser(updatedUser);
            }
            return this.toPublicUser(existingProvider.user);
        }
        const user = await this.findOrCreateSocialUser(dto);
        await this.prisma.authProvider.upsert({
            where: {
                userId_provider: {
                    userId: user.id,
                    provider,
                },
            },
            update: {
                providerUserId: dto.providerUserId,
                accessToken: dto.accessToken,
                refreshToken: dto.refreshToken,
            },
            create: {
                userId: user.id,
                provider,
                providerUserId: dto.providerUserId,
                accessToken: dto.accessToken,
                refreshToken: dto.refreshToken,
            },
        });
        const latestUser = await this.prisma.user.findUnique({
            where: { id: user.id },
        });
        return latestUser ? this.toPublicUser(latestUser) : null;
    }
    async findUserByEmail(email) {
        const normalizedEmail = email.trim().toLowerCase();
        return this.prisma.user.findFirst({
            where: {
                profile: {
                    path: ['email'],
                    equals: normalizedEmail,
                },
            },
        });
    }
    readUserProfile(profile) {
        const value = (profile ?? {});
        return {
            email: value.email ?? '',
            fullname: value.fullname ?? '',
            avatar: value.avatar ?? null,
            password: value.password ?? '',
            role: value.role ?? enums_1.Role.STUDENT,
            institution: value.institution ?? null,
            industry: value.industry ?? null,
            area_of_interest: value.area_of_interest ?? null,
            company_email: value.company_email ?? null,
            is_verified: value.is_verified ?? false,
        };
    }
    buildRoleProfile(input) {
        const profile = {
            email: input.email.trim().toLowerCase(),
            fullname: input.fullname.trim(),
            avatar: this.normalizeOptionalText(input.avatar),
            password: input.password,
            role: input.role,
            institution: this.normalizeOptionalText(input.institution),
            industry: this.normalizeOptionalText(input.industry),
            area_of_interest: this.normalizeOptionalText(input.area_of_interest),
            company_email: this.normalizeOptionalEmail(input.company_email),
            is_verified: input.is_verified ?? false,
        };
        if (!profile.area_of_interest) {
            throw new common_1.BadRequestException('area_of_interest is required');
        }
        switch (profile.role) {
            case enums_1.Role.STUDENT:
                if (!profile.institution) {
                    throw new common_1.BadRequestException('institution is required for STUDENT role');
                }
                profile.industry = null;
                profile.company_email = null;
                return profile;
            case enums_1.Role.EDUCATOR:
                if (!profile.institution) {
                    throw new common_1.BadRequestException('institution is required for EDUCATOR role');
                }
                profile.industry = null;
                profile.company_email = null;
                return profile;
            case enums_1.Role.COMPANY:
                if (!profile.industry) {
                    throw new common_1.BadRequestException('industry is required for COMPANY role');
                }
                if (!profile.company_email) {
                    throw new common_1.BadRequestException('company_email is required for COMPANY role');
                }
                profile.institution = null;
                return profile;
            default:
                throw new common_1.BadRequestException(`Unsupported role: ${profile.role}`);
        }
    }
    normalizeOptionalText(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const normalized = value.trim();
        return normalized.length > 0 ? normalized : null;
    }
    normalizeOptionalEmail(value) {
        const normalized = this.normalizeOptionalText(value);
        return normalized ? normalized.toLowerCase() : null;
    }
    generateOtpCode() {
        return (0, crypto_1.randomInt)(0, 1_000_000).toString().padStart(6, '0');
    }
    toPublicUser(user) {
        const profile = this.readUserProfile(user.profile);
        const { password: _password, ...publicProfile } = profile;
        return {
            id: user.id,
            ...publicProfile,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map