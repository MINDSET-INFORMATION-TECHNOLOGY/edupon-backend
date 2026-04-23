import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockPrisma = {
  portfolio: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a portfolio when none exists', async () => {
      const dto = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        bio: 'Developer',
        skills: ['TypeScript'],
        portfolioLink: 'https://jane.dev',
      } as any;
      const created = { id: 1, userId: 10, ...dto };

      mockPrisma.portfolio.findUnique.mockResolvedValue(null);
      mockPrisma.portfolio.create.mockResolvedValue(created);

      await expect(service.create(10, dto)).resolves.toEqual(created);
      expect(mockPrisma.portfolio.findUnique).toHaveBeenCalledWith({
        where: { userId: 10 },
      });
      expect(mockPrisma.portfolio.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 10,
          email: 'jane@example.com',
        }),
      });
    });

    it('throws ConflictException when portfolio already exists', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue({ id: 1, userId: 10 });

      await expect(service.create(10, {} as any)).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(mockPrisma.portfolio.create).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('returns a portfolio by id', async () => {
      const portfolio = { id: 5, userId: 10 };
      mockPrisma.portfolio.findUnique.mockResolvedValue(portfolio);

      await expect(service.findOne(5)).resolves.toEqual(portfolio);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('updates portfolio when owner matches', async () => {
      const portfolio = { id: 5, userId: 10 };
      const updated = { ...portfolio, bio: 'Updated' };
      mockPrisma.portfolio.findUnique.mockResolvedValue(portfolio);
      mockPrisma.portfolio.update.mockResolvedValue(updated);

      await expect(
        service.update(10, 5, { bio: 'Updated' } as any),
      ).resolves.toEqual(updated);
    });

    it('throws NotFoundException when portfolio does not exist', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue(null);

      await expect(service.update(10, 99, {} as any)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('throws ForbiddenException when user is not the owner', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue({ id: 5, userId: 99 });

      await expect(service.update(10, 5, {} as any)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });
});
