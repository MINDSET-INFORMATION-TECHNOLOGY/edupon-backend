import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SocialSignInCallbackDto } from './dto/social-signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProviderSignInUrl(provider: string): {
        url: string;
        state: `${string}-${string}-${string}-${string}-${string}`;
    };
    signInWithProviderCallback(provider: string, socialSignInCallbackDto: SocialSignInCallbackDto): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        fullname: string;
        role: import("../generated/prisma/enums").Role;
        institution: string | null;
        area_of_interest: string | null;
        avatar: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private parseProvider;
}
