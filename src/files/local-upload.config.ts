import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

export const LOCAL_UPLOAD_ROOT = process.env.LOCAL_UPLOAD_DIR ?? join(process.cwd(), 'public');
export const LOCAL_UPLOAD_BASE_URL =
  process.env.LOCAL_UPLOAD_BASE_URL ?? process.env.APP_BASE_URL ?? 'http://localhost:3000';
export const AVATAR_UPLOAD_DIR = LOCAL_UPLOAD_ROOT;
export const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
const AVATAR_PUBLIC_PREFIX = '/public/';

const ALLOWED_AVATAR_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export function ensureUploadDirectories(): void {
  for (const dir of [LOCAL_UPLOAD_ROOT, AVATAR_UPLOAD_DIR]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }
}

export function isAllowedAvatarMimeType(mimeType: string): boolean {
  return ALLOWED_AVATAR_MIME_TYPES.has((mimeType ?? '').toLowerCase());
}

function normalizedExtension(originalName: string): string {
  const ext = extname(originalName ?? '').toLowerCase();
  return /^[.][a-z0-9]+$/.test(ext) ? ext : '';
}

function sanitizeBaseUrl(baseUrl: string): string {
  return (baseUrl ?? '').trim().replace(/\/+$/, '');
}

function normalizeAvatarPathCandidate(value: string): string {
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
    } catch {
      return '';
    }
  }

  return trimmed.split('?')[0].split('#')[0];
}

function slugifyName(name: string): string {
  const slug = (name ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'user';
}

function buildFilename(originalName: string): string {
  return `${Date.now()}-${randomUUID()}${normalizedExtension(originalName)}`;
}

export function resolveLocalUploadBaseUrl(req?: { protocol?: string; get?: (name: string) => string }): string {
  const configured = sanitizeBaseUrl(LOCAL_UPLOAD_BASE_URL);
  if (configured) {
    return configured;
  }

  const host = typeof req?.get === 'function' ? req.get('host') : '';
  const protocol = req?.protocol === 'https' ? 'https' : 'http';
  return host ? `${protocol}://${host}` : 'http://localhost:3000';
}

export function buildAvatarPublicUrl(filename: string, baseUrl?: string): string {
  const avatarPath = `${AVATAR_PUBLIC_PREFIX}${filename}`;
  const normalizedBase = sanitizeBaseUrl(baseUrl ?? '');
  return normalizedBase ? `${normalizedBase}${avatarPath}` : avatarPath;
}

export function extractAvatarFilenameFromUrl(avatarUrl: string): string | null {
  const pathname = normalizeAvatarPathCandidate(avatarUrl);
  const prefixes = [AVATAR_PUBLIC_PREFIX, '/uploads/'];
  const prefix = prefixes.find((value) => pathname.startsWith(value));
  if (!prefix) {
    return null;
  }

  const filename = pathname.slice(prefix.length);
  if (!filename || filename.includes('/') || filename.includes('\\')) {
    return null;
  }

  return filename;
}

export function buildAvatarIdentityFilename(userId: number, fullname: string, currentFilename: string): string {
  return `${userId}-${slugifyName(fullname)}${normalizedExtension(currentFilename)}`;
}

export function getAvatarDiskPath(filename: string): string {
  return join(AVATAR_UPLOAD_DIR, filename);
}

export function replaceAvatarFilenameInUrl(currentAvatarUrl: string, nextFilename: string): string {
  const nextPath = `${AVATAR_PUBLIC_PREFIX}${nextFilename}`;
  const trimmed = (currentAvatarUrl ?? '').trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      parsed.pathname = nextPath;
      parsed.search = '';
      parsed.hash = '';
      return parsed.toString();
    } catch {
      return nextPath;
    }
  }

  return nextPath;
}

export const avatarDiskStorage = diskStorage({
  destination: AVATAR_UPLOAD_DIR,
  filename: (_req, file, callback) => {
    callback(null, buildFilename(file.originalname));
  },
});
