jest.mock('./auth.service', () => ({
  AuthService: class {
    create = jest.fn();
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
import { SocialSignInCallbackDto } from './dto/social-signin.dto';
import { AuthProviderType } from '../generated/prisma/enums';

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

  describe('social sign-in', () => {
    it('should call service.getProviderSignInUrl and return URL', () => {
      const response = { url: 'https://accounts.google.com/o/oauth2/v2/auth?foo=bar', state: 'state-123' };
      jest.spyOn(service, 'getProviderSignInUrl').mockReturnValue(response as any);

      expect(controller.getProviderSignInUrl('google')).toEqual(response);
      expect(service.getProviderSignInUrl).toHaveBeenCalledWith(AuthProviderType.GOOGLE);
    });

    it('should call service.signInWithProvider from callback route', async () => {
      const dto: SocialSignInCallbackDto = {
        code: 'oauth-code-123',
        password: 'strongPassword123',
        confirmPassword: 'strongPassword123',
      };
      const authenticated = { id: '1', email: 'google@example.com', fullname: 'Google User', role: 'STUDENT' };
      jest.spyOn(service, 'signInWithProviderCallback').mockResolvedValue(authenticated as any);

      await expect(controller.signInWithProviderCallback('google', dto)).resolves.toEqual(authenticated);
      expect(service.signInWithProviderCallback).toHaveBeenCalledWith(AuthProviderType.GOOGLE, dto);
    });

    it('should throw for unsupported provider', () => {
      expect(() => controller.getProviderSignInUrl('twitter')).toThrow('Unsupported provider: twitter');
    });
  });
});
