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
      },
    })),
  };
});
// replace bcrypt.hash with mock so we can control return value
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType } from '../generated/prisma/enums';

const mockFetch = jest.fn();

// minimal mimic of the PrismaClient interface used by our service
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  authProvider: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
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
      } as any;
      const fakeUser = { id: '1', ...dto, password: 'hashed' };
      mockPrisma.user.create.mockResolvedValue(fakeUser);

      // configure the bcrypt mock directly
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('pass1234', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: { ...dto, password: 'hashed' } });
      expect(result).toEqual(fakeUser);
    });

    it('throws BadRequestException on duplicate email', async () => {
      const dto = { email: 'a@b.com', fullname: '', password: 'p', role: 'STUDENT' } as any;
      const err: any = { code: 'P2002', meta: { target: ['email'] } };
      mockPrisma.user.create.mockRejectedValue(err);

      await expect(service.create(dto)).rejects.toThrow('Email already in use');
    });
  });

  describe('social sign-in', () => {
    it('returns existing user when google provider already linked', async () => {
      const dto = {
        providerUserId: 'google-123',
        email: 'a@b.com',
        fullname: 'A B',
      } as any;
      const publicUser = { id: '1', email: 'a@b.com', fullname: 'A B', role: 'STUDENT' };

      mockPrisma.authProvider.findUnique.mockResolvedValue({ user: publicUser });

      const result = await service.signInWithProvider(AuthProviderType.GOOGLE, dto);

      expect(mockPrisma.authProvider.findUnique).toHaveBeenCalledWith({
        where: {
          provider_providerUserId: {
            provider: AuthProviderType.GOOGLE,
            providerUserId: dto.providerUserId,
          },
        },
        include: {
          user: { omit: { password: true } },
        },
      });
      expect(mockPrisma.authProvider.upsert).not.toHaveBeenCalled();
      expect(result).toEqual(publicUser);
    });

    it('creates link for linkedin provider when not linked yet', async () => {
      const dto = {
        providerUserId: 'li-123',
        email: 'new@user.com',
        fullname: 'New User',
        role: 'STUDENT',
      } as any;

      const createdUser = {
        id: '2',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'hashed',
        role: 'STUDENT',
      };
      const publicUser = {
        id: '2',
        email: 'new@user.com',
        fullname: 'New User',
        role: 'STUDENT',
      };

      mockPrisma.authProvider.findUnique.mockResolvedValue(null);
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(publicUser);
      mockPrisma.user.create.mockResolvedValue(createdUser);
      mockPrisma.authProvider.upsert.mockResolvedValue({});
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const result = await service.signInWithProvider(AuthProviderType.LINKEDIN, dto);

      expect(mockPrisma.authProvider.upsert).toHaveBeenCalledWith({
        where: {
          userId_provider: {
            userId: '2',
            provider: AuthProviderType.LINKEDIN,
          },
        },
        update: {
          providerUserId: dto.providerUserId,
          accessToken: undefined,
          refreshToken: undefined,
        },
        create: {
          userId: '2',
          provider: AuthProviderType.LINKEDIN,
          providerUserId: dto.providerUserId,
          accessToken: undefined,
          refreshToken: undefined,
        },
      });
      expect(result).toEqual(publicUser);
    });

    it('throws when callback password and confirm password do not match', async () => {
      const dto = {
        code: 'oauth-code-123',
        password: 'strongPassword123',
        confirmPassword: 'differentPassword123',
      } as any;

      await expect(service.signInWithProviderCallback(AuthProviderType.GOOGLE, dto)).rejects.toThrow(
        'Password and confirm password do not match',
      );
      expect(mockPrisma.authProvider.findUnique).not.toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('uses callback password when creating a new social user', async () => {
      const dto = {
        code: 'oauth-code-456',
        role: 'STUDENT',
        password: 'strongPassword123',
        confirmPassword: 'strongPassword123',
      } as any;

      const createdUser = {
        id: '3',
        email: 'callback@user.com',
        fullname: 'Callback User',
        avatar: 'https://cdn.linkedin.com/avatar.jpg',
        password: 'hashed',
        role: 'STUDENT',
      };
      const publicUser = {
        id: '3',
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
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(publicUser);
      mockPrisma.user.create.mockResolvedValue(createdUser);
      mockPrisma.authProvider.upsert.mockResolvedValue({});
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const result = await service.signInWithProviderCallback(AuthProviderType.LINKEDIN, dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('strongPassword123', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'callback@user.com',
          fullname: 'Callback User',
          password: 'hashed',
          role: 'STUDENT',
          institution: undefined,
          area_of_interest: undefined,
          avatar: 'https://cdn.linkedin.com/avatar.jpg',
        },
      });
      expect(mockPrisma.authProvider.upsert).toHaveBeenCalledWith({
        where: {
          userId_provider: {
            userId: '3',
            provider: AuthProviderType.LINKEDIN,
          },
        },
        update: {
          providerUserId: 'li-456',
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
        create: {
          userId: '3',
          provider: AuthProviderType.LINKEDIN,
          providerUserId: 'li-456',
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      });
      expect(result).toEqual(publicUser);
    });
  });
});
