"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarDiskStorage = exports.MAX_AVATAR_FILE_SIZE = exports.AVATAR_UPLOAD_DIR = exports.LOCAL_UPLOAD_ROOT = void 0;
exports.ensureUploadDirectories = ensureUploadDirectories;
exports.isAllowedAvatarMimeType = isAllowedAvatarMimeType;
exports.resolveLocalUploadBaseUrl = resolveLocalUploadBaseUrl;
exports.buildAvatarPublicUrl = buildAvatarPublicUrl;
exports.extractAvatarFilenameFromUrl = extractAvatarFilenameFromUrl;
exports.buildAvatarIdentityFilename = buildAvatarIdentityFilename;
exports.getAvatarDiskPath = getAvatarDiskPath;
exports.replaceAvatarFilenameInUrl = replaceAvatarFilenameInUrl;
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = require("multer");
exports.LOCAL_UPLOAD_ROOT = process.env.LOCAL_UPLOAD_DIR ?? (0, path_1.join)(process.cwd(), 'uploads');
exports.AVATAR_UPLOAD_DIR = (0, path_1.join)(exports.LOCAL_UPLOAD_ROOT, 'avatars');
exports.MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_AVATAR_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
]);
function ensureUploadDirectories() {
    for (const dir of [exports.LOCAL_UPLOAD_ROOT, exports.AVATAR_UPLOAD_DIR]) {
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir, { recursive: true });
        }
    }
}
function isAllowedAvatarMimeType(mimeType) {
    return ALLOWED_AVATAR_MIME_TYPES.has((mimeType ?? '').toLowerCase());
}
function normalizedExtension(originalName) {
    const ext = (0, path_1.extname)(originalName ?? '').toLowerCase();
    return /^[.][a-z0-9]+$/.test(ext) ? ext : '';
}
function sanitizeBaseUrl(baseUrl) {
    return (baseUrl ?? '').trim().replace(/\/+$/, '');
}
function normalizeAvatarPathCandidate(value) {
    if (!value) {
        return '';
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        try {
            return new URL(trimmed).pathname;
        }
        catch {
            return '';
        }
    }
    return trimmed.split('?')[0].split('#')[0];
}
function slugifyName(name) {
    const slug = (name ?? '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || 'user';
}
function buildFilename(originalName) {
    return `${Date.now()}-${(0, crypto_1.randomUUID)()}${normalizedExtension(originalName)}`;
}
function resolveLocalUploadBaseUrl(req) {
    const fromEnv = sanitizeBaseUrl(process.env.LOCAL_UPLOAD_BASE_URL ?? process.env.APP_BASE_URL ?? '');
    if (fromEnv) {
        return fromEnv;
    }
    const host = typeof req?.get === 'function' ? req.get('host') : '';
    if (host) {
        const protocol = req?.protocol === 'https' ? 'https' : 'http';
        return `${protocol}://${host}`;
    }
    const port = Number(process.env.PORT ?? 3000);
    return `http://localhost:${port}`;
}
function buildAvatarPublicUrl(filename, baseUrl) {
    const avatarPath = `/uploads/avatars/${filename}`;
    const normalizedBase = sanitizeBaseUrl(baseUrl ?? '');
    return normalizedBase ? `${normalizedBase}${avatarPath}` : avatarPath;
}
function extractAvatarFilenameFromUrl(avatarUrl) {
    const pathname = normalizeAvatarPathCandidate(avatarUrl);
    const prefix = '/uploads/avatars/';
    if (!pathname.startsWith(prefix)) {
        return null;
    }
    const filename = pathname.slice(prefix.length);
    if (!filename || filename.includes('/') || filename.includes('\\')) {
        return null;
    }
    return filename;
}
function buildAvatarIdentityFilename(userId, fullname, currentFilename) {
    return `${userId}-${slugifyName(fullname)}${normalizedExtension(currentFilename)}`;
}
function getAvatarDiskPath(filename) {
    return (0, path_1.join)(exports.AVATAR_UPLOAD_DIR, filename);
}
function replaceAvatarFilenameInUrl(currentAvatarUrl, nextFilename) {
    const nextPath = `/uploads/avatars/${nextFilename}`;
    const trimmed = (currentAvatarUrl ?? '').trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        try {
            const parsed = new URL(trimmed);
            parsed.pathname = nextPath;
            parsed.search = '';
            parsed.hash = '';
            return parsed.toString();
        }
        catch {
            return nextPath;
        }
    }
    return nextPath;
}
exports.avatarDiskStorage = (0, multer_1.diskStorage)({
    destination: exports.AVATAR_UPLOAD_DIR,
    filename: (_req, file, callback) => {
        callback(null, buildFilename(file.originalname));
    },
});
//# sourceMappingURL=local-upload.config.js.map