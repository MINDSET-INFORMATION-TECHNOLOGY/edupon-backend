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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthDto = void 0;
const enums_1 = require("../../generated/prisma/enums");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const normalized_string_transform_1 = require("../../common/transformers/normalized-string.transform");
const PERSONAL_EMAIL_DOMAINS = new Set([
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'icloud.com',
    'aol.com',
    'protonmail.com',
    'gmx.com',
    'yandex.com',
    'mail.com',
]);
let IsCompanyEmailConstraint = class IsCompanyEmailConstraint {
    validate(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const normalized = value.trim().toLowerCase();
        if (!(0, isEmail_1.default)(normalized)) {
            return false;
        }
        const domain = normalized.split('@')[1];
        if (!domain) {
            return false;
        }
        return !PERSONAL_EMAIL_DOMAINS.has(domain);
    }
    defaultMessage() {
        return 'company_email must be a valid company email (personal email domains are not allowed)';
    }
};
IsCompanyEmailConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isCompanyEmail', async: false })
], IsCompanyEmailConstraint);
class CreateAuthDto {
    email;
    full_name;
    skills;
    password;
    role;
    institution;
    area_of_interest;
    industry;
    company_email;
}
exports.CreateAuthDto = CreateAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'alice@example.com' }),
    (0, normalized_string_transform_1.TrimToLowerCase)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alice Doe', description: 'Maps to User.full_name' }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['JavaScript', 'TypeScript'], description: 'Maps to User.skills (optional)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateAuthDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'strongPassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.Role,
        description: 'Role (stored in user.profile.role). Role-specific requirements apply to other fields.',
    }),
    (0, class_validator_1.IsEnum)(enums_1.Role, { message: 'Invalid role provided' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Some University',
        description: 'Required when role is student or educator (stored in user.profile.institution).',
    }),
    (0, normalized_string_transform_1.OptionalTrimString)(),
    (0, class_validator_1.ValidateIf)((o) => o.role === enums_1.Role.student || o.role === enums_1.Role.educator),
    (0, class_validator_1.IsNotEmpty)({ message: 'institution is required for student or educator role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "institution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Computer Science',
        description: 'Required for all roles (stored in user.profile.area_of_interest).',
    }),
    (0, normalized_string_transform_1.TrimString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'area_of_interest is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "area_of_interest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Information Technology',
        description: 'Required when role is company (stored in user.profile.industry).',
    }),
    (0, normalized_string_transform_1.OptionalTrimString)(),
    (0, class_validator_1.ValidateIf)((o) => o.role === enums_1.Role.company),
    (0, class_validator_1.IsNotEmpty)({ message: 'industry is required for company role' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'contact@acme.com',
        description: 'Required when role is company (stored in user.profile.company_email). Must be a business email domain.',
    }),
    (0, normalized_string_transform_1.OptionalTrimToLowerCase)(),
    (0, class_validator_1.ValidateIf)((o) => o.role === enums_1.Role.company),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_email is required for company role' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(IsCompanyEmailConstraint),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "company_email", void 0);
//# sourceMappingURL=create-auth.dto.js.map