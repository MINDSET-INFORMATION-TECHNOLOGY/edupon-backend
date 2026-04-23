import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreatePortfolioDto) {
    const existing = await this.prisma.portfolio.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new ConflictException('User already has a portfolio');
    }
    return this.prisma.portfolio.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        bio: dto.bio,
        skills: dto.skills,
        portfolioLink: dto.portfolioLink,
        userId,
      },
    });
  }

  async findOne(id: number) {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return portfolio;
  }

  async update(userId: number, id: number, dto: UpdatePortfolioDto) {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    if (portfolio.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to edit this portfolio',
      );
    }
    return this.prisma.portfolio.update({
      where: { id },
      data: dto,
    });
  }
}
