export declare abstract class SocialSignInDto {
    code: string;
    scope: string;
}
export declare class GoogleSignInDto extends SocialSignInDto {
    prompt: string;
    authuser: string;
}
export declare class LinkedInSignInDto extends SocialSignInDto {
}
export type ProviderSignInDto = GoogleSignInDto | LinkedInSignInDto;
