"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadMulterOptions = exports.imageUploadMulterOptions = exports.MAX_FILE_UPLOAD_SIZE = exports.MAX_IMAGE_UPLOAD_SIZE = exports.isLocalUploadDriver = exports.UPLOAD_STORAGE_DRIVER = exports.UPLOAD_PUBLIC_PREFIX = exports.LOCAL_UPLOAD_ROOT = void 0;
exports.ensureUploadDirectories = ensureUploadDirectories;
exports.resolveUploadedFile = resolveUploadedFile;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = require("multer");
const MIME_EXTENSION_MAP = {
    'application/msword': '.doc',
    'application/pdf': '.pdf',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.ms-excel.sheet.macroenabled.12': '.xlsm',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/zip': '.zip',
    'image/gif': '.gif',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
    'text/csv': '.csv',
    'text/plain': '.txt',
};
const DEFAULT_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const DEFAULT_FILE_EXTENSIONS = [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.txt',
    '.csv',
    '.zip',
];
const IMAGE_FOLDER = 'uploads/avatar';
const FILE_FOLDER = 'uploads/docs';
const DEFAULT_S3_REGION = 'us-east-1';
const DEFAULT_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
const DEFAULT_FILE_SIZE_BYTES = 50 * 1024 * 1024;
exports.LOCAL_UPLOAD_ROOT = process.env.LOCAL_UPLOAD_DIR ?? (0, path_1.join)(process.cwd(), 'public');
exports.UPLOAD_PUBLIC_PREFIX = '/public';
const configuredDriver = (process.env.UPLOAD_STORAGE_DRIVER ?? 'local').trim().toLowerCase();
exports.UPLOAD_STORAGE_DRIVER = configuredDriver === 's3' ? 's3' : 'local';
exports.isLocalUploadDriver = exports.UPLOAD_STORAGE_DRIVER === 'local';
const imageExtensions = parseExtensionList(process.env.UPLOAD_IMAGE_EXTENSIONS, DEFAULT_IMAGE_EXTENSIONS);
const fileExtensions = parseExtensionList(process.env.UPLOAD_FILE_EXTENSIONS, DEFAULT_FILE_EXTENSIONS);
exports.MAX_IMAGE_UPLOAD_SIZE = parseByteSize(process.env.MAX_IMAGE_UPLOAD_SIZE, DEFAULT_IMAGE_SIZE_BYTES);
exports.MAX_FILE_UPLOAD_SIZE = parseByteSize(process.env.MAX_FILE_UPLOAD_SIZE, DEFAULT_FILE_SIZE_BYTES);
exports.imageUploadMulterOptions = createMulterOptions('image');
exports.fileUploadMulterOptions = createMulterOptions('file');
function ensureUploadDirectories() {
    if (!exports.isLocalUploadDriver) {
        return;
    }
    for (const dir of [
        exports.LOCAL_UPLOAD_ROOT,
        (0, path_1.join)(exports.LOCAL_UPLOAD_ROOT, IMAGE_FOLDER),
        (0, path_1.join)(exports.LOCAL_UPLOAD_ROOT, FILE_FOLDER),
    ]) {
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir, { recursive: true });
        }
    }
}
function resolveUploadedFile(file) {
    if (!file) {
        return null;
    }
    const extension = detectExtension(file.originalname, file.mimetype, file.filename ?? file.key);
    if (!exports.isLocalUploadDriver) {
        const key = (file.key ?? '').trim();
        if (!key) {
            return null;
        }
        return {
            extension,
            key,
            url: (file.location ?? '').trim() || buildS3PublicUrl(key),
        };
    }
    const filename = (file.filename ?? '').trim();
    if (!filename) {
        return null;
    }
    const folder = resolveLocalFolder(file.destination, file.mimetype);
    const key = `${folder}/${filename}`;
    return {
        extension,
        key,
        url: `${exports.UPLOAD_PUBLIC_PREFIX}/${key}`,
    };
}
function parseExtensionList(value, fallback) {
    const source = value
        ? value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : fallback;
    const normalized = source
        .map((item) => item.toLowerCase())
        .map((item) => (item.startsWith('.') ? item : `.${item}`))
        .filter((item) => /^[.][a-z0-9]+$/.test(item));
    return new Set(normalized.length > 0 ? normalized : fallback);
}
function parseByteSize(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function parseBoolean(value, fallback) {
    if (typeof value !== 'string') {
        return fallback;
    }
    switch (value.trim().toLowerCase()) {
        case '1':
        case 'true':
        case 'yes':
        case 'on':
            return true;
        case '0':
        case 'false':
        case 'no':
        case 'off':
            return false;
        default:
            return fallback;
    }
}
function resolveFolder(kind) {
    return kind === 'image' ? IMAGE_FOLDER : FILE_FOLDER;
}
function resolveLocalFolder(destination, mimetype) {
    const normalizedDestination = (destination ?? '').replace(/\\/g, '/').toLowerCase();
    if (normalizedDestination.endsWith(`/${IMAGE_FOLDER}`) || normalizedDestination.endsWith(IMAGE_FOLDER)) {
        return IMAGE_FOLDER;
    }
    if (normalizedDestination.endsWith(`/${FILE_FOLDER}`) || normalizedDestination.endsWith(FILE_FOLDER)) {
        return FILE_FOLDER;
    }
    if ((mimetype ?? '').toLowerCase().startsWith('image/')) {
        return IMAGE_FOLDER;
    }
    return FILE_FOLDER;
}
function detectExtension(originalName, mimetype, fallbackName) {
    const originalExt = (0, path_1.extname)((originalName ?? '').trim()).toLowerCase();
    if (/^[.][a-z0-9]+$/.test(originalExt)) {
        return originalExt;
    }
    const mapped = MIME_EXTENSION_MAP[(mimetype ?? '').toLowerCase()];
    if (mapped) {
        return mapped;
    }
    const fallbackExt = (0, path_1.extname)((fallbackName ?? '').trim()).toLowerCase();
    if (/^[.][a-z0-9]+$/.test(fallbackExt)) {
        return fallbackExt;
    }
    return '.bin';
}
function extractOriginalBaseName(originalName) {
    const normalized = (originalName ?? '').trim().replace(/\\/g, '/');
    const lastSegment = normalized.split('/').pop() ?? '';
    if (!lastSegment) {
        return 'file';
    }
    const extension = (0, path_1.extname)(lastSegment);
    const withoutExtension = extension
        ? lastSegment.slice(0, Math.max(lastSegment.length - extension.length, 0))
        : lastSegment;
    return withoutExtension.trim() || 'file';
}
function slugifyBaseName(value) {
    const slug = value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || 'file';
}
function buildStoredFilename(file) {
    const id = (0, crypto_1.randomUUID)();
    const extension = detectExtension(file.originalname, file.mimetype);
    const originalBase = extractOriginalBaseName(file.originalname);
    const safeBase = slugifyBaseName(originalBase);
    return `${id}-${safeBase}${extension}`;
}
function createObjectKey(kind, file) {
    const folder = resolveFolder(kind);
    return `${folder}/${buildStoredFilename(file)}`;
}
function createLocalStorage(kind) {
    const folder = resolveFolder(kind);
    return (0, multer_1.diskStorage)({
        destination: (_req, _file, callback) => {
            callback(null, (0, path_1.join)(exports.LOCAL_UPLOAD_ROOT, folder));
        },
        filename: (_req, file, callback) => {
            callback(null, buildStoredFilename(file));
        },
    });
}
function createS3Storage(kind) {
    let S3ClientCtor;
    let multerS3;
    try {
        S3ClientCtor = require('@aws-sdk/client-s3').S3Client;
        multerS3 = require('multer-s3');
    }
    catch {
        throw new Error('S3 upload driver selected but dependencies are missing. Install @aws-sdk/client-s3 and multer-s3.');
    }
    const bucket = (process.env.S3_BUCKET ?? '').trim();
    if (!bucket) {
        throw new Error('S3 upload driver selected but S3_BUCKET is not set.');
    }
    const region = (process.env.S3_REGION ?? DEFAULT_S3_REGION).trim();
    const endpoint = (process.env.S3_ENDPOINT ?? '').trim();
    const forcePathStyle = parseBoolean(process.env.S3_FORCE_PATH_STYLE, false);
    const accessKeyId = (process.env.S3_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID ?? '').trim();
    const secretAccessKey = (process.env.S3_SECRET_ACCESS_KEY ??
        process.env.AWS_SECRET_ACCESS_KEY ??
        '').trim();
    const clientInput = {
        forcePathStyle,
        region,
    };
    if (endpoint) {
        clientInput.endpoint = endpoint;
    }
    if (accessKeyId && secretAccessKey) {
        clientInput.credentials = {
            accessKeyId,
            secretAccessKey,
        };
    }
    const client = new S3ClientCtor(clientInput);
    const acl = (process.env.S3_OBJECT_ACL ?? '').trim();
    return multerS3({
        s3: client,
        bucket,
        acl: acl || undefined,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (_req, file, callback) => {
            callback(null, createObjectKey(kind, file));
        },
        metadata: (_req, file, callback) => {
            const extension = detectExtension(file.originalname, file.mimetype).replace('.', '');
            callback(null, {
                extension,
                originalName: file.originalname ?? '',
            });
        },
    });
}
function createMulterOptions(kind) {
    const allowedExtensions = kind === 'image' ? imageExtensions : fileExtensions;
    return {
        storage: exports.isLocalUploadDriver ? createLocalStorage(kind) : createS3Storage(kind),
        limits: {
            fileSize: kind === 'image' ? exports.MAX_IMAGE_UPLOAD_SIZE : exports.MAX_FILE_UPLOAD_SIZE,
        },
        fileFilter: (_req, file, callback) => {
            const extension = detectExtension(file.originalname, file.mimetype);
            if (!allowedExtensions.has(extension)) {
                const message = `Unsupported ${kind} extension "${extension}". Allowed: ${Array.from(allowedExtensions).join(', ')}`;
                callback(new common_1.BadRequestException(message), false);
                return;
            }
            callback(null, true);
        },
    };
}
function buildS3PublicUrl(key) {
    const configured = (process.env.S3_PUBLIC_BASE_URL ?? '').trim().replace(/\/+$/, '');
    if (configured) {
        return `${configured}/${key}`;
    }
    const bucket = (process.env.S3_BUCKET ?? '').trim();
    const region = (process.env.S3_REGION ?? DEFAULT_S3_REGION).trim();
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
//# sourceMappingURL=local-upload.config.js.map