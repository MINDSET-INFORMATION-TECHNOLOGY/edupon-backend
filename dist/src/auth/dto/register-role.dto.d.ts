declare class RegisterCommonDto {
    email: string;
    fullname: string;
    password: string;
    area_of_interest: string;
    avatar?: string;
}
export declare class StudentRegisterDto extends RegisterCommonDto {
    role: 'STUDENT';
    institution: string;
}
export declare class EducatorRegisterDto extends RegisterCommonDto {
    role: 'EDUCATOR';
    institution: string;
}
export declare class CompanyRegisterDto extends RegisterCommonDto {
    role: 'COMPANY';
    industry: string;
    company_email: string;
}
export {};
