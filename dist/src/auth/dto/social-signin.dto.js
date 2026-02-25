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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialSignInCallbackDto = exports.SocialSignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../generated/prisma/enums");
class SocialSignInDto {
    providerUserId;
    email;
    fullname;
    role;
    institution;
    area_of_interest;
    accessToken;
    refreshToken;
    avatar;
}
exports.SocialSignInDto = SocialSignInDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'google-oauth-sub-id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "providerUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'alice@example.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Alice Doe' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Role }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Role, { message: 'Invalid role provided' }),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Some University' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "institution", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Computer Science' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "area_of_interest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'provider-access-token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'provider-refresh-token' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/avatar.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInDto.prototype, "avatar", void 0);
class SocialSignInCallbackDto {
    code;
    password;
    confirmPassword;
    role;
    institution;
    area_of_interest;
}
exports.SocialSignInCallbackDto = SocialSignInCallbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'oauth-authorization-code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'strongPassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'strongPassword123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Role }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Role, { message: 'Invalid role provided' }),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Some University' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "institution", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Computer Science' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialSignInCallbackDto.prototype, "area_of_interest", void 0);
//# sourceMappingURL=social-signin.dto.js.map