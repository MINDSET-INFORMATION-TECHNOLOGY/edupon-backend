import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

class RegisterCommonDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ description: 'Required for all roles.' })
  @IsNotEmpty({ message: 'area_of_interest is required' })
  @IsString()
  area_of_interest: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class StudentRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.STUDENT] })
  @IsEnum(Role)
  @IsIn([Role.STUDENT])
  role: 'STUDENT';

  @ApiProperty({ description: 'Required for STUDENT role.' })
  @IsNotEmpty({ message: 'institution is required for STUDENT role' })
  @IsString()
  institution: string;
}

export class EducatorRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.EDUCATOR] })
  @IsEnum(Role)
  @IsIn([Role.EDUCATOR])
  role: 'EDUCATOR';

  @ApiProperty({ description: 'Required for EDUCATOR role.' })
  @IsNotEmpty({ message: 'institution is required for EDUCATOR role' })
  @IsString()
  institution: string;
}

export class CompanyRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.COMPANY] })
  @IsEnum(Role)
  @IsIn([Role.COMPANY])
  role: 'COMPANY';

  @ApiProperty({ description: 'Required for COMPANY role.' })
  @IsNotEmpty({ message: 'industry is required for COMPANY role' })
  @IsString()
  industry: string;

  @ApiProperty({ description: 'Required for COMPANY role.' })
  @IsNotEmpty({ message: 'company_email is required for COMPANY role' })
  @IsString()
  company_email: string;
}
