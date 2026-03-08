jest.mock('./auth.service', () => ({
  AuthService: class {
    create = jest.fn();
    login = jest.fn();
    logout = jest.fn();
    requestOtp = jest.fn();
    verifyOtp = jest.fn();
    forgotPassword = jest.fn();
    resetPassword = jest.fn();
    getProviderSignInUrl = jest.fn();
    signInWithProviderCallback = jest.fn();
    findAll = jest.fn();
    findOne = jest.fn();
    update = jest.fn();
    remove = jest.fn();
  },
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthProviderType } from '../generated/prisma/enums';
import {
  GoogleSignInDto,
  LinkedInSignInDto,
} from './dto/social-signin.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password123',
        role: 'COMPANY' as any,
        industry: 'Technology',
        company_email: 'hr@company.com',
        area_of_interest: 'Engineering',
      } as any;

      const created = { id: '1', ...dto };
      jest.spyOn(service, 'create').mockResolvedValue(created as any);

      await expect(controller.create(dto)).resolves.toEqual(created);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should call service.login and return role/token response', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const loggedInUser = {
        role: 'STUDENT',
        token: 'jwt-token',
      };
      jest.spyOn(service, 'login').mockResolvedValue(loggedInUser as any);

      await expect(controller.login(dto)).resolves.toEqual(loggedInUser);
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('logout', () => {
    it('should call service.logout and return success message', async () => {
      const req = { session: { destroy: jest.fn() } };
      const response = { message: 'User logged out successfully' };
      jest.spyOn(service, 'logout').mockResolvedValue(response as any);

      await expect(controller.logout(req)).resolves.toEqual(response);
      expect(service.logout).toHaveBeenCalledWith(req);
    });
  });

  describe('password reset', () => {
    it('should call service.forgotPassword and return response', async () => {
      const dto = { email: 'test@example.com' } as any;
      const response = { message: 'If an account exists with this email, a reset code has been sent' };
      jest.spyOn(service, 'forgotPassword').mockResolvedValue(response as any);

      await expect(controller.forgotPassword(dto)).resolves.toEqual(response);
      expect(service.forgotPassword).toHaveBeenCalledWith(dto);
    });

    it('should call service.resetPassword and return response', async () => {
      const dto = { email: 'test@example.com', otp: '123456', new_password: 'newPassword123' } as any;
      const response = { message: 'Password reset successfully' };
      jest.spyOn(service, 'resetPassword').mockResolvedValue(response as any);

      await expect(controller.resetPassword(dto)).resolves.toEqual(response);
      expect(service.resetPassword).toHaveBeenCalledWith(dto);
    });
  });

  describe('social sign-in', () => {
    it('should call service.getProviderSignInUrl and return URL', () => {
      const response = { url: 'https://accounts.google.com/o/oauth2/v2/auth?foo=bar' };
      jest.spyOn(service, 'getProviderSignInUrl').mockReturnValue(response as any);

      expect(controller.getProviderSignInUrl('google')).toEqual(response);
      expect(service.getProviderSignInUrl).toHaveBeenCalledWith(AuthProviderType.GOOGLE);
    });

    it('should call service.signInWithProviderCallback for Google and cast dto', async () => {
      const query = {
        code: 'oauth-code-123',
        scope: 'openid email profile',
        authuser: '0',
        prompt: 'consent',
        state: 'provider-state-123',
      };
      const session = {
        user: {
          id: 1,
          email: 'google@example.com',
          fullname: 'Google User',
          role: 'STUDENT',
          avatar: null,
          institution: 'Google University',
          industry: null,
          area_of_interest: 'Engineering',
          company_email: null,
          is_verified: true,
        },
        tokens: { token_type: 'Bearer', access_token: 'jwt-token', expires_in: 900 },
      };
      const authenticated = {
        token: 'jwt-token',
      };
      const callbackSpy = jest
        .spyOn(service, 'signInWithProviderCallback')
        .mockResolvedValue(session as any);

      await expect(controller.signInWithProviderCallback('google', query as any)).resolves.toEqual(authenticated);
      expect(callbackSpy).toHaveBeenCalledWith(
        AuthProviderType.GOOGLE,
        expect.objectContaining({ code: 'oauth-code-123', scope: 'openid email profile' }),
      );
      expect(callbackSpy.mock.calls[0][1]).toBeInstanceOf(GoogleSignInDto);
    });

    it('should call service.signInWithProviderCallback for LinkedIn', async () => {
      const query = { code: 'li-code', scope: 'r_liteprofile r_emailaddress' };
      const session = {
        user: {
          id: 2,
          email: 'li@example.com',
          fullname: 'LinkedIn User',
          role: 'STUDENT',
          avatar: null,
          institution: null,
          industry: null,
          area_of_interest: null,
          company_email: null,
          is_verified: true,
        },
        tokens: { token_type: 'Bearer', access_token: 'jwt-token', expires_in: 900 },
      };
      const authenticated = {
        token: 'jwt-token',
      };
      const callbackSpy = jest
        .spyOn(service, 'signInWithProviderCallback')
        .mockResolvedValue(session as any);

      await expect(controller.signInWithProviderCallback('linkedin', query as any)).resolves.toEqual(authenticated);
      expect(callbackSpy).toHaveBeenCalledWith(
        AuthProviderType.LINKEDIN,
        expect.objectContaining({ code: 'li-code', scope: 'r_liteprofile r_emailaddress' }),
      );
      expect(callbackSpy.mock.calls[0][1]).toBeInstanceOf(LinkedInSignInDto);
    });

    it('should throw BadRequestException when callback query is invalid', async () => {
      const callbackSpy = jest.spyOn(service, 'signInWithProviderCallback');

      await expect(controller.signInWithProviderCallback('google', {} as any)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should throw for unsupported provider', () => {
      expect(() => controller.getProviderSignInUrl('twitter')).toThrow('Unsupported provider: twitter');
    });
  });
});
