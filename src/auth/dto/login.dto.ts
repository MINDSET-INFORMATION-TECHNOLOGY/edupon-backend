import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;
}
