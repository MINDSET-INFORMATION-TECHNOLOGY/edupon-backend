import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { SocialSignInCallbackDto, SocialSignInDto } from './dto/social-signin.dto';

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
  refreshToken?: string;
};

type OAuthProfile = {
  providerUserId: string;
  email: string;
  fullname: string;
  avatar?: string;
};

type SocialSignInPayload = SocialSignInDto & {
  password?: string;
};

type ResolvedSocialSignInPayload = SocialSignInPayload & {
  email: string;
  fullname: string;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    // hash password before saving
    const hashed = await bcrypt.hash(createAuthDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createAuthDto,
          password: hashed,
        },
      });
      // remove password field from returned object if needed
      delete (user as any).password;
      return user;
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
        throw new BadRequestException('Email already in use');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
      omit: { password: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    if (updateAuthDto.password) {
      updateAuthDto.password = await bcrypt.hash(updateAuthDto.password, 10);
    }
    const user = await this.prisma.user.update({
      where: { id: id.toString() },
      data: updateAuthDto as any,
      omit: { password: true },
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id: id.toString() },
      omit: { password: true },
    });
    return user;
  }

  // async signInWithProvider(provider: AuthProviderType, dto: SocialSignInDto) {
  //   return this.upsertSocialProvider(provider, dto);
  // }

  async signInWithProviderCallback(provider: AuthProviderType, dto: SocialSignInCallbackDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Password and confirm password do not match');
    }

    const tokens = await this.exchangeCodeForToken(provider, dto.code);
    const profile = await this.fetchProviderProfile(provider, tokens.accessToken);

    const payload: SocialSignInPayload = {
      providerUserId: profile.providerUserId,
      email: profile.email,
      fullname: profile.fullname,
      avatar: profile.avatar,
      role: dto.role,
      institution: dto.institution,
      area_of_interest: dto.area_of_interest,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      password: dto.password,
    };

    return this.upsertSocialProvider(provider, payload);
  }

  getProviderSignInUrl(provider: AuthProviderType) {
    const config = this.getProviderConfig(provider);
    const state = randomUUID();
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: config.callbackUrl,
      scope: config.scopes.join(' '),
      state,
    });

    return {
      url: `${config.authorizationUrl}?${params.toString()}`,
      state,
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
      throw new BadRequestException(
        tokenPayload?.error_description ?? tokenPayload?.error ?? 'Failed to exchange OAuth code for access token',
      );
    }

    return {
      accessToken: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token,
    };
  }

  private async fetchProviderProfile(provider: AuthProviderType, accessToken: string): Promise<OAuthProfile> {
    if (provider === AuthProviderType.GOOGLE) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const payload = (await response.json().catch(() => ({}))) as any;

      if (!response.ok || !payload.sub || !payload.email) {
        throw new BadRequestException('Failed to fetch Google user profile');
      }

      const fullname =
        payload.name?.trim() ||
        [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
        payload.email;

      return {
        providerUserId: payload.sub,
        email: payload.email,
        fullname,
        avatar: typeof payload.picture === 'string' ? payload.picture : undefined,
      };
    }

    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payload = (await response.json().catch(() => ({}))) as any;

    if (!response.ok || !payload.sub || !payload.email) {
      throw new BadRequestException('Failed to fetch LinkedIn user profile');
    }

    const fullname =
      payload.name?.trim() ||
      [payload.given_name, payload.family_name].filter(Boolean).join(' ').trim() ||
      payload.email;

    return {
      providerUserId: payload.sub,
      email: payload.email,
      fullname,
      avatar:
        typeof payload.picture === 'string'
          ? payload.picture
          : typeof payload.picture?.url === 'string'
            ? payload.picture.url
            : undefined,
    };
  }

  private async findOrCreateSocialUser(
    dto: Pick<
      ResolvedSocialSignInPayload,
      'email' | 'fullname' | 'role' | 'institution' | 'area_of_interest' | 'password' | 'avatar'
    >,
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      if (dto.avatar && existingUser.avatar !== dto.avatar) {
        return this.prisma.user.update({
          where: { id: existingUser.id },
          data: { avatar: dto.avatar },
        });
      }
      return existingUser;
    }

    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          fullname: dto.fullname,
          password: await bcrypt.hash(dto.password ?? randomUUID(), 10),
          role: dto.role ?? Role.STUDENT,
          institution: dto.institution,
          area_of_interest: dto.area_of_interest,
          avatar: dto.avatar,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
        throw new BadRequestException('Email already in use');
      }
      throw e;
    }
  }

  private async upsertSocialProvider(
    provider: AuthProviderType,
    dto: SocialSignInPayload,
  ) {
    const existingProvider = await this.prisma.authProvider.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId: dto.providerUserId,
        },
      },
      include: {
        user: { omit: { password: true } },
      },
    });

    if (existingProvider) {
      if (dto.avatar && existingProvider.user.avatar !== dto.avatar) {
        return this.prisma.user.update({
          where: { id: existingProvider.user.id },
          data: { avatar: dto.avatar },
          omit: { password: true },
        });
      }
      return existingProvider.user;
    }

    const resolvedPayload = await this.resolveSocialSignInPayload(provider, dto);
    const user = await this.findOrCreateSocialUser(resolvedPayload);

    await this.prisma.authProvider.upsert({
      where: {
        userId_provider: {
          userId: user.id,
          provider,
        },
      },
      update: {
        providerUserId: resolvedPayload.providerUserId,
        accessToken: resolvedPayload.accessToken,
        refreshToken: resolvedPayload.refreshToken,
      },
      create: {
        userId: user.id,
        provider,
        providerUserId: resolvedPayload.providerUserId,
        accessToken: resolvedPayload.accessToken,
        refreshToken: resolvedPayload.refreshToken,
      },
    });

    return this.prisma.user.findUnique({
      where: { id: user.id },
      omit: { password: true },
    });
  }

  private async resolveSocialSignInPayload(
    provider: AuthProviderType,
    dto: SocialSignInPayload,
  ): Promise<ResolvedSocialSignInPayload> {
    let { email, fullname, avatar } = dto;

    if ((!email || !fullname || !avatar) && dto.accessToken) {
      const profile = await this.fetchProviderProfile(provider, dto.accessToken);
      email = email ?? profile.email;
      fullname = fullname ?? profile.fullname;
      avatar = avatar ?? profile.avatar;
    }

    if (!email || !fullname) {
      throw new BadRequestException(
        'Email and fullname are required for first-time social sign-in. Provide them directly or include accessToken.',
      );
    }

    return {
      ...dto,
      email,
      fullname,
      avatar,
    };
  }
}
