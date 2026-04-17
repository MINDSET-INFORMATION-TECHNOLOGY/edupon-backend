import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  OptionalTrimString,
  TrimString,
} from '../../common/transformers/normalized-string.transform';

export abstract class SocialSignInDto {
  @ApiProperty({ example: 'oauth-authorization-code' })
  @TrimString()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({ example: 'openid email profile' })
  @IsOptional()
  @OptionalTrimString()
  @IsString()
  scope!: string;
}

export class GoogleSignInDto extends SocialSignInDto {
  @ApiPropertyOptional({ description: 'OpenID prompt value, e.g. consent' })
  @IsOptional()
  @OptionalTrimString()
  @IsString()
  prompt!: string;

  @ApiPropertyOptional({ description: 'Authuser index from Google' })
  @IsOptional()
  @OptionalTrimString()
  @IsString()
  authuser!: string;
}

export class LinkedInSignInDto extends SocialSignInDto {}

export type ProviderSignInDto = GoogleSignInDto | LinkedInSignInDto;
