import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SocialSignInDto {
  @ApiProperty({ example: 'oauth-authorization-code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ example: 'openid email profile' })
  @IsOptional()
  @IsString()
  scope?: string;

  @ApiPropertyOptional({ example: 'state-token-from-initiation-step' })
  @IsOptional()
  @IsString()
  state?: string;
}
