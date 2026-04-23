import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
export declare class PortfolioService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreatePortfolioDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        fullName: string;
        email: string;
        bio: string;
        skills: string[];
        portfolioLink: string;
    }>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        fullName: string;
        email: string;
        bio: string;
        skills: string[];
        portfolioLink: string;
    }>;
    update(userId: number, id: number, dto: UpdatePortfolioDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        fullName: string;
        email: string;
        bio: string;
        skills: string[];
        portfolioLink: string;
    }>;
}
