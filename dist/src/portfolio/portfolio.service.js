"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const existing = await this.prisma.portfolio.findUnique({
            where: { userId },
        });
        if (existing) {
            throw new common_1.ConflictException('User already has a portfolio');
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
    async findOne(id) {
        const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });
        if (!portfolio) {
            throw new common_1.NotFoundException('Portfolio not found');
        }
        return portfolio;
    }
    async update(userId, id, dto) {
        const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });
        if (!portfolio) {
            throw new common_1.NotFoundException('Portfolio not found');
        }
        if (portfolio.userId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to edit this portfolio');
        }
        return this.prisma.portfolio.update({
            where: { id },
            data: dto,
        });
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map