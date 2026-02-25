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
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const update_auth_dto_1 = require("./dto/update-auth.dto");
const social_signin_dto_1 = require("./dto/social-signin.dto");
const enums_1 = require("../generated/prisma/enums");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    create(createAuthDto) {
        return this.authService.create(createAuthDto);
    }
    getProviderSignInUrl(provider) {
        return this.authService.getProviderSignInUrl(this.parseProvider(provider));
    }
    signInWithProviderCallback(provider, socialSignInCallbackDto) {
        return this.authService.signInWithProviderCallback(this.parseProvider(provider), socialSignInCallbackDto);
    }
    findAll() {
        return this.authService.findAll();
    }
    findOne(id) {
        return this.authService.findOne(+id);
    }
    update(id, updateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }
    remove(id) {
        return this.authService.remove(+id);
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
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The account has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
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
    (0, common_1.Post)('oauth/:provider/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle provider callback: fetch profile and sign in' }),
    (0, swagger_1.ApiParam)({ name: 'provider', enum: ['google', 'linkedin'] }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Provider callback handled successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, social_signin_dto_1.SocialSignInCallbackDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInWithProviderCallback", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_auth_dto_1.UpdateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "remove", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map