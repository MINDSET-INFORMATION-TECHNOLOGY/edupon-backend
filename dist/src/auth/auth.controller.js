"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_dto_1 = require("./dto/login.dto");
const request_otp_dto_1 = require("./dto/request-otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const social_signin_dto_1 = require("./dto/social-signin.dto");
const enums_1 = require("../generated/prisma/enums");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    create(createAuthDto) {
        return this.authService.create(createAuthDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    me(req) {
        return req.user;
    }
    logout(req) {
        return this.authService.logout(req);
    }
    requestOtp(requestOtpDto) {
        return this.authService.requestOtp(requestOtpDto);
    }
    verifyOtp(verifyOtpDto) {
        return this.authService.verifyOtp(verifyOtpDto);
    }
    forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    getProviderSignInUrl(provider) {
        return this.authService.getProviderSignInUrl(this.parseProvider(provider));
    }
    async signInWithProviderCallback(provider, query) {
        const prov = this.parseProvider(provider);
        let dto;
        if (prov === enums_1.AuthProviderType.GOOGLE) {
            dto = await this.validateProviderQuery(social_signin_dto_1.GoogleSignInDto, query);
        }
        else {
            dto = await this.validateProviderQuery(social_signin_dto_1.LinkedInSignInDto, query);
        }
        const session = await this.authService.signInWithProviderCallback(prov, dto);
        if (!session) {
            throw new common_1.BadRequestException('Unable to sign in with provider');
        }
        return {
            role: session.user.role ?? enums_1.Role.student,
            token: session.tokens.access_token,
        };
    }
    parseProvider(provider) {
        const normalized = provider.toUpperCase();
        if (normalized === enums_1.AuthProviderType.GOOGLE)
            return enums_1.AuthProviderType.GOOGLE;
        if (normalized === enums_1.AuthProviderType.LINKEDIN)
            return enums_1.AuthProviderType.LINKEDIN;
        throw new common_1.BadRequestException(`Unsupported provider: ${provider}`);
    }
    async validateProviderQuery(dtoClass, query) {
        const cast = (0, class_transformer_1.plainToInstance)(dtoClass, query);
        try {
            await (0, class_validator_1.validateOrReject)(cast, { whitelist: true, forbidNonWhitelisted: false });
            return cast;
        }
        catch (error) {
            throw new common_1.BadRequestException(this.formatValidationError(error));
        }
    }
    formatValidationError(error) {
        if (!Array.isArray(error)) {
            return ['Invalid OAuth callback query parameters'];
        }
        const messages = error
            .flatMap((validationError) => Object.values(validationError.constraints ?? {}))
            .filter((message) => typeof message === 'string');
        return messages.length > 0 ? messages : ['Invalid OAuth callback query parameters'];
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new account' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The account has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Login with email and password' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User authenticated successfully.',
        schema: {
            type: 'object',
            properties: {
                role: { type: 'string', enum: Object.values(enums_1.Role) },
                token: { type: 'string' },
            },
            required: ['role', 'token'],
            example: {
                role: enums_1.Role.student,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid credentials.' }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too many login attempts. Try again later.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Get authenticated user from JWT access token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Authenticated user details from token.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Logout current session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged out successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/otp/request'),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Generate and send OTP for account verification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP generated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too many OTP requests. Try again later.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('/otp/verify'),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Verify user OTP code (expires after 5 minutes)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OTP verified successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired OTP.' }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too many OTP verification retries. Try again later.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('/password/forgot'),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset code request accepted.' }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too many password reset requests. Try again later.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/password/reset'),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with email and reset code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired reset code.' }),
    (0, swagger_1.ApiResponse)({ status: 429, description: 'Too many password reset attempts. Try again later.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('oauth/:provider'),
    (0, swagger_1.ApiOperation)({ summary: 'Get OAuth authorization URL for provider' }),
    (0, swagger_1.ApiParam)({ name: 'provider', enum: ['google', 'linkedin'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Provider OAuth URL generated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProviderSignInUrl", null);
__decorate([
    (0, common_1.Get)('oauth/:provider/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle provider callback: fetch profile and sign in' }),
    (0, swagger_1.ApiParam)({ name: 'provider', enum: ['google', 'linkedin'] }),
    (0, swagger_1.ApiQuery)({ name: 'code', required: true, type: String, description: 'OAuth authorization code.' }),
    (0, swagger_1.ApiQuery)({ name: 'scope', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'authuser', required: false, type: String, description: 'Google only.' }),
    (0, swagger_1.ApiQuery)({ name: 'prompt', required: false, type: String, description: 'Google only.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Provider callback handled successfully.',
        schema: {
            type: 'object',
            properties: {
                role: { type: 'string', enum: Object.values(enums_1.Role) },
                token: { type: 'string' },
            },
            required: ['role', 'token'],
            example: {
                role: enums_1.Role.student,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithProviderCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map