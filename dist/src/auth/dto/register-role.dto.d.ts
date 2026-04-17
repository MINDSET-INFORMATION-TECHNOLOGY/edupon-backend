declare class RegisterCommonDto {
    email: string;
    fullname: string;
    password: string;
    area_of_interest: string;
}
export declare class StudentRegisterDto extends RegisterCommonDto {
    role: 'student';
    institution: string;
}
export declare class EducatorRegisterDto extends RegisterCommonDto {
    role: 'educator';
    institution: string;
}
export declare class CompanyRegisterDto extends RegisterCommonDto {
    role: 'company';
    industry: string;
    company_email: string;
}
export {};
