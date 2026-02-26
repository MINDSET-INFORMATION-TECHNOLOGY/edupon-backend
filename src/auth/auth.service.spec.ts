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
        findUnique: jest.fn(),
        upsert: jest.fn(),
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
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { AuthProviderType } from '../generated/prisma/enums';

const mockFetch = jest.fn();

// minimal mimic of the PrismaClient interface used by our service
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  authProvider: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    updateMany: jest.fn(),
  },
};

const mockMailService = {
  sendOtpVerificationEmail: jest.fn(),
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
        role: 'STUDENT',
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
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('pass1234', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          profile: expect.objectContaining({
            email: 'a@b.com',
            fullname: 'A B',
            password: 'hashed',
            role: 'STUDENT',
          }),
        }),
      });
      // service returns a flattened public user; verify a couple of fields
      expect(result).toMatchObject({
        id: 1,
        email: 'a@b.com',
        fullname: 'A B',
        role: 'STUDENT',
      });
    });

    it('throws BadRequestException on duplicate email', async () => {
      const dto = { email: 'a@b.com', fullname: '', password: 'p', role: 'STUDENT', area_of_interest: 'None', institution: 'Any' } as any;
      // simulate email already exists by returning a record from
      // findFirst; create shouldn’t even be called.
      mockPrisma.user.findFirst.mockResolvedValue({ id: 'existing', profile: { email: 'a@b.com' } });

      await expect(service.create(dto)).rejects.toThrow('Email already in use');

      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns user plus access and refresh tokens when credentials are valid', async () => {
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
          role: 'STUDENT',
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: true,
        },
      } as any;

      mockPrisma.user.findFirst.mockResolvedValue(user);
      mockPrisma.user.update.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('refresh-token-hash');

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
      expect(mockPrisma.user.update).toHaveBeenCalled();
      expect(result).toMatchObject({
        user: {
          id: 7,
          email: 'test@example.com',
          fullname: 'Test User',
          role: 'STUDENT',
        },
        tokens: {
          token_type: 'Bearer',
          expires_in: 900,
          refresh_expires_in: 604800,
        },
      });
      expect(typeof result.tokens.access_token).toBe('string');
      expect(typeof result.tokens.refresh_token).toBe('string');
      expect(new Date(result.tokens.refresh_token_expires_at).toString()).not.toBe('Invalid Date');
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
          role: 'STUDENT',
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: false,
        },
      } as any;

      mockPrisma.user.findFirst.mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow('Invalid email or password');
    });

    it('throws BadRequestException when email or password is missing', async () => {
      await expect(service.login({ email: 'x@example.com' } as any)).rejects.toThrow('Invalid email or password');
      await expect(service.login({ password: 'secret' } as any)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('refresh token', () => {
    it('rotates tokens when refresh token is valid', async () => {
      const dto = {
        refresh_token: '7.abc.def',
      } as any;
      const user = {
        id: 7,
        profile: {
          email: 'test@example.com',
          fullname: 'Test User',
          password: 'hashed-password',
          role: 'STUDENT',
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: true,
          refresh_token_hash: 'old-refresh-hash',
          refresh_token_expires_at: new Date(Date.now() + 60_000).toISOString(),
        },
      } as any;

      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockPrisma.user.update.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-refresh-hash');

      const result = await service.refreshToken(dto);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 7 },
      });
      expect(mockPrisma.user.update).toHaveBeenCalled();
      expect(result.tokens.refresh_expires_in).toBe(604800);
      expect(result.tokens.refresh_token).not.toBe(dto.refresh_token);
    });

    it('rejects expired refresh token', async () => {
      const dto = {
        refresh_token: '7.abc.def',
      } as any;
      const user = {
        id: 7,
        profile: {
          email: 'test@example.com',
          fullname: 'Test User',
          password: 'hashed-password',
          role: 'STUDENT',
          area_of_interest: 'Testing',
          institution: 'Test University',
          is_verified: true,
          refresh_token_hash: 'old-refresh-hash',
          refresh_token_expires_at: new Date(Date.now() - 60_000).toISOString(),
        },
      } as any;

      mockPrisma.user.findUnique.mockResolvedValue(user);

      await expect(service.refreshToken(dto)).rejects.toThrow('Refresh token has expired');
    });
  });

  describe('logout', () => {
    it('destroys current session when session is available', async () => {
      const destroy = jest.fn((cb: (err?: unknown) => void) => cb());
      const req = { session: { destroy } };

      const result = await service.logout(req);

      expect(destroy).toHaveBeenCalled();
      expect(result).toEqual({ message: 'User logged out successfully' });
    });

    it('returns success even when no session is available', async () => {
      await expect(service.logout(undefined)).resolves.toEqual({
        message: 'User logged out successfully',
      });
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
          avatar: 'https://cdn.linkedin.com/avatar.jpg',
          password: 'hashed',
          role: 'STUDENT',
        },
      } as any;
      // expected public shape after toPublicUser
      const publicUser = {
        id: 3,
        email: 'callback@user.com',
        fullname: 'Callback User',
        avatar: 'https://cdn.linkedin.com/avatar.jpg',
        role: 'STUDENT',
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: 'access-token', refresh_token: 'refresh-token' }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            sub: 'li-456',
            email: 'callback@user.com',
            name: 'Callback User',
            picture: 'https://cdn.linkedin.com/avatar.jpg',
          }),
        } as any);

      mockPrisma.authProvider.findUnique.mockResolvedValue(null);
      // ensure email lookup returns nothing so a new user is created
      mockPrisma.user.findFirst.mockResolvedValue(null);
      // the only findUnique call we care about here is the final lookup after
      // creating the user; return the public profile.
      // final lookup should return the raw user object (with profile)
      mockPrisma.user.findUnique.mockResolvedValue(createdUser as any);
      mockPrisma.user.create.mockResolvedValue(createdUser);
      mockPrisma.authProvider.upsert.mockResolvedValue({});
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const result = await service.signInWithProviderCallback(AuthProviderType.LINKEDIN, dto);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          profile: expect.objectContaining({
            email: 'callback@user.com',
            fullname: 'Callback User',
            avatar: 'https://cdn.linkedin.com/avatar.jpg',
            role: 'STUDENT',
          }),
        }),
      });
      expect(mockPrisma.authProvider.upsert).toHaveBeenCalledWith({
        where: {
          userId_provider: {
            userId: 3,
            provider: AuthProviderType.LINKEDIN,
          },
        },
        update: {
          providerUserId: 'li-456',
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
        create: {
          userId: 3,
          provider: AuthProviderType.LINKEDIN,
          providerUserId: 'li-456',
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      });
      // publicUser only specifies a subset of fields; the service adds
      // null/default values for the rest, so use toMatchObject.
      expect(result).toMatchObject(publicUser);
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
