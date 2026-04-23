import { Role } from '../../generated/prisma/enums';
export declare class CreateAuthDto {
    email: string;
    full_name: string;
    skills?: string[];
    password: string;
    role: Role;
    institution: string;
    area_of_interest: string;
    industry: string;
    company_email: string;
}
