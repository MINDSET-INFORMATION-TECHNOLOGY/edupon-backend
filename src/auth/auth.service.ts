import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import * as bcrypt from 'bcrypt';
import { randomInt, randomUUID } from 'crypto';
import { ProviderSignInDto } from './dto/social-signin.dto';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
import * as jwt from 'jsonwebtoken';
import { TokenRevocationService } from './token-revocation.service';

type OAuthProviderConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
};

type OAuthTokenPayload = {
  accessToken: string;
};

type OAuthProfile = {
  providerUserId: string;
  email: string;
  full_name: string;
};

type UserProfileData = {
  email: string;
  full_name: string;
  password: string;
  role: Role;
  institution: string | null;
  industry: string | null;
  area_of_interest: string | null;
  company_email: string | null;
  is_verified: boolean;
};

type RoleProfileInput = {
  email: string;
  full_name: string;
  password: string;
  role: Role;
  institution?: string | null;
  industry?: string | null;
  area_of_interest?: string | null;
  company_email?: string | null;
  is_verified?: boolean;
};

type PublicUser = Omit<UserProfileData, 'password'> & {
  id: number;
};

type AuthTokens = {
  token_type: 'Bearer';
  access_token: string;
  expires_in: number;
};

type AuthSessionResponse = {
  user: PublicUser;
  tokens: AuthTokens;
};

type LoginResponse = {
  role: Role;
  token: string;
};

type SocialSignInPayload = {
  providerUserId: string;
  email: string;
  fullname: string;
  accessToken?: string;
};

@Injectable()
export class AuthService {
  private static readonly OTP_TTL_MS = 5 * 60 * 1000;
  private static readonly ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private tokenRevocationService: TokenRevocationService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<PublicUser> {
    return this.withErrorLogging('create', async () => {
      const normalizedEmail = createAuthDto.email.trim().toLowerCase();
      this.logger.log(`Creating account for ${normalizedEmail} with role ${createAuthDto.role}`);
      const existingUser = await this.findUserByEmail(normalizedEmail);
      if (existingUser) {
        this.logger.warn(`Registration blocked because email is already in use: ${normalizedEmail}`);
        throw new BadRequestException('Email already in use');
      }

      const hashed = await bcrypt.hash(createAuthDto.password, 10);
      const profile = this.buildRoleProfile({
        email: normalizedEmail,
full_name: createAuthDto.full_name,
        password: hashed,
        role: createAuthDto.role,
        institution: createAuthDto.institution,
        industry: createAuthDto.industry,
        area_of_interest: createAuthDto.area_of_interest,
        company_email: createAuthDto.company_email,
        is_verified: false,
      });

      const user = await this.prisma.user.create({
        data: { profile: profile as any },
      });

      this.logger.log(`Created account for user ${user.id} (${normalizedEmail})`);
      return this.toPublicUser(user);
    });
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    return this.withErrorLogging('login', async () => {
      if (!dto.email || !dto.password) {
        this.logger.warn('Login rejected because email or password was missing');
        throw new BadRequestException('Invalid email or password');
      }

      const email = dto.email.trim().toLowerCase();
      this.logger.log(`Login attempt for ${email}`);
      const user = await this.findUserByEmail(email);

      if (!user) {
        this.logger.warn(`Login failed because user was not found: ${email}`);
        throw new BadRequestException('Invalid email or password');
      }

      const profile = this.readUserProfile(user.profile);
      const isValidPassword = await bcrypt.compare(dto.password, profile.password);
      if (!isValidPassword) {
        this.logger.warn(`Login failed due to invalid password for user ${user.id}`);
        throw new BadRequestException('Invalid email or password');
      }

      const session = await this.issueAuthSession(user);
      this.logger.log(`Login succeeded for user ${user.id} with role ${session.user.role}`);
      return {
        role: session.user.role,
        token: session.tokens.access_token,
      };
    });
  }

  async logout(req?: any): Promise<{ message: string }> {
    return this.withErrorLogging('logout', async () => {
      const authHeader = req?.headers?.authorization;
      let revokedToken = false;
      if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice('Bearer '.length).trim();
        if (token) {
          const decoded = jwt.decode(token) as { exp?: number } | null;
          const expiresAtMs = decoded?.exp ? decoded.exp * 1000 : undefined;
          this.tokenRevocationService.revokeToken(token, expiresAtMs);
          revokedToken = true;
        }
      }

      // If express-session is enabled, destroy the current session.
      if (req?.session?.destroy) {
        await new Promise<void>((resolve, reject) => {
          req.session.destroy((err: unknown) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      }
      this.logger.log(`Logout completed${revokedToken ? ' with token revocation' : ''}`);
      return { message: 'User logged out successfully' };
    });
  }

  async findAll(): Promise<PublicUser[]> {
    return this.withErrorLogging('findAll', async () => {
      const users = await this.prisma.user.findMany();
      return users.map((user) => this.toPublicUser(user));
    });
  }

  async findOne(id: number): Promise<PublicUser> {
    return this.withErrorLogging('findOne', async () => {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.toPublicUser(user);
    });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<PublicUser> {
    return this.withErrorLogging('update', async () => {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const currentProfile = this.readUserProfile(existingUser.profile);
      const normalizedNextEmail = (updateAuthDto.email ?? currentProfile.email).trim().toLowerCase();

      if (normalizedNextEmail !== currentProfile.email) {
        const duplicate = await this.findUserByEmail(normalizedNextEmail);
        if (duplicate && duplicate.id !== id) {
          throw new BadRequestException('Email already in use');
        }
      }

      let nextPassword = currentProfile.password;
      if (updateAuthDto.password) {
        nextPassword = await bcrypt.hash(updateAuthDto.password, 10);
      }

      const nextProfile = this.buildRoleProfile({
        email: normalizedNextEmail,
full_name: updateAuthDto.full_name ?? currentProfile.full_name,
        password: nextPassword,
        role: updateAuthDto.role ?? currentProfile.role,
        institution: this.resolveOptionalProfileField(updateAuthDto, 'institution', currentProfile.institution),
        industry: this.resolveOptionalProfileField(updateAuthDto, 'industry', currentProfile.industry),
        area_of_interest: this.resolveOptionalProfileField(
          updateAuthDto,
          'area_of_interest',
          currentProfile.area_of_interest,
        ),
        company_email: this.resolveOptionalProfileField(updateAuthDto, 'company_email', currentProfile.company_email),
        is_verified: currentProfile.is_verified,
      });

      const user = await this.prisma.user.update({
        where: { id },
        data: { profile: nextProfile as any },
      });

      return this.toPublicUser(user);
    });
  }

  async remove(id: number): Promise<PublicUser> {
    return this.withErrorLogging('remove', async () => {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      return this.toPublicUser(user);
    });
  }

  async requestOtp(dto: RequestOtpDto): Promise<{ message: string; expires_at: string }> {
    return this.withErrorLogging('requestOtp', async () => {
      const email = dto.email.trim().toLowerCase();
      this.logger.log(`OTP request received for ${email}`);
      const user = await this.findUserByEmail(email);
      if (!user) {
        this.logger.warn(`OTP request failed because user was not found: ${email}`);
        throw new NotFoundException('User not found');
      }

      const currentProfile = this.readUserProfile(user.profile);
      if (currentProfile.is_verified) {
        this.logger.warn(`OTP request skipped because user ${user.id} is already verified`);
        throw new BadRequestException('User is already verified');
      }

      const otp = this.generateOtpCode();
      const expiresAt = new Date(Date.now() + AuthService.OTP_TTL_MS);
      const otpHash = await bcrypt.hash(otp, 10);

      await this.prisma.userOtp.upsert({
        where: { userId: user.id },
        update: {
          codeHash: otpHash,
          expiresAt,
          verifiedAt: null,
        },
        create: {
          userId: user.id,
          codeHash: otpHash,
          expiresAt,
        },
      });

      await this.mailService.sendOtpVerificationEmail({
        to: email,
        otp,
        expiresAt,
        fullname: currentProfile.full_name,
      });

      this.logger.log(`OTP issued for user ${user.id}; expires at ${expiresAt.toISOString()}`);
      return {
        message: 'OTP generated and sent successfully',
        expires_at: expiresAt.toISOString(),
      };
    });
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    return this.withErrorLogging('forgotPassword', async () => {
      const email = dto.email.trim().toLowerCase();
      this.logger.log(`Password reset requested for ${email}`);
      const user = await this.findUserByEmail(email);
      const safeMessage = 'If an account exists with this email, a reset code has been sent';

      if (!user) {
        this.logger.warn(`Password reset requested for unknown email: ${email}`);
        return { message: safeMessage };
      }

      const currentProfile = this.readUserProfile(user.profile);
      const otp = this.generateOtpCode();
      const expiresAt = new Date(Date.now() + AuthService.OTP_TTL_MS);
      const otpHash = await bcrypt.hash(otp, 10);

      await this.prisma.userPasswordReset.upsert({
        where: { userId: user.id },
        update: {
          codeHash: otpHash,
          expiresAt,
          usedAt: null,
        },
        create: {
          userId: user.id,
          codeHash: otpHash,
          expiresAt,
        },
      });

      await this.mailService.sendPasswordResetEmail({
        to: email,
        otp,
        expiresAt,
        fullname: currentProfile.full_name,
      });

      this.logger.log(`Password reset OTP issued for user ${user.id}; expires at ${expiresAt.toISOString()}`);
      return { message: safeMessage };
    });
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    return this.withErrorLogging('resetPassword', async () => {
      const email = dto.email.trim().toLowerCase();
      this.logger.log(`Password reset attempt for ${email}`);
      const user = await this.findUserByEmail(email);
      if (!user) {
        this.logger.warn(`Password reset failed because user was not found: ${email}`);
        throw new BadRequestException('Invalid or expired reset code');
      }

      const otpRecord = await this.prisma.userPasswordReset.findUnique({
        where: { userId: user.id },
      });
      if (!otpRecord) {
        throw new BadRequestException('Invalid or expired reset code');
      }

      if (otpRecord.usedAt || Date.now() > otpRecord.expiresAt.getTime()) {
        throw new BadRequestException('Invalid or expired reset code');
      }

      const isValidOtp = await bcrypt.compare(dto.otp, otpRecord.codeHash);
      if (!isValidOtp) {
        throw new BadRequestException('Invalid or expired reset code');
      }

      const currentProfile = this.readUserProfile(user.profile);
      const nextPassword = await bcrypt.hash(dto.new_password, 10);
      const nextProfile = {
        ...currentProfile,
        password: nextPassword,
      };

      await this.prisma.user.update({
        where: { id: user.id },
        data: { profile: nextProfile as any },
      });

      await this.prisma.userPasswordReset.update({
        where: { id: otpRecord.id },
        data: { usedAt: new Date() },
      });

      this.logger.log(`Password reset succeeded for user ${user.id}`);
      return { message: 'Password reset successfully' };
    });
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<{ message: string }> {
    return this.withErrorLogging('verifyOtp', async () => {
      this.logger.log('OTP verification attempt received');
      const otpRecords = await this.prisma.userOtp.findMany({
        include: { user: true },
      });

      if (otpRecords.length === 0) {
        throw new BadRequestException('OTP has not been requested');
      }

      const matchingRecords: typeof otpRecords = [];
      for (const otpRecord of otpRecords) {
        const isValidOtp = await bcrypt.compare(dto.otp, otpRecord.codeHash);
        if (isValidOtp) {
          matchingRecords.push(otpRecord);
        }
      }

      if (matchingRecords.length === 0) {
        throw new BadRequestException('Invalid OTP');
      }

      if (matchingRecords.length > 1) {
        throw new BadRequestException('OTP is ambiguous. Please request a new OTP and try again');
      }

      const otpRecord = matchingRecords[0];
      this.logger.log(`OTP matched for user ${otpRecord.userId}`);

      if (otpRecord.verifiedAt) {
        this.logger.warn(`OTP verification rejected because OTP for user ${otpRecord.userId} was already used`);
        throw new BadRequestException('OTP has already been used');
      }

      if (Date.now() > otpRecord.expiresAt.getTime()) {
        this.logger.warn(`OTP verification rejected because OTP for user ${otpRecord.userId} expired`);
        throw new BadRequestException('OTP has expired');
      }

      const currentProfile = this.readUserProfile(otpRecord.user.profile);
      if (currentProfile.is_verified) {
        this.logger.log(`User ${otpRecord.userId} was already verified`);
        return { message: 'User is already verified' };
      }

      const nextProfile = this.buildRoleProfile({
        ...currentProfile,
        is_verified: true,
      });

      await this.prisma.$transaction([
        this.prisma.user.update({
          where: { id: otpRecord.userId },
          data: { profile: nextProfile as any },
        }),
        this.prisma.userOtp.update({
          where: { id: otpRecord.id },
          data: { verifiedAt: new Date() },
        }),
      ]);

      this.logger.log(`OTP verification succeeded for user ${otpRecord.userId}`);
      return { message: 'OTP verified successfully' };
    });
  }

  async signInWithProviderCallback(
    provider: AuthProviderType,
    dto: ProviderSignInDto,
  ): Promise<AuthSessionResponse | null> {
    return this.withErrorLogging('signInWithProviderCallback', async () => {
      this.logger.log(`OAuth callback received for provider ${provider}`);
      const tokens = await this.exchangeCodeForToken(provider, dto.code);
      const profile = await this.fetchProviderProfile(provider, tokens.accessToken);

      const payload: SocialSignInPayload = {
        providerUserId: profile.providerUserId,
        email: profile.email,
        fullname: profile.full_name,
        accessToken: tokens.accessToken,
      };

      const user = await this.upsertSocialProvider(provider, payload);
      if (user) {
        this.logger.log(`OAuth sign-in succeeded for provider ${provider} and user ${user.id}`);
      }
      return user ? this.issueAuthSession(user) : null;
    });
  }

  getProviderSignInUrl(provider: AuthProviderType) {
    const config = this.getProviderConfig(provider);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: config.callbackUrl,
      scope: config.scopes.join(' '),
    });

    return {
      url: `${config.authorizationUrl}?${params.toString()}`,
    };
  }

  private getProviderConfig(provider: AuthProviderType): OAuthProviderConfig {
    if (provider === AuthProviderType.GOOGLE) {
      return this.validateProviderConfig(provider, {
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        callbackUrl: process.env.GOOGLE_CALLBACK_URL ?? '',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        scopes: ['openid', 'email', 'profile'],
      });
    }

    return this.validateProviderConfig(provider, {
      clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
      callbackUrl: process.env.LINKEDIN_CALLBACK_URL ?? '',
      authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
      scopes: ['openid', 'profile', 'email'],
    });
  }

  private validateProviderConfig(provider: AuthProviderType, config: OAuthProviderConfig): OAuthProviderConfig {
    if (!config.clientId || !config.clientSecret || !config.callbackUrl) {
      throw new BadRequestException(`Missing OAuth configuration for provider: ${provider}`);
    }
    return config;
  }

  private async exchangeCodeForToken(provider: AuthProviderType, code: string): Promise<OAuthTokenPayload> {
    const config = this.getProviderConfig(provider);
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.callbackUrl,
    });

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const tokenPayload = (await response.json().catch(() => ({}))) as any;

    if (!response.ok || !tokenPayload.access_token) {
      // ensure error_description is a string; Google sometimes returns an
      // array of messages which would otherwise become a JSON array in the
      // exception payload (see reported issue).
      let description: unknown = tokenPayload?.error_description;
      if (Array.isArray(description)) {
        description = description.join(', ');
      }

      throw new BadRequestException({
        message:
          (typeof description === 'string' && description) ||
          tokenPayload?.error ||
          'Failed to exchange OAuth code for access token',
        error: tokenPayload?.error ?? 'Bad Request',
      });
    }

    return {
      accessToken: tokenPayload.access_token,
    };
  }

  private async fetchProviderProfile(provider: AuthProviderType, accessToken: string): Promise<OAuthProfile> {
    if (provider === AuthProviderType.GOOGLE) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const payload = (await response.json().catch(() => ({}))) as any;

      if (!response.ok || !payload.sub || !payload.email) {
        throw new BadRequestException({
          message: 'Failed to fetch Google user profile',
          error: 'Bad Request',
        });
      }

      const fullname =
        payload.name?.trim() ||
        [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
        payload.email;

    return {
      providerUserId: payload.sub,
      email: payload.email,
      full_name: fullname,
    };
    }

    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payload = (await response.json().catch(() => ({}))) as any;

    if (!response.ok || !payload.sub || !payload.email) {
      throw new BadRequestException({
        message: 'Failed to fetch LinkedIn user profile',
        error: 'Bad Request',
      });
    }

    const fullname =
      payload.name?.trim() ||
      [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
      payload.email;

    return {
      providerUserId: payload.sub,
      email: payload.email,
      full_name: fullname,
    };
  }

  private async findOrCreateSocialUser(
    dto: Pick<SocialSignInPayload, 'email' | 'fullname'>,
  ) {
    const existingUser = await this.findUserByEmail(dto.email);

    if (existingUser) {
      const existingProfile = this.readUserProfile(existingUser.profile);
      return this.syncSocialProfileFields(existingUser.id, existingProfile, dto);
    }

    const profile = this.buildRoleProfile({
      email: dto.email,
      full_name: dto.fullname,
      password: await bcrypt.hash(randomUUID(), 10),
      role: Role.student,
      institution: 'Not provided',
      industry: null,
      area_of_interest: 'General',
      company_email: null,
      is_verified: true,
    });

    return this.prisma.user.create({
      data: {
        profile: profile as any,
      },
    });
  }

  private async upsertSocialProvider(
    provider: AuthProviderType,
    dto: SocialSignInPayload,
  ): Promise<{ id: number; profile: unknown } | null> {
    const existingProvider = await this.prisma.authProvider.findFirst({
      where: {
        provider,
        providerUserId: dto.providerUserId,
      },
      include: {
        user: true,
      },
    });

    if (existingProvider) {
      const existingProfile = this.readUserProfile(existingProvider.user.profile);
      return this.syncSocialProfileFields(existingProvider.user.id, existingProfile, dto);
    }

    const user = await this.findOrCreateSocialUser(dto);

    const existingUserProvider = await this.prisma.authProvider.findFirst({
      where: {
        userId: user!.id,
        provider,
      },
    });

    if (existingUserProvider) {
      await this.prisma.authProvider.update({
        where: { id: existingUserProvider.id },
        data: {
          providerUserId: dto.providerUserId,
          accessToken: dto.accessToken,
        },
      });
    } else {
      await this.prisma.authProvider.create({
        data: {
          userId: user!.id,
          provider,
          providerUserId: dto.providerUserId,
          accessToken: dto.accessToken,
        },
      });
    }

    const latestUser = await this.prisma.user.findFirst({
      where: { id: user!.id },
    });

    return latestUser;
  }

  private async syncSocialProfileFields(
    userId: number,
    currentProfile: UserProfileData,
    dto: Pick<SocialSignInPayload, 'email' | 'fullname'>,
  ) {
    const nextEmail = (dto.email ?? '').trim().toLowerCase();
    const nextFullname = (dto.fullname ?? '').trim();

    const shouldUpdate =
      (!!nextEmail && nextEmail !== currentProfile.email) ||
      (!!nextFullname && nextFullname !== currentProfile.full_name);

    if (!shouldUpdate) {
      return this.prisma.user.findFirst({ where: { id: userId } });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          ...currentProfile,
          email: nextEmail || currentProfile.email,
          fullname: nextFullname || currentProfile.full_name,
        } as any,
      },
    });
  }

  private async findUserByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    return this.prisma.user.findFirst({
      where: {
        profile: {
          path: ['email'],
          equals: normalizedEmail,
        } as any,
      },
    });
  }

  private readUserProfile(profile: unknown): UserProfileData {
    const value = (profile ?? {}) as Partial<UserProfileData>;
    return {
      email: value.email ?? '',
      full_name: value.full_name ?? '',
      password: value.password ?? '',
      role: (value.role as Role) ?? Role.student,
      institution: value.institution ?? null,
      industry: value.industry ?? null,
      area_of_interest: value.area_of_interest ?? null,
      company_email: value.company_email ?? null,
      is_verified: value.is_verified ?? false,
    };
  }

  private buildRoleProfile(input: RoleProfileInput): UserProfileData {
    const profile: UserProfileData = {
      email: input.email.trim().toLowerCase(),
      full_name: input.full_name.trim(),
      password: input.password,
      role: input.role,
      institution: this.normalizeOptionalText(input.institution),
      industry: this.normalizeOptionalText(input.industry),
      area_of_interest: this.normalizeOptionalText(input.area_of_interest),
      company_email: this.normalizeOptionalEmail(input.company_email),
      is_verified: input.is_verified ?? false,
    };

    if (!profile.area_of_interest) {
      throw new BadRequestException('area_of_interest is required');
    }

    switch (profile.role) {
      case Role.student:
        if (!profile.institution) {
          throw new BadRequestException('institution is required for student role');
        }
        profile.industry = null;
        profile.company_email = null;
        return profile;
      case Role.educator:
        if (!profile.institution) {
          throw new BadRequestException('institution is required for educator role');
        }
        profile.industry = null;
        profile.company_email = null;
        return profile;
      case Role.company:
        if (!profile.industry) {
          throw new BadRequestException('industry is required for company role');
        }
        if (!profile.company_email) {
          throw new BadRequestException('company_email is required for company role');
        }
        profile.institution = null;
        return profile;
      default:
        throw new BadRequestException(`Unsupported role: ${profile.role}`);
    }
  }

  private normalizeOptionalText(value?: string | null): string | null {
    if (typeof value !== 'string') {
      return null;
    }
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private normalizeOptionalEmail(value?: string | null): string | null {
    const normalized = this.normalizeOptionalText(value);
    return normalized ? normalized.toLowerCase() : null;
  }

  private resolveOptionalProfileField(
    dto: UpdateAuthDto,
    key: 'institution' | 'industry' | 'area_of_interest' | 'company_email',
    currentValue: string | null,
  ): string | null {
    if (Object.prototype.hasOwnProperty.call(dto, key)) {
      return dto[key] ?? null;
    }

    return currentValue;
  }

  private generateOtpCode(): string {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
  }

  private async issueAuthSession(user: { id: number; profile: unknown }): Promise<AuthSessionResponse> {
    const accessToken = this.generateAccessToken(user);

    return {
      user: this.toPublicUser(user),
      tokens: {
        token_type: 'Bearer',
        access_token: accessToken,
        expires_in: AuthService.ACCESS_TOKEN_TTL_SECONDS,
      },
    };
  }

  private generateAccessToken(user: { id: number; profile: unknown }): string {
    const profile = this.readUserProfile(user.profile);
    return jwt.sign(
      {
        sub: user.id,
        email: profile.email,
        role: profile.role,
      },
      this.getJwtSecret(),
      { expiresIn: AuthService.ACCESS_TOKEN_TTL_SECONDS },
    );
  }

  private getJwtSecret(): string {
    return process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET ?? 'dev-jwt-secret';
  }

  private toPublicUser(user: { id: number; profile: unknown }): PublicUser {
    const profile = this.readUserProfile(user.profile);
    const { password: _password, ...publicProfile } = profile;
    return {
      id: user.id,
      ...publicProfile,
    };
  }

  private async withErrorLogging<T>(method: string, callback: () => Promise<T>): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`${method} failed: ${message}`, stack);
      throw error;
    }
  }
}
