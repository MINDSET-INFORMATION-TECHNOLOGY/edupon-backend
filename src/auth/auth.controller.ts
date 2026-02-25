import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SocialSignInCallbackDto, SocialSignInDto } from './dto/social-signin.dto';
import { AuthProviderType } from '../generated/prisma/enums';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('oauth/:provider')
  @ApiOperation({ summary: 'Get OAuth authorization URL for provider' })
  @ApiParam({ name: 'provider', enum: ['google', 'linkedin'] })
  @ApiResponse({ status: 200, description: 'Provider OAuth URL generated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getProviderSignInUrl(@Param('provider') provider: string) {
    return this.authService.getProviderSignInUrl(this.parseProvider(provider));
  }

  @Post('oauth/:provider/callback')
  @ApiOperation({ summary: 'Handle provider callback: fetch profile and sign in' })
  @ApiParam({ name: 'provider', enum: ['google', 'linkedin'] })
  @ApiResponse({ status: 201, description: 'Provider callback handled successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  signInWithProviderCallback(
    @Param('provider') provider: string,
    @Body() socialSignInCallbackDto: SocialSignInCallbackDto,
  ) {
    return this.authService.signInWithProviderCallback(this.parseProvider(provider), socialSignInCallbackDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  private parseProvider(provider: string): AuthProviderType {
    const normalized = provider.toUpperCase();
    if (normalized === AuthProviderType.GOOGLE) return AuthProviderType.GOOGLE;
    if (normalized === AuthProviderType.LINKEDIN) return AuthProviderType.LINKEDIN;
    throw new BadRequestException(`Unsupported provider: ${provider}`);
  }
}
