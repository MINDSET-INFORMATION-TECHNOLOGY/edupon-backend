import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(dto: CreatePortfolioDto, req: any): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdatePortfolioDto, req: any): Promise<{
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
