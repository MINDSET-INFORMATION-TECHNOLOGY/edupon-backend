import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
