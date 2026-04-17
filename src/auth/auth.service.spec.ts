// avoid loading the real Prisma client during unit tests
jest.mock('../generated/prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      authProvider: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        upsert: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
      },
    })),
  };
});
// replace bcrypt.hash with mock so we can control return value
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
import { beforeAll, beforeEach, afterEach, describe, it, expect, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import * as jwt from 'jsonwebtoken';
import { TokenRevocationService } from './token-revocation.service';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
type BcryptHashFn = (value: string | Buffer, saltOrRounds: string | number) => Promise<string>;
type BcryptCompareFn = (value: string | Buffer, encrypted: string) => Promise<boolean>;
const mockBcryptHash = bcrypt.hash as jest.MockedFunction<BcryptHashFn>;
const mockBcryptCompare = bcrypt.compare as jest.MockedFunction<BcryptCompareFn>;

// minimal mimic of the PrismaClient interface used by our service
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  userOtp: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
  },
  userPasswordReset: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
  },
  authProvider: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
    create: jest.fn(),
    updateMany: jest.fn(),
  },
} as any;

const mockMailService = {
  sendOtpVerificationEmail: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
};

const mockTokenRevocationService = {
  revokeToken: jest.fn(),
  isTokenRevoked: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(() => {
    (global as any).fetch = mockFetch;
    process.env.GOOGLE_CLIENT_ID = 'google-client-id';
    process.env.GOOGLE_CLIENT_SECRET = 'google-client-secret';
    process.env.GOOGLE_CALLBACK_URL = 'http://localhost:3000/api/auth/signin/google/callback';
    process.env.LINKEDIN_CLIENT_ID = 'linkedin-client-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'linkedin-client-secret';
    process.env.LINKEDIN_CALLBACK_URL = 'http://localhost:3000/api/auth/signin/linkedin/callback';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: MailService, useValue: mockMailService },
        { provide: TokenRevocationService, useValue: mockTokenRevocationService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('hashes password and calls prisma', async () => {
      const dto = {
        email: 'a@b.com',
        fullname: 'A B',
        password: 'pass1234',
        role: Role.student,
        area_of_interest: 'Testing',
        institution: 'Some School',
      } as any;
      // mimic the structure returned by Prisma: nested profile object
      const fakeUser = {
        id: 1,
        profile: { ...dto, password: 'hashed' },
      } as any;
      mockPrisma.user.create.mockResolvedValue(fakeUser);
      // when searching for existing users we look via findFirst; make sure it
      // returns undefined (no match) for this test.
      mockPrisma.user.findFirst.mockResolvedValue(undefined);

      // configure the bcrypt mock directly
      mockBcryptHash.mockResolvedValue('hashed');
      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('pass1234', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          profile: expect.objectContaining({
            email: 'a@b.com',
            fullname: 'A B',
            password: 'hashed',
            role: Role.student,
          }),
        }),
      });
      // service returns a flattened public user; verify a couple of fields
      expect(result).toMatchObject({
        id: 1,
        email: 'a@b.com',
        fullname: 'A B',
        role: Role.student,
      });
    });

    it('throws BadRequestException on duplicate email', async () => {
      const dto = { email: 'a@b.com', fullname: '', password: 'p', role: Role.student, area_of_interest: 'None', institution: 'Any' } as any;
      // simulate email already exists by returning a record from
      // findFirst; create shouldn’t even be called.
      mockPrisma.user.findFirst.mockResolvedValue({ id: 'existing', profile: { email: 'a@b.com' } });

      await expect(service.create(dto)).rejects.toThrow('Email already in use');

      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns only role and token when credentials are valid', async () => {
      const dto = {
        email: 'Test@Example.com',
        password: 'password123',
      } as any;
      const user = {
        id: 7,
        profile: {
          email: 'test@example.com',
          fullname: 'Test User',
          password: 'hashed-password',
          role: Role.student,
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: true,
  },
} as any;

      mockPrisma.user.findFirst.mockResolvedValue(user);
      mockBcryptCompare.mockResolvedValue(true);

      const result = await service.login(dto);

      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: {
          profile: {
            path: ['email'],
            equals: 'test@example.com',
          },
        },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
      expect(result).toMatchObject({
        role: Role.student,
      });
      expect(typeof result.token).toBe('string');
      const payload = jwt.verify(result.token, 'dev-jwt-secret') as any;
      expect(payload).toMatchObject({
        sub: 7,
        email: 'test@example.com',
        role: Role.student,
      });
    });

    it('throws BadRequestException when password is invalid', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'wrong-password',
      } as any;
      const existingUser = {
        id: 9,
        profile: {
          email: 'test@example.com',
          fullname: 'Test User',
          password: 'hashed-password',
          role: Role.student,
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: false,
        },
      } as any;

      mockPrisma.user.findFirst.mockResolvedValue(existingUser);
      mockBcryptCompare.mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow('Invalid email or password');
    });

    it('throws BadRequestException when email or password is missing', async () => {
      await expect(service.login({ email: 'x@example.com' } as any)).rejects.toThrow('Invalid email or password');
      await expect(service.login({ password: 'secret' } as any)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('logout', () => {
    it('revokes bearer token and destroys session when available', async () => {
      const destroy = jest.fn((cb: (err?: unknown) => void) => cb());
      const req = {
        headers: { authorization: 'Bearer test-token' },
        session: { destroy },
      };

      const result = await service.logout(req);

      expect(mockTokenRevocationService.revokeToken).toHaveBeenCalledWith('test-token', undefined);
      expect(destroy).toHaveBeenCalled();
      expect(result).toEqual({ message: 'User logged out successfully' });
    });

    it('returns success even when no session is available', async () => {
      await expect(service.logout(undefined)).resolves.toEqual({
        message: 'User logged out successfully',
      });
    });
  });

  describe('password reset', () => {
    it('forgotPassword returns a safe message when user does not exist', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(null);

      await expect(service.forgotPassword({ email: 'missing@example.com' } as any)).resolves.toEqual({
        message: 'If an account exists with this email, a reset code has been sent',
      });

      expect(mockPrisma.userPasswordReset.upsert).not.toHaveBeenCalled();
      expect(mockMailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('forgotPassword stores reset code and sends reset mail when user exists', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 41,
        profile: {
          email: 'john@example.com',
          fullname: 'John Doe',
          password: 'hashed',
          role: Role.student,
          institution: 'Test School',
          area_of_interest: 'Testing',
          is_verified: true,
        },
      });
      mockBcryptHash.mockResolvedValue('hashed-otp');

      await service.forgotPassword({ email: 'john@example.com' } as any);

      expect(mockPrisma.userPasswordReset.upsert).toHaveBeenCalled();
      expect(mockMailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'john@example.com',
          otp: expect.stringMatching(/^\d{6}$/),
        }),
      );
    });

    it('resetPassword updates password and marks OTP as used', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 10,
        profile: {
          email: 'reset@example.com',
          fullname: 'Reset User',
          password: 'old-hash',
          role: Role.student,
          institution: 'Test School',
          area_of_interest: 'Testing',
          is_verified: true,
        },
      });
      mockPrisma.userPasswordReset.findUnique.mockResolvedValue({
        id: 'otp-1',
        userId: 10,
        codeHash: 'hash-otp',
        expiresAt: new Date(Date.now() + 60_000),
        usedAt: null,
      });
      mockBcryptCompare.mockResolvedValue(true);
      mockBcryptHash.mockResolvedValue('new-password-hash');

      await expect(
        service.resetPassword({
          email: 'reset@example.com',
          otp: '123456',
          new_password: 'newPassword123',
        } as any),
      ).resolves.toEqual({
        message: 'Password reset successfully',
      });

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 10 },
        data: {
          profile: expect.objectContaining({
            email: 'reset@example.com',
            password: 'new-password-hash',
          }),
        },
      });
      expect(mockPrisma.userPasswordReset.update).toHaveBeenCalledWith({
        where: { id: 'otp-1' },
        data: expect.objectContaining({
          usedAt: expect.any(Date),
        }),
      });
    });

    it('resetPassword throws when OTP is invalid', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 10,
        profile: {
          email: 'reset@example.com',
          fullname: 'Reset User',
          password: 'old-hash',
          role: Role.student,
          institution: 'Test School',
          area_of_interest: 'Testing',
          is_verified: true,
        },
      });
      mockPrisma.userPasswordReset.findUnique.mockResolvedValue({
        id: 'otp-2',
        userId: 10,
        codeHash: 'hash-otp',
        expiresAt: new Date(Date.now() + 60_000),
        usedAt: null,
      });
      mockBcryptCompare.mockResolvedValue(false);

      await expect(
        service.resetPassword({
          email: 'reset@example.com',
          otp: '654321',
          new_password: 'newPassword123',
        } as any),
      ).rejects.toThrow('Invalid or expired reset code');
    });
  });

  describe('social sign-in', () => {
    it('creates a social user from OAuth callback profile', async () => {
      const dto = {
        code: 'oauth-code-456',
        scope: 'openid profile email',
      } as any;

      // created user as returned by Prisma (includes nested profile)
      const createdUser = {
        id: 3,
        profile: {
          email: 'callback@user.com',
          fullname: 'Callback User',
          password: 'hashed',
          role: Role.student,
        },
      } as any;
      // expected public shape after toPublicUser
      const publicUser = {
        id: 3,
        email: 'callback@user.com',
        fullname: 'Callback User',
        role: Role.student,
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: 'access-token' }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            sub: 'li-456',
            email: 'callback@user.com',
            name: 'Callback User',
          }),
        } as any);

      mockPrisma.authProvider.findUnique.mockResolvedValue(null);
      // ensure email lookup returns nothing so a new user is created
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // the only findUnique call we care about here is the final lookup after
      // creating the user; return the public profile.
      // final lookup should return the raw user object (with profile)
      mockPrisma.user.findUnique.mockResolvedValue(createdUser as any);
      mockPrisma.user.create.mockResolvedValue(createdUser);
      mockPrisma.user.findFirst.mockResolvedValue(createdUser as any);
      mockPrisma.authProvider.create.mockResolvedValue({});
      mockBcryptHash.mockResolvedValue('hashed');

      const result = await service.signInWithProviderCallback(AuthProviderType.LINKEDIN, dto);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          profile: expect.objectContaining({
            email: 'callback@user.com',
            fullname: 'Callback User',
            role: Role.student,
          }),
        }),
      });
      expect(mockPrisma.authProvider.create).toHaveBeenCalledWith({
        data: {
          userId: 3,
          provider: AuthProviderType.LINKEDIN,
          providerUserId: 'li-456',
          accessToken: 'access-token',
        },
      });
      expect(result).toMatchObject({
        user: publicUser,
        tokens: {
          token_type: 'Bearer',
          expires_in: 900,
        },
      });
      expect(typeof result?.tokens.access_token).toBe('string');
      const payload = jwt.verify(result?.tokens.access_token ?? '', 'dev-jwt-secret') as any;
      expect(payload).toMatchObject({
        sub: 3,
        email: 'callback@user.com',
        role: Role.student,
      });
    });

    it('propagates provider error when token exchange fails', async () => {
      const dto = {
        code: 'bad-code',
        scope: 'openid profile email',
      } as any;

      // simulate LinkedIn replying with a descriptive failure message
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: 'invalid_request',
          error_description:
            'appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists',
        }),
      } as any);

      await expect(
        service.signInWithProviderCallback(AuthProviderType.LINKEDIN, dto),
      ).rejects.toMatchObject({
        response: {
          message:
            'appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists',
          error: 'invalid_request',
        },
        status: 400,
      });
    });

    it('handles array error_description from provider', async () => {
      const dto = {
        code: 'bad-code',
        scope: 'openid profile email',
      } as any;

      // simulate Google returning array errors
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: 'invalid_request',
          error_description: [
            'property authuser should not exist',
            'property prompt should not exist',
          ],
        }),
      } as any);

      await expect(
        service.signInWithProviderCallback(AuthProviderType.GOOGLE, dto),
      ).rejects.toMatchObject({
        response: {
          message:
            'property authuser should not exist, property prompt should not exist',
          error: 'invalid_request',
        },
        status: 400,
      });
    });
  });
});
