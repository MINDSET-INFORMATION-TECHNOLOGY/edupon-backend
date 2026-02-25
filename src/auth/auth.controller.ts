import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SocialSignInDto } from './dto/social-signin.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthProviderType } from '../generated/prisma/enums';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({
    type: CreateAuthDto,
    description: 'Role-based registration payload.',
    examples: {
      student: {
        summary: 'Student',
        value: {
          email: 'student@example.com',
          fullname: 'Student User',
          avatar: 'https://example.com/avatars/student.jpg',
          password: 'strongPassword123',
          role: 'STUDENT',
          institution: 'Some University',
          area_of_interest: 'Computer Science',
        },
      },
      educator: {
        summary: 'Educator',
        value: {
          email: 'educator@example.com',
          fullname: 'Educator User',
          avatar: 'https://example.com/avatars/educator.jpg',
          password: 'strongPassword123',
          role: 'EDUCATOR',
          institution: 'Some University',
          area_of_interest: 'AI and Education',
        },
      },
      company: {
        summary: 'Company',
        value: {
          email: 'company@example.com',
          company_email: 'contact@acme.com',
          fullname: 'Company Admin',
          avatar: 'https://example.com/avatars/company.jpg',
          password: 'strongPassword123',
          role: 'COMPANY',
          industry: 'Information Technology',
          area_of_interest: 'Corporate Learning',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/otp/request')
  @Throttle({ default: { limit: 6, ttl: 60_000 } })
  @ApiOperation({ summary: 'Generate and send OTP for account verification' })
  @ApiResponse({ status: 200, description: 'OTP generated successfully.' })
  @ApiResponse({ status: 429, description: 'Too many OTP requests. Try again later.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return this.authService.requestOtp(requestOtpDto);
  }

  @Post('/otp/verify')
  @Throttle({ default: { limit: 6, ttl: 60_000 } })
  @ApiOperation({ summary: 'Verify user OTP code (expires after 5 minutes)' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP.' })
  @ApiResponse({ status: 429, description: 'Too many OTP verification retries. Try again later.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Get('oauth/:provider')
  @ApiOperation({ summary: 'Get OAuth authorization URL for provider' })
  @ApiParam({ name: 'provider', enum: ['google', 'linkedin'] })
  @ApiResponse({ status: 200, description: 'Provider OAuth URL generated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getProviderSignInUrl(@Param('provider') provider: string) {
    return this.authService.getProviderSignInUrl(this.parseProvider(provider));
  }

  @Get('oauth/:provider/callback')
  @ApiOperation({ summary: 'Handle provider callback: fetch profile and sign in' })
  @ApiParam({ name: 'provider', enum: ['google', 'linkedin'] })
  @ApiResponse({ status: 200, description: 'Provider callback handled successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  signInWithProviderCallback(
    @Param('provider') provider: string,
    @Query() socialSignInDto: SocialSignInDto,
  ) {
    return this.authService.signInWithProviderCallback(this.parseProvider(provider), socialSignInDto);
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
