import { PartialType } from "@nestjs/mapped-types";
import { CreatePortfolioDto } from "./CreatePortfolioDto";

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) { }
