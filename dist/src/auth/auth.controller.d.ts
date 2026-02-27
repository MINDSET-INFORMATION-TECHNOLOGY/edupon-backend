import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SocialSignInDto } from './dto/social-signin.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<Omit<{
        email: string;
        fullname: string;
        avatar: string | null;
        password: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        industry: string | null;
        area_of_interest: string | null;
        company_email: string | null;
        is_verified: boolean;
    }, "password"> & {
        id: number;
    }>;
    requestOtp(requestOtpDto: RequestOtpDto): Promise<{
        message: string;
        expires_at: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    getProviderSignInUrl(provider: string): {
        url: string;
        state: `${string}-${string}-${string}-${string}-${string}`;
    };
    signInWithProviderCallback(provider: string, socialSignInDto: SocialSignInDto): Promise<Omit<{
        email: string;
        fullname: string;
        avatar: string | null;
        password: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        industry: string | null;
        area_of_interest: string | null;
        company_email: string | null;
        is_verified: boolean;
    }, "password"> & {
        id: number;
    }>;
    private parseProvider;
}
