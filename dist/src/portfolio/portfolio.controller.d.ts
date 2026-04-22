import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(dto: CreatePortfolioDto, req: any): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdatePortfolioDto, req: any): Promise<{
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
