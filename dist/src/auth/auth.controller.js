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
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const social_signin_dto_1 = require("./dto/social-signin.dto");
const request_otp_dto_1 = require("./dto/request-otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const enums_1 = require("../generated/prisma/enums");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    create(createAuthDto) {
        return this.authService.create(createAuthDto);
    }
    requestOtp(requestOtpDto) {
        return this.authService.requestOtp(requestOtpDto);
    }
    verifyOtp(verifyOtpDto) {
        return this.authService.verifyOtp(verifyOtpDto);
    }
    getProviderSignInUrl(provider) {
        return this.authService.getProviderSignInUrl(this.parseProvider(provider));
    }
    signInWithProviderCallback(provider, socialSignInDto) {
        return this.authService.signInWithProviderCallback(this.parseProvider(provider), socialSignInDto);
    }
    parseProvider(provider) {
        const normalized = provider.toUpperCase();
        if (normalized === enums_1.AuthProviderType.GOOGLE)
            return enums_1.AuthProviderType.GOOGLE;
        if (normalized === enums_1.AuthProviderType.LINKEDIN)
            return enums_1.AuthProviderType.LINKEDIN;
        throw new common_1.BadRequestException(`Unsupported provider: ${provider}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new account' }),
    (0, swagger_1.ApiBody)({
        type: create_auth_dto_1.CreateAuthDto,
        description: 'Role-based registration payload.',
        examples: {
            student: {
                summary: 'Student',
                value: {
                    email: 'student@example.com',
                    fullname: 'Student User',
                    avatar: 'https://example.com/avatars/student.jpg',
                    password: 'strongPassword123',
                    role: 'STUDENT',
                    institution: 'Some University',
                    area_of_interest: 'Computer Science',
                },
            },
            educator: {
                summary: 'Educator',
                value: {
                    email: 'educator@example.com',
                    fullname: 'Educator User',
                    avatar: 'https://example.com/avatars/educator.jpg',
                    password: 'strongPassword123',
                    role: 'EDUCATOR',
                    institution: 'Some University',
                    area_of_interest: 'AI and Education',
                },
            },
            company: {
                summary: 'Company',
                value: {
                    email: 'company@example.com',
                    company_email: 'contact@acme.com',
                    fullname: 'Company Admin',
                    avatar: 'https://example.com/avatars/company.jpg',
                    password: 'strongPassword123',
                    role: 'COMPANY',
                    industry: 'Information Technology',
                    area_of_interest: 'Corporate Learning',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The account has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
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
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Provider callback handled successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, social_signin_dto_1.SocialSignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInWithProviderCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map