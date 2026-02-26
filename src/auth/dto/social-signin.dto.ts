import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export abstract class SocialSignInDto {
  @ApiProperty({ example: 'oauth-authorization-code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ example: 'openid email profile' })
  @IsOptional()
  @IsString()
  scope?: string;
}

export class GoogleSignInDto extends SocialSignInDto {
  @ApiPropertyOptional({ description: 'OpenID prompt value, e.g. consent' })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiPropertyOptional({ description: 'Authuser index from Google' })
  @IsOptional()
  @IsString()
  authuser?: string;
}

export class LinkedInSignInDto extends SocialSignInDto {}

export type ProviderSignInDto = GoogleSignInDto | LinkedInSignInDto;
