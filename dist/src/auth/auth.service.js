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
const jwt = __importStar(require("jsonwebtoken"));
const token_revocation_service_1 = require("./token-revocation.service");
let AuthService = class AuthService {
    static { AuthService_1 = this; }
    prisma;
    mailService;
    tokenRevocationService;
    static OTP_TTL_MS = 5 * 60 * 1000;
    static ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, mailService, tokenRevocationService) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.tokenRevocationService = tokenRevocationService;
    }
    async create(createAuthDto) {
        return this.withErrorLogging('create', async () => {
            const normalizedEmail = createAuthDto.email.trim().toLowerCase();
            this.logger.log(`Creating account for ${normalizedEmail} with role ${createAuthDto.role}`);
            const existingUser = await this.findUserByEmail(normalizedEmail);
            if (existingUser) {
                this.logger.warn(`Registration blocked because email is already in use: ${normalizedEmail}`);
                throw new common_1.BadRequestException('Email already in use');
            }
            const hashed = await bcrypt.hash(createAuthDto.password, 10);
            const profile = this.buildRoleProfile({
                email: normalizedEmail,
                full_name: createAuthDto.full_name,
                password: hashed,
                role: createAuthDto.role,
                institution: createAuthDto.institution,
                industry: createAuthDto.industry,
                area_of_interest: createAuthDto.area_of_interest,
                company_email: createAuthDto.company_email,
                is_verified: false,
            });
            const user = await this.prisma.user.create({
                data: { profile: profile },
            });
            this.logger.log(`Created account for user ${user.id} (${normalizedEmail})`);
            return this.toPublicUser(user);
        });
    }
    async login(dto) {
        return this.withErrorLogging('login', async () => {
            if (!dto.email || !dto.password) {
                this.logger.warn('Login rejected because email or password was missing');
                throw new common_1.BadRequestException('Invalid email or password');
            }
            const email = dto.email.trim().toLowerCase();
            this.logger.log(`Login attempt for ${email}`);
            const user = await this.findUserByEmail(email);
            if (!user) {
                this.logger.warn(`Login failed because user was not found: ${email}`);
                throw new common_1.BadRequestException('Invalid email or password');
            }
            const profile = this.readUserProfile(user.profile);
            const isValidPassword = await bcrypt.compare(dto.password, profile.password);
            if (!isValidPassword) {
                this.logger.warn(`Login failed due to invalid password for user ${user.id}`);
                throw new common_1.BadRequestException('Invalid email or password');
            }
            const session = await this.issueAuthSession(user);
            this.logger.log(`Login succeeded for user ${user.id} with role ${session.user.role}`);
            return {
                role: session.user.role,
                token: session.tokens.access_token,
            };
        });
    }
    async logout(req) {
        return this.withErrorLogging('logout', async () => {
            const authHeader = req?.headers?.authorization;
            let revokedToken = false;
            if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
                const token = authHeader.slice('Bearer '.length).trim();
                if (token) {
                    const decoded = jwt.decode(token);
                    const expiresAtMs = decoded?.exp ? decoded.exp * 1000 : undefined;
                    this.tokenRevocationService.revokeToken(token, expiresAtMs);
                    revokedToken = true;
                }
            }
            if (req?.session?.destroy) {
                await new Promise((resolve, reject) => {
                    req.session.destroy((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            }
            this.logger.log(`Logout completed${revokedToken ? ' with token revocation' : ''}`);
            return { message: 'User logged out successfully' };
        });
    }
    async findAll() {
        return this.withErrorLogging('findAll', async () => {
            const users = await this.prisma.user.findMany();
            return users.map((user) => this.toPublicUser(user));
        });
    }
    async findOne(id) {
        return this.withErrorLogging('findOne', async () => {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return this.toPublicUser(user);
        });
    }
    async update(id, updateAuthDto) {
        return this.withErrorLogging('update', async () => {
            const existingUser = await this.prisma.user.findUnique({ where: { id } });
            if (!existingUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const currentProfile = this.readUserProfile(existingUser.profile);
            const normalizedNextEmail = (updateAuthDto.email ?? currentProfile.email)
                .trim()
                .toLowerCase();
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
                full_name: updateAuthDto.full_name ?? currentProfile.full_name,
                password: nextPassword,
                role: updateAuthDto.role ?? currentProfile.role,
                institution: this.resolveOptionalProfileField(updateAuthDto, 'institution', currentProfile.institution),
                industry: this.resolveOptionalProfileField(updateAuthDto, 'industry', currentProfile.industry),
                area_of_interest: this.resolveOptionalProfileField(updateAuthDto, 'area_of_interest', currentProfile.area_of_interest),
                company_email: this.resolveOptionalProfileField(updateAuthDto, 'company_email', currentProfile.company_email),
                is_verified: currentProfile.is_verified,
            });
            const user = await this.prisma.user.update({
                where: { id },
                data: { profile: nextProfile },
            });
            return this.toPublicUser(user);
        });
    }
    async remove(id) {
        return this.withErrorLogging('remove', async () => {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            return this.toPublicUser(user);
        });
    }
    async requestOtp(dto) {
        return this.withErrorLogging('requestOtp', async () => {
            const email = dto.email.trim().toLowerCase();
            this.logger.log(`OTP request received for ${email}`);
            const user = await this.findUserByEmail(email);
            if (!user) {
                this.logger.warn(`OTP request failed because user was not found: ${email}`);
                throw new common_1.NotFoundException('User not found');
            }
            const currentProfile = this.readUserProfile(user.profile);
            if (currentProfile.is_verified) {
                this.logger.warn(`OTP request skipped because user ${user.id} is already verified`);
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
                fullname: currentProfile.full_name,
            });
            this.logger.log(`OTP issued for user ${user.id}; expires at ${expiresAt.toISOString()}`);
            return {
                message: 'OTP generated and sent successfully',
                expires_at: expiresAt.toISOString(),
            };
        });
    }
    async forgotPassword(dto) {
        return this.withErrorLogging('forgotPassword', async () => {
            const email = dto.email.trim().toLowerCase();
            this.logger.log(`Password reset requested for ${email}`);
            const user = await this.findUserByEmail(email);
            const safeMessage = 'If an account exists with this email, a reset code has been sent';
            if (!user) {
                this.logger.warn(`Password reset requested for unknown email: ${email}`);
                return { message: safeMessage };
            }
            const currentProfile = this.readUserProfile(user.profile);
            const otp = this.generateOtpCode();
            const expiresAt = new Date(Date.now() + AuthService_1.OTP_TTL_MS);
            const otpHash = await bcrypt.hash(otp, 10);
            await this.prisma.userPasswordReset.upsert({
                where: { userId: user.id },
                update: {
                    codeHash: otpHash,
                    expiresAt,
                    usedAt: null,
                },
                create: {
                    userId: user.id,
                    codeHash: otpHash,
                    expiresAt,
                },
            });
            await this.mailService.sendPasswordResetEmail({
                to: email,
                otp,
                expiresAt,
                fullname: currentProfile.full_name,
            });
            this.logger.log(`Password reset OTP issued for user ${user.id}; expires at ${expiresAt.toISOString()}`);
            return { message: safeMessage };
        });
    }
    async resetPassword(dto) {
        return this.withErrorLogging('resetPassword', async () => {
            const email = dto.email.trim().toLowerCase();
            this.logger.log(`Password reset attempt for ${email}`);
            const user = await this.findUserByEmail(email);
            if (!user) {
                this.logger.warn(`Password reset failed because user was not found: ${email}`);
                throw new common_1.BadRequestException('Invalid or expired reset code');
            }
            const otpRecord = await this.prisma.userPasswordReset.findUnique({
                where: { userId: user.id },
            });
            if (!otpRecord) {
                throw new common_1.BadRequestException('Invalid or expired reset code');
            }
            if (otpRecord.usedAt || Date.now() > otpRecord.expiresAt.getTime()) {
                throw new common_1.BadRequestException('Invalid or expired reset code');
            }
            const isValidOtp = await bcrypt.compare(dto.otp, otpRecord.codeHash);
            if (!isValidOtp) {
                throw new common_1.BadRequestException('Invalid or expired reset code');
            }
            const currentProfile = this.readUserProfile(user.profile);
            const nextPassword = await bcrypt.hash(dto.new_password, 10);
            const nextProfile = {
                ...currentProfile,
                password: nextPassword,
            };
            await this.prisma.user.update({
                where: { id: user.id },
                data: { profile: nextProfile },
            });
            await this.prisma.userPasswordReset.update({
                where: { id: otpRecord.id },
                data: { usedAt: new Date() },
            });
            this.logger.log(`Password reset succeeded for user ${user.id}`);
            return { message: 'Password reset successfully' };
        });
    }
    async verifyOtp(dto) {
        return this.withErrorLogging('verifyOtp', async () => {
            this.logger.log('OTP verification attempt received');
            const otpRecords = await this.prisma.userOtp.findMany({
                include: { user: true },
            });
            if (otpRecords.length === 0) {
                throw new common_1.BadRequestException('OTP has not been requested');
            }
            const matchingRecords = [];
            for (const otpRecord of otpRecords) {
                const isValidOtp = await bcrypt.compare(dto.otp, otpRecord.codeHash);
                if (isValidOtp) {
                    matchingRecords.push(otpRecord);
                }
            }
            if (matchingRecords.length === 0) {
                throw new common_1.BadRequestException('Invalid OTP');
            }
            if (matchingRecords.length > 1) {
                throw new common_1.BadRequestException('OTP is ambiguous. Please request a new OTP and try again');
            }
            const otpRecord = matchingRecords[0];
            this.logger.log(`OTP matched for user ${otpRecord.userId}`);
            if (otpRecord.verifiedAt) {
                this.logger.warn(`OTP verification rejected because OTP for user ${otpRecord.userId} was already used`);
                throw new common_1.BadRequestException('OTP has already been used');
            }
            if (Date.now() > otpRecord.expiresAt.getTime()) {
                this.logger.warn(`OTP verification rejected because OTP for user ${otpRecord.userId} expired`);
                throw new common_1.BadRequestException('OTP has expired');
            }
            const currentProfile = this.readUserProfile(otpRecord.user.profile);
            if (currentProfile.is_verified) {
                this.logger.log(`User ${otpRecord.userId} was already verified`);
                return { message: 'User is already verified' };
            }
            const nextProfile = this.buildRoleProfile({
                ...currentProfile,
                is_verified: true,
            });
            await this.prisma.$transaction([
                this.prisma.user.update({
                    where: { id: otpRecord.userId },
                    data: { profile: nextProfile },
                }),
                this.prisma.userOtp.update({
                    where: { id: otpRecord.id },
                    data: { verifiedAt: new Date() },
                }),
            ]);
            this.logger.log(`OTP verification succeeded for user ${otpRecord.userId}`);
            return { message: 'OTP verified successfully' };
        });
    }
    async signInWithProviderCallback(provider, dto) {
        return this.withErrorLogging('signInWithProviderCallback', async () => {
            this.logger.log(`OAuth callback received for provider ${provider}`);
            const tokens = await this.exchangeCodeForToken(provider, dto.code);
            const profile = await this.fetchProviderProfile(provider, tokens.accessToken);
            const payload = {
                providerUserId: profile.providerUserId,
                email: profile.email,
                fullname: profile.full_name,
                accessToken: tokens.accessToken,
            };
            const user = await this.upsertSocialProvider(provider, payload);
            if (user) {
                this.logger.log(`OAuth sign-in succeeded for provider ${provider} and user ${user.id}`);
            }
            return user ? this.issueAuthSession(user) : null;
        });
    }
    getProviderSignInUrl(provider) {
        const config = this.getProviderConfig(provider);
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: config.clientId,
            redirect_uri: config.callbackUrl,
            scope: config.scopes.join(' '),
        });
        return {
            url: `${config.authorizationUrl}?${params.toString()}`,
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
        const tokenPayload = await response.json().catch(() => ({}));
        if (!response.ok || !tokenPayload.access_token) {
            let description = tokenPayload?.error_description;
            if (Array.isArray(description)) {
                description = description.join(', ');
            }
            throw new common_1.BadRequestException({
                message: (typeof description === 'string' && description) ||
                    tokenPayload?.error ||
                    'Failed to exchange OAuth code for access token',
                error: tokenPayload?.error ?? 'Bad Request',
            });
        }
        return {
            accessToken: tokenPayload.access_token,
        };
    }
    async fetchProviderProfile(provider, accessToken) {
        if (provider === enums_1.AuthProviderType.GOOGLE) {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const payload = await response.json().catch(() => ({}));
            if (!response.ok || !payload.sub || !payload.email) {
                throw new common_1.BadRequestException({
                    message: 'Failed to fetch Google user profile',
                    error: 'Bad Request',
                });
            }
            const fullname = payload.name?.trim() ||
                [payload.given_name, payload.family_name]
                    .filter(Boolean)
                    .join(' ')
                    .trim() ||
                payload.email;
            return {
                providerUserId: payload.sub,
                email: payload.email,
                full_name: fullname,
            };
        }
        const response = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.sub || !payload.email) {
            throw new common_1.BadRequestException({
                message: 'Failed to fetch LinkedIn user profile',
                error: 'Bad Request',
            });
        }
        const fullname = payload.name?.trim() ||
            [payload.given_name, payload.family_name]
                .filter(Boolean)
                .join(' ')
                .trim() ||
            payload.email;
        return {
            providerUserId: payload.sub,
            email: payload.email,
            full_name: fullname,
        };
    }
    async findOrCreateSocialUser(dto) {
        const existingUser = await this.findUserByEmail(dto.email);
        if (existingUser) {
            const existingProfile = this.readUserProfile(existingUser.profile);
            return this.syncSocialProfileFields(existingUser.id, existingProfile, dto);
        }
        const profile = this.buildRoleProfile({
            email: dto.email,
            full_name: dto.fullname,
            password: await bcrypt.hash((0, crypto_1.randomUUID)(), 10),
            role: enums_1.Role.student,
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
        const existingProvider = await this.prisma.authProvider.findFirst({
            where: {
                provider,
                providerUserId: dto.providerUserId,
            },
            include: {
                user: true,
            },
        });
        if (existingProvider) {
            const existingProfile = this.readUserProfile(existingProvider.user.profile);
            return this.syncSocialProfileFields(existingProvider.user.id, existingProfile, dto);
        }
        const user = await this.findOrCreateSocialUser(dto);
        const existingUserProvider = await this.prisma.authProvider.findFirst({
            where: {
                userId: user.id,
                provider,
            },
        });
        if (existingUserProvider) {
            await this.prisma.authProvider.update({
                where: { id: existingUserProvider.id },
                data: {
                    providerUserId: dto.providerUserId,
                    accessToken: dto.accessToken,
                },
            });
        }
        else {
            await this.prisma.authProvider.create({
                data: {
                    userId: user.id,
                    provider,
                    providerUserId: dto.providerUserId,
                    accessToken: dto.accessToken,
                },
            });
        }
        const latestUser = await this.prisma.user.findFirst({
            where: { id: user.id },
        });
        return latestUser;
    }
    async syncSocialProfileFields(userId, currentProfile, dto) {
        const nextEmail = (dto.email ?? '').trim().toLowerCase();
        const nextFullname = (dto.fullname ?? '').trim();
        const shouldUpdate = (!!nextEmail && nextEmail !== currentProfile.email) ||
            (!!nextFullname && nextFullname !== currentProfile.full_name);
        if (!shouldUpdate) {
            return this.prisma.user.findFirst({ where: { id: userId } });
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    ...currentProfile,
                    email: nextEmail || currentProfile.email,
                    fullname: nextFullname || currentProfile.full_name,
                },
            },
        });
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
            full_name: value.full_name ?? '',
            password: value.password ?? '',
            role: value.role ?? enums_1.Role.student,
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
            full_name: input.full_name.trim(),
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
            case enums_1.Role.student:
                if (!profile.institution) {
                    throw new common_1.BadRequestException('institution is required for student role');
                }
                profile.industry = null;
                profile.company_email = null;
                return profile;
            case enums_1.Role.educator:
                if (!profile.institution) {
                    throw new common_1.BadRequestException('institution is required for educator role');
                }
                profile.industry = null;
                profile.company_email = null;
                return profile;
            case enums_1.Role.company:
                if (!profile.industry) {
                    throw new common_1.BadRequestException('industry is required for company role');
                }
                if (!profile.company_email) {
                    throw new common_1.BadRequestException('company_email is required for company role');
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
    resolveOptionalProfileField(dto, key, currentValue) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
            return dto[key] ?? null;
        }
        return currentValue;
    }
    generateOtpCode() {
        return (0, crypto_1.randomInt)(0, 1_000_000).toString().padStart(6, '0');
    }
    async issueAuthSession(user) {
        const accessToken = this.generateAccessToken(user);
        return {
            user: this.toPublicUser(user),
            tokens: {
                token_type: 'Bearer',
                access_token: accessToken,
                expires_in: AuthService_1.ACCESS_TOKEN_TTL_SECONDS,
            },
        };
    }
    generateAccessToken(user) {
        const profile = this.readUserProfile(user.profile);
        return jwt.sign({
            sub: user.id,
            email: profile.email,
            role: profile.role,
        }, this.getJwtSecret(), { expiresIn: AuthService_1.ACCESS_TOKEN_TTL_SECONDS });
    }
    getJwtSecret() {
        return (process.env.JWT_ACCESS_SECRET ??
            process.env.JWT_SECRET ??
            'dev-jwt-secret');
    }
    toPublicUser(user) {
        const profile = this.readUserProfile(user.profile);
        const { password: _password, ...publicProfile } = profile;
        return {
            id: user.id,
            ...publicProfile,
        };
    }
    async withErrorLogging(method, callback) {
        try {
            return await callback();
        }
        catch (error) {
            if (!(error instanceof common_1.HttpException) || error.getStatus() >= 500) {
                const message = error instanceof Error ? error.message : 'Unexpected error';
                const stack = error instanceof Error ? error.stack : undefined;
                this.logger.error(`${method} failed: ${message}`, stack);
            }
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService,
        token_revocation_service_1.TokenRevocationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map