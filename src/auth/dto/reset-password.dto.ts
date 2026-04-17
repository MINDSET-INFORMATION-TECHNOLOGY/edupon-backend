import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { TrimString, TrimToLowerCase } from '../../common/transformers/normalized-string.transform';

export class ResetPasswordDto {
  @ApiProperty({ example: 'alice@example.com' })
  @TrimToLowerCase()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '123456', description: '6-digit reset code' })
  @TrimString()
  @Matches(/^\d{6}$/, { message: 'otp must be a 6-digit numeric code' })
  @IsNotEmpty()
  otp!: string;

  @ApiProperty({ example: 'newStrongPassword123' })
  @IsString()
  @MinLength(8, { message: 'new_password must be at least 8 characters long' })
  @IsNotEmpty()
  new_password!: string;
}
