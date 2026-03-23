import { Controller, Get, Post, Patch, Param, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
import { AuthGuard } from '@nestjs/passport';



@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }
    
    @UseGuards(AuthGuard('jwt')) 
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreatePortfolioDto, @Request() req) {
        return this.portfolioService.create(req.user.userId, dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.portfolioService.findOne(Number(id));
    }
@UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() dto: UpdatePortfolioDto, @Request() req) {
        return this.portfolioService.update(req.user.userId, Number(id), dto);
    }
}
