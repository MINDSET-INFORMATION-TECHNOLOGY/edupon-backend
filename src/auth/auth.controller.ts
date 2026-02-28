import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiExtraModels,
  ApiConsumes,
  getSchemaPath,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  CompanyRegisterDto,
  EducatorRegisterDto,
  StudentRegisterDto,
} from './dto/register-role.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
  GoogleSignInDto,
  LinkedInSignInDto,
  ProviderSignInDto,
} from './dto/social-signin.dto';
import { AuthProviderType } from '../generated/prisma/enums';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import {
  avatarDiskStorage,
  buildAvatarPublicUrl,
  isAllowedAvatarMimeType,
  MAX_AVATAR_FILE_SIZE,
  resolveLocalUploadBaseUrl,
} from '../files/local-upload.config';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: avatarDiskStorage,
      limits: { fileSize: MAX_AVATAR_FILE_SIZE },
      fileFilter: (_req, file, callback) => {
        if (!isAllowedAvatarMimeType(file.mimetype)) {
          callback(new BadRequestException('Unsupported avatar file type'), false);
          return;
        }

        callback(null, true);
      },
    }),
  )
  @ApiExtraModels(StudentRegisterDto, EducatorRegisterDto, CompanyRegisterDto)
  @ApiBody({
    description:
      'Role-based registration payload. Send as multipart/form-data. Optional avatar file field name: avatar.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(StudentRegisterDto),
        },
        {
          $ref: getSchemaPath(EducatorRegisterDto),
        },
        {
          $ref: getSchemaPath(CompanyRegisterDto),
        },
      ],
      discriminator: {
        propertyName: 'role',
        mapping: {
          STUDENT: getSchemaPath(StudentRegisterDto),
          EDUCATOR: getSchemaPath(EducatorRegisterDto),
          COMPANY: getSchemaPath(CompanyRegisterDto),
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body() createAuthDto: CreateAuthDto,
    @UploadedFile() avatarFile?: { filename?: string },
    @Req() req?: { protocol?: string; get?: (name: string) => string },
  ) {
    if (avatarFile?.filename) {
      createAuthDto.avatar = buildAvatarPublicUrl(
        avatarFile.filename,
        resolveLocalUploadBaseUrl(req),
      );
    }

    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @Throttle({ default: { limit: 6, ttl: 60_000 } })
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'User authenticated successfully.',
    schema: {
      type: 'object',
      properties: {
        role: { type: 'string', enum: ['STUDENT', 'EDUCATOR', 'COMPANY'] },
        token: { type: 'string' },
      },
      required: ['role', 'token'],
      example: {
        role: 'STUDENT',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
  @ApiResponse({ status: 429, description: 'Too many login attempts. Try again later.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get authenticated user from JWT access token' })
  @ApiResponse({ status: 200, description: 'Authenticated user details from token.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  me(@Req() req: any) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout current session' })
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  logout(@Req() req: any) {
    return this.authService.logout(req);
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

  @Post('/password/forgot')
  @Throttle({ default: { limit: 6, ttl: 60_000 } })
  @ApiOperation({ summary: 'Request password reset code' })
  @ApiResponse({ status: 200, description: 'Password reset code request accepted.' })
  @ApiResponse({ status: 429, description: 'Too many password reset requests. Try again later.' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/password/reset')
  @Throttle({ default: { limit: 6, ttl: 60_000 } })
  @ApiOperation({ summary: 'Reset password with email and reset code' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset code.' })
  @ApiResponse({ status: 429, description: 'Too many password reset attempts. Try again later.' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
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
  @ApiQuery({ name: 'code', required: true, type: String, description: 'OAuth authorization code.' })
  @ApiQuery({ name: 'scope', required: false, type: String })
  @ApiQuery({ name: 'authuser', required: false, type: String, description: 'Google only.' })
  @ApiQuery({ name: 'prompt', required: false, type: String, description: 'Google only.' })
  @ApiResponse({
    status: 200,
    description: 'Provider callback handled successfully.',
    schema: {
      type: 'object',
      properties: {
        role: { type: 'string', enum: ['STUDENT', 'EDUCATOR', 'COMPANY'] },
        token: { type: 'string' },
      },
      required: ['role', 'token'],
      example: {
        role: 'STUDENT',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async signInWithProviderCallback(
    @Param('provider') provider: string,
    @Query() query: Record<string, any>,
  ) {
    const prov = this.parseProvider(provider);

    // validate against provider-specific DTO
    let dto: ProviderSignInDto;
    if (prov === AuthProviderType.GOOGLE) {
      dto = await this.validateProviderQuery(GoogleSignInDto, query);
    } else {
      dto = await this.validateProviderQuery(LinkedInSignInDto, query);
    }

    const session = await this.authService.signInWithProviderCallback(prov, dto);

    if (!session) {
      throw new BadRequestException('Unable to sign in with provider');
    }

    return {
      role: session.user.role,
      token: session.tokens.access_token,
    };
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  private parseProvider(provider: string): AuthProviderType {
    const normalized = provider.toUpperCase();
    if (normalized === AuthProviderType.GOOGLE) return AuthProviderType.GOOGLE;
    if (normalized === AuthProviderType.LINKEDIN) return AuthProviderType.LINKEDIN;
    throw new BadRequestException(`Unsupported provider: ${provider}`);
  }

  private async validateProviderQuery<T extends object>(
    dtoClass: new () => T,
    query: Record<string, any>,
  ): Promise<T> {
    const cast = plainToInstance(dtoClass, query);
    try {
      await validateOrReject(cast, { whitelist: true, forbidNonWhitelisted: false });
      return cast;
    } catch (error) {
      throw new BadRequestException(this.formatValidationError(error));
    }
  }

  private formatValidationError(error: unknown): string[] {
    if (!Array.isArray(error)) {
      return ['Invalid OAuth callback query parameters'];
    }

    const messages = (error as ValidationError[])
      .flatMap((validationError) => Object.values(validationError.constraints ?? {}))
      .filter((message) => typeof message === 'string');

    return messages.length > 0 ? messages : ['Invalid OAuth callback query parameters'];
  }
}
