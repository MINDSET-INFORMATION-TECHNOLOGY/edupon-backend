import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
export declare class PortfolioService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreatePortfolioDto): Promise<{
        email: string;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        fullName: string;
        bio: string;
        portfolioLink: string;
    }>;
    findOne(id: number): Promise<{
        email: string;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        fullName: string;
        bio: string;
        portfolioLink: string;
    }>;
    update(userId: number, id: number, dto: UpdatePortfolioDto): Promise<{
        email: string;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        fullName: string;
        bio: string;
        portfolioLink: string;
    }>;
}
