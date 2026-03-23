import { IsString, IsEmail, IsUrl, IsArray, IsNotEmpty } from "class-validator";

export class CreatePortfolioDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    bio: string;

    @IsArray()
    @IsString({ each: true })
    skills: string[];

    @IsUrl()
    portfolioLink: string;
}