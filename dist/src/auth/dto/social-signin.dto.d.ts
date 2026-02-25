import { Role } from '../../generated/prisma/enums';
export declare class SocialSignInDto {
    providerUserId: string;
    email?: string;
    fullname?: string;
    role?: Role;
    institution?: string;
    area_of_interest?: string;
    accessToken?: string;
    refreshToken?: string;
    avatar?: string;
}
export declare class SocialSignInCallbackDto {
    code: string;
    password: string;
    confirmPassword: string;
    role?: Role;
    institution?: string;
    area_of_interest?: string;
}
