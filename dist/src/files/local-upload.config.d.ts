import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
type UploadDriver = 'local' | 's3';
export type UploadedFileLike = {
    destination?: string;
    filename?: string;
    key?: string;
    location?: string;
    mimetype?: string;
    originalname?: string;
};
type UploadedFileResult = {
    extension: string;
    key: string;
    url: string;
};
export declare const LOCAL_UPLOAD_ROOT: string;
export declare const UPLOAD_PUBLIC_PREFIX = "/public";
export declare const UPLOAD_STORAGE_DRIVER: UploadDriver;
export declare const isLocalUploadDriver: boolean;
export declare const MAX_IMAGE_UPLOAD_SIZE: number;
export declare const MAX_FILE_UPLOAD_SIZE: number;
export declare const imageUploadMulterOptions: MulterOptions;
export declare const fileUploadMulterOptions: MulterOptions;
export declare function ensureUploadDirectories(): void;
export declare function resolveUploadedFile(file?: UploadedFileLike): UploadedFileResult | null;
export {};
