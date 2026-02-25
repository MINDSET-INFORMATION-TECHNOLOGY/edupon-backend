import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class SocialSignInDto {
  @ApiProperty({ example: 'google-oauth-sub-id' })
  @IsString()
  @IsNotEmpty()
  providerUserId: string;

  @ApiPropertyOptional({ example: 'alice@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiPropertyOptional({ example: 'Alice Doe' })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role provided' })
  role?: Role;

  @ApiPropertyOptional({ example: 'Some University' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  area_of_interest?: string;

  @ApiPropertyOptional({ example: 'provider-access-token' })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional({ example: 'provider-refresh-token' })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class SocialSignInCallbackDto {
  @ApiProperty({ example: 'oauth-authorization-code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  confirmPassword: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role provided' })
  role?: Role;

  @ApiPropertyOptional({ example: 'Some University' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  area_of_interest?: string;
}
