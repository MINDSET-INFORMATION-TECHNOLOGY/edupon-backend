import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  TrimString,
  TrimToLowerCase,
} from '../../common/transformers/normalized-string.transform';

class RegisterCommonDto {
  @ApiProperty()
  @TrimToLowerCase()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @TrimString()
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({ description: 'Required for all roles.' })
  @TrimString()
  @IsNotEmpty({ message: 'area_of_interest is required' })
  @IsString()
  area_of_interest!: string;
}

export class StudentRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.student] })
  @IsEnum(Role)
  @IsIn([Role.student])
  role!: 'student';

  @ApiProperty({ description: 'Required for student role.' })
  @TrimString()
  @IsNotEmpty({ message: 'institution is required for student role' })
  @IsString()
  institution!: string;
}

export class EducatorRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.educator] })
  @IsEnum(Role)
  @IsIn([Role.educator])
  role!: 'educator';

  @ApiProperty({ description: 'Required for educator role.' })
  @TrimString()
  @IsNotEmpty({ message: 'institution is required for educator role' })
  @IsString()
  institution!: string;
}

export class CompanyRegisterDto extends RegisterCommonDto {
  @ApiProperty({ enum: [Role.company] })
  @IsEnum(Role)
  @IsIn([Role.company])
  role!: 'company';

  @ApiProperty({ description: 'Required for company role.' })
  @TrimString()
  @IsNotEmpty({ message: 'industry is required for company role' })
  @IsString()
  industry!: string;

  @ApiProperty({ description: 'Required for company role.' })
  @TrimToLowerCase()
  @IsNotEmpty({ message: 'company_email is required for company role' })
  @IsString()
  company_email!: string;
}
