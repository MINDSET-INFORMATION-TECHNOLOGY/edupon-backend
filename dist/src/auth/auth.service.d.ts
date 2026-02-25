import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthProviderType, Role } from '../generated/prisma/enums';
import { SocialSignInCallbackDto } from './dto/social-signin.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAuthDto: CreateAuthDto): Promise<User>;
    findAll(): Promise<{
        email: string;
        fullname: string;
        role: Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        fullname: string;
        role: Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateAuthDto: UpdateAuthDto): Promise<{
        email: string;
        fullname: string;
        role: Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        email: string;
        fullname: string;
        role: Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signInWithProviderCallback(provider: AuthProviderType, dto: SocialSignInCallbackDto): Promise<{
        email: string;
        fullname: string;
        role: Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    private resolveSocialSignInPayload;
}
