import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { TrimString } from '../../common/transformers/normalized-string.transform';

export class VerifyOtpDto {
  @ApiProperty({ example: '123456', description: '6-digit OTP code' })
  @TrimString()
  @Matches(/^\d{6}$/, { message: 'otp must be a 6-digit numeric code' })
  @IsNotEmpty()
  otp!: string;
}
