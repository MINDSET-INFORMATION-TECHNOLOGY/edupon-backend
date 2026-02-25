import { Role } from '../../generated/prisma/enums';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import isEmail from 'validator/lib/isEmail';

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

@ValidatorConstraint({ name: 'isCompanyEmail', async: false })
class IsCompanyEmailConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    const normalized = value.trim().toLowerCase();
    if (!isEmail(normalized)) {
      return false;
    }

    const domain = normalized.split('@')[1];
    if (!domain) {
      return false;
    }

    return !PERSONAL_EMAIL_DOMAINS.has(domain);
  }

  defaultMessage(): string {
    return 'company_email must be a valid company email (personal email domains are not allowed)';
  }
}

export class CreateAuthDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Alice Doe' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    enum: Role,
    description: 'Profile role. Role-specific requirements apply to other fields.',
  })
  @IsEnum(Role, { message: 'Invalid role provided' })
  @IsNotEmpty()
  role: Role;
  
  @ApiPropertyOptional({
    example: 'Some University',
    description: 'Required when role is STUDENT or EDUCATOR.',
  })
  @ValidateIf((o: CreateAuthDto) => o.role === Role.STUDENT || o.role === Role.EDUCATOR)
  @IsNotEmpty({ message: 'institution is required for STUDENT or EDUCATOR role' })
  @IsString()
  institution?: string;

  @ApiProperty({
    example: 'Computer Science',
    description: 'Required for all roles.',
  })
  @IsNotEmpty({ message: 'area_of_interest is required' })
  @IsString()
  area_of_interest: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({
    example: 'Information Technology',
    description: 'Required when role is COMPANY.',
  })
  @ValidateIf((o: CreateAuthDto) => o.role === Role.COMPANY)
  @IsNotEmpty({ message: 'industry is required for COMPANY role' })
  @IsString()
  industry?: string;

  @ApiPropertyOptional({
    example: 'contact@acme.com',
    description: 'Required when role is COMPANY. Must be a business email domain.',
  })
  @ValidateIf((o: CreateAuthDto) => o.role === Role.COMPANY)
  @IsNotEmpty({ message: 'company_email is required for COMPANY role' })
  @IsString()
  @Validate(IsCompanyEmailConstraint)
  company_email?: string;
}
