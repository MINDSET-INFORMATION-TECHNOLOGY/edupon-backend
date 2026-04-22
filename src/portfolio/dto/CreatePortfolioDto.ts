import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsUrl, IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePortfolioDto {
    @ApiProperty({ description: 'Maps to Portfolio.fullName' })
    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @ApiProperty({ description: 'Maps to Portfolio.email' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Maps to Portfolio.bio' })
    @IsString()
    @IsNotEmpty()
    bio!: string;

    @ApiProperty({ description: 'Maps to Portfolio.skills' })
    @IsArray()
    @IsString({ each: true })
    skills!: string[];

    @ApiProperty({ description: 'Maps to Portfolio.portfolioLink' })
    @IsUrl()
    portfolioLink!: string;

    @ApiPropertyOptional({ description: 'Associated User ID (optional, inferred from auth)' })
    @IsOptional()
    @IsNumber()
    userId?: number;
}
