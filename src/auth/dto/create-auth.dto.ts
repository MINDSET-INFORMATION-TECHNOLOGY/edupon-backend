import { Role } from '../../generated/prisma/enums';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiProperty({ enum: Role })
  @IsEnum(Role, { message: 'Invalid role provided' })
  @IsNotEmpty()
  role: Role;
  
  @ApiPropertyOptional({ example: 'Some University' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  area_of_interest?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
