import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { TrimToLowerCase } from '../../common/transformers/normalized-string.transform';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'alice@example.com' })
  @TrimToLowerCase()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email!: string;
}
