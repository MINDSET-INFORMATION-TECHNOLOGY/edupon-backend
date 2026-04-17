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
exports.CompanyRegisterDto = exports.EducatorRegisterDto = exports.StudentRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../generated/prisma/enums");
const class_validator_1 = require("class-validator");
class RegisterCommonDto {
    email;
    fullname;
    password;
    area_of_interest;
    avatar;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for all roles.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'area_of_interest is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "area_of_interest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'binary',
        description: 'Optional avatar image file for multipart/form-data requests.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "avatar", void 0);
class StudentRegisterDto extends RegisterCommonDto {
    role;
    institution;
}
exports.StudentRegisterDto = StudentRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.STUDENT] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.STUDENT]),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for STUDENT role.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'institution is required for STUDENT role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "institution", void 0);
class EducatorRegisterDto extends RegisterCommonDto {
    role;
    institution;
}
exports.EducatorRegisterDto = EducatorRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.EDUCATOR] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.EDUCATOR]),
    __metadata("design:type", String)
], EducatorRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for EDUCATOR role.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'institution is required for EDUCATOR role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EducatorRegisterDto.prototype, "institution", void 0);
class CompanyRegisterDto extends RegisterCommonDto {
    role;
    industry;
    company_email;
}
exports.CompanyRegisterDto = CompanyRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.COMPANY] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.COMPANY]),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for COMPANY role.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'industry is required for COMPANY role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for COMPANY role.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_email is required for COMPANY role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "company_email", void 0);
//# sourceMappingURL=register-role.dto.js.map