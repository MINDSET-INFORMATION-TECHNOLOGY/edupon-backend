import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from '../generated/prisma/enums';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<Omit<{
        email: string;
        full_name: string;
        password: string;
        role: Role;
        institution: string | null;
        industry: string | null;
        area_of_interest: string | null;
        company_email: string | null;
        is_verified: boolean;
    }, "password"> & {
        id: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        role: Role;
        token: string;
    }>;
    me(req: any): any;
    logout(req: any): Promise<{
        message: string;
    }>;
    requestOtp(requestOtpDto: RequestOtpDto): Promise<{
        message: string;
        expires_at: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProviderSignInUrl(provider: string): {
        url: string;
    };
    signInWithProviderCallback(provider: string, query: Record<string, any>): Promise<{
        role: Role;
        token: string;
    }>;
    private parseProvider;
    private validateProviderQuery;
    private formatValidationError;
}
