import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import { ProviderSignInDto } from './dto/social-signin.dto';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
import { TokenRevocationService } from './token-revocation.service';
type UserProfileData = {
    email: string;
    full_name: string;
    password: string;
    role: Role;
    institution: string | null;
    industry: string | null;
    area_of_interest: string | null;
    company_email: string | null;
    is_verified: boolean;
};
type PublicUser = Omit<UserProfileData, 'password'> & {
    id: number;
};
type AuthTokens = {
    token_type: 'Bearer';
    access_token: string;
    expires_in: number;
};
type AuthSessionResponse = {
    user: PublicUser;
    tokens: AuthTokens;
};
type LoginResponse = {
    role: Role;
    token: string;
};
export declare class AuthService {
    private prisma;
    private mailService;
    private tokenRevocationService;
    private static readonly OTP_TTL_MS;
    private static readonly ACCESS_TOKEN_TTL_SECONDS;
    private readonly logger;
    constructor(prisma: PrismaService, mailService: MailService, tokenRevocationService: TokenRevocationService);
    create(createAuthDto: CreateAuthDto): Promise<PublicUser>;
    login(dto: LoginDto): Promise<LoginResponse>;
    logout(req?: any): Promise<{
        message: string;
    }>;
    findAll(): Promise<PublicUser[]>;
    findOne(id: number): Promise<PublicUser>;
    update(id: number, updateAuthDto: UpdateAuthDto): Promise<PublicUser>;
    remove(id: number): Promise<PublicUser>;
    requestOtp(dto: RequestOtpDto): Promise<{
        message: string;
        expires_at: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    signInWithProviderCallback(provider: AuthProviderType, dto: ProviderSignInDto): Promise<AuthSessionResponse | null>;
    getProviderSignInUrl(provider: AuthProviderType): {
        url: string;
    };
    private getProviderConfig;
    private validateProviderConfig;
    private exchangeCodeForToken;
    private fetchProviderProfile;
    private findOrCreateSocialUser;
    private upsertSocialProvider;
    private syncSocialProfileFields;
    private findUserByEmail;
    private readUserProfile;
    private buildRoleProfile;
    private normalizeOptionalText;
    private normalizeOptionalEmail;
    private resolveOptionalProfileField;
    private generateOtpCode;
    private issueAuthSession;
    private generateAccessToken;
    private getJwtSecret;
    private toPublicUser;
    private withErrorLogging;
}
export {};
