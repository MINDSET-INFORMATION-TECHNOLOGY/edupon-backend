jest.mock('./auth.service', () => ({
  AuthService: class {
    create = jest.fn();
    login = jest.fn();
    refreshToken = jest.fn();
    logout = jest.fn();
    requestOtp = jest.fn();
    verifyOtp = jest.fn();
    getProviderSignInUrl = jest.fn();
    signInWithProviderCallback = jest.fn();
    findAll = jest.fn();
    findOne = jest.fn();
    update = jest.fn();
    remove = jest.fn();
  },
}));

import { Test, TestingModule } from '@nestjs/testing';
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
        role: 'STUDENT',
        institution: undefined,
        area_of_interest: undefined,
      } as any;

      const created = { id: '1', ...dto };
      jest.spyOn(service, 'create').mockResolvedValue(created as any);

      await expect(controller.create(dto)).resolves.toEqual(created);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should call service.login and return user', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const loggedInUser = { id: 1, email: 'test@example.com', fullname: 'Test User', role: 'STUDENT' };
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

  describe('refresh token', () => {
    it('should call service.refreshToken and return tokens', async () => {
      const dto: LoginDto = {
        refresh_token: '1.token-payload',
      };
      const refreshed = {
        user: { id: 1, email: 'test@example.com', fullname: 'Test User', role: 'STUDENT' },
        tokens: { access_token: 'new-access', refresh_token: 'new-refresh' },
      };
      jest.spyOn(service, 'refreshToken').mockResolvedValue(refreshed as any);

      await expect(controller.refreshToken(dto)).resolves.toEqual(refreshed);
      expect(service.refreshToken).toHaveBeenCalledWith(dto);
    });
  });

  describe('social sign-in', () => {
    it('should call service.getProviderSignInUrl and return URL', () => {
      const response = { url: 'https://accounts.google.com/o/oauth2/v2/auth?foo=bar', state: 'state-123' };
      jest.spyOn(service, 'getProviderSignInUrl').mockReturnValue(response as any);

      expect(controller.getProviderSignInUrl('google')).toEqual(response);
      expect(service.getProviderSignInUrl).toHaveBeenCalledWith(AuthProviderType.GOOGLE);
    });

    it('should call service.signInWithProviderCallback for Google and cast dto', async () => {
      const query = { code: 'oauth-code-123', scope: 'openid email profile', authuser: '0', prompt: 'consent' };
      const authenticated = { id: '1', email: 'google@example.com', fullname: 'Google User', role: 'STUDENT' };
      const callbackSpy = jest
        .spyOn(service, 'signInWithProviderCallback')
        .mockResolvedValue(authenticated as any);

      await expect(controller.signInWithProviderCallback('google', query as any)).resolves.toEqual(authenticated);
      expect(callbackSpy).toHaveBeenCalledWith(
        AuthProviderType.GOOGLE,
        expect.objectContaining({ code: 'oauth-code-123', scope: 'openid email profile' }),
      );
      expect(callbackSpy.mock.calls[0][1]).toBeInstanceOf(GoogleSignInDto);
    });

    it('should call service.signInWithProviderCallback for LinkedIn', async () => {
      const query = { code: 'li-code', scope: 'r_liteprofile r_emailaddress' };
      const authenticated = { id: '2', email: 'li@example.com', fullname: 'LinkedIn User', role: 'STUDENT' };
      const callbackSpy = jest
        .spyOn(service, 'signInWithProviderCallback')
        .mockResolvedValue(authenticated as any);

      await expect(controller.signInWithProviderCallback('linkedin', query as any)).resolves.toEqual(authenticated);
      expect(callbackSpy).toHaveBeenCalledWith(
        AuthProviderType.LINKEDIN,
        expect.objectContaining({ code: 'li-code', scope: 'r_liteprofile r_emailaddress' }),
      );
      expect(callbackSpy.mock.calls[0][1]).toBeInstanceOf(LinkedInSignInDto);
    });

    it('should throw for unsupported provider', () => {
      expect(() => controller.getProviderSignInUrl('twitter')).toThrow('Unsupported provider: twitter');
    });
  });
});
