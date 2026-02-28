export declare const LOCAL_UPLOAD_ROOT: string;
export declare const AVATAR_UPLOAD_DIR: string;
export declare const MAX_AVATAR_FILE_SIZE: number;
export declare function ensureUploadDirectories(): void;
export declare function isAllowedAvatarMimeType(mimeType: string): boolean;
export declare function resolveLocalUploadBaseUrl(req?: {
    protocol?: string;
    get?: (name: string) => string;
}): string;
export declare function buildAvatarPublicUrl(filename: string, baseUrl?: string): string;
export declare function extractAvatarFilenameFromUrl(avatarUrl: string): string | null;
export declare function buildAvatarIdentityFilename(userId: number, fullname: string, currentFilename: string): string;
export declare function getAvatarDiskPath(filename: string): string;
export declare function replaceAvatarFilenameInUrl(currentAvatarUrl: string, nextFilename: string): string;
export declare const avatarDiskStorage: any;
