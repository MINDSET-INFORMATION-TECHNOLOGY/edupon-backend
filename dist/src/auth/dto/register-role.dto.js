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
const normalized_string_transform_1 = require("../../common/transformers/normalized-string.transform");
class RegisterCommonDto {
    email;
    full_name;
    skills;
    password;
    area_of_interest;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, normalized_string_transform_1.TrimToLowerCase)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maps to User.full_name' }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['JavaScript', 'TypeScript'],
        description: 'Maps to User.skills (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegisterCommonDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Required for all roles (stored in user.profile.area_of_interest).',
    }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'area_of_interest is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCommonDto.prototype, "area_of_interest", void 0);
class StudentRegisterDto extends RegisterCommonDto {
    role;
    institution;
}
exports.StudentRegisterDto = StudentRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.student] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.student]),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for student role.' }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'institution is required for student role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentRegisterDto.prototype, "institution", void 0);
class EducatorRegisterDto extends RegisterCommonDto {
    role;
    institution;
}
exports.EducatorRegisterDto = EducatorRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.educator] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.educator]),
    __metadata("design:type", String)
], EducatorRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for educator role.' }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'institution is required for educator role' }),
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
    (0, swagger_1.ApiProperty)({ enum: [enums_1.Role.company] }),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    (0, class_validator_1.IsIn)([enums_1.Role.company]),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for company role.' }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'industry is required for company role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required for company role.' }),
    (0, normalized_string_transform_1.TrimToLowerCase)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_email is required for company role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyRegisterDto.prototype, "company_email", void 0);
//# sourceMappingURL=register-role.dto.js.map