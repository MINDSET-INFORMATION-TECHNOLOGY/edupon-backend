import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import { SocialSignInDto } from './dto/social-signin.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MailService } from '../mail/mail.service';
type UserProfileData = {
    email: string;
    fullname: string;
    avatar: string | null;
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
export declare class AuthService {
    private prisma;
    private mailService;
    private static readonly OTP_TTL_MS;
    constructor(prisma: PrismaService, mailService: MailService);
    create(createAuthDto: CreateAuthDto): Promise<PublicUser>;
    findAll(): Promise<PublicUser[]>;
    findOne(id: number): Promise<PublicUser>;
    update(id: number, updateAuthDto: UpdateAuthDto): Promise<PublicUser>;
    remove(id: number): Promise<PublicUser>;
    requestOtp(dto: RequestOtpDto): Promise<{
        message: string;
        expires_at: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    signInWithProviderCallback(provider: AuthProviderType, dto: SocialSignInDto): Promise<PublicUser | null>;
    getProviderSignInUrl(provider: AuthProviderType): {
        url: string;
        state: `${string}-${string}-${string}-${string}-${string}`;
    };
    private getProviderConfig;
    private validateProviderConfig;
    private exchangeCodeForToken;
    private fetchProviderProfile;
    private findOrCreateSocialUser;
    private upsertSocialProvider;
    private findUserByEmail;
    private readUserProfile;
    private buildRoleProfile;
    private normalizeOptionalText;
    private normalizeOptionalEmail;
    private generateOtpCode;
    private toPublicUser;
}
export {};
