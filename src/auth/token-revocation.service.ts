import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRevocationService {
  private readonly revokedTokens = new Map<string, number>();

  revokeToken(token: string, expiresAtMs?: number): void {
    const ttl =
      expiresAtMs && Number.isFinite(expiresAtMs)
        ? expiresAtMs
        : Date.now() + 15 * 60 * 1000;
    this.revokedTokens.set(token, ttl);
  }

  isTokenRevoked(token: string): boolean {
    const expiresAtMs = this.revokedTokens.get(token);
    if (!expiresAtMs) {
      return false;
    }

    if (Date.now() > expiresAtMs) {
      this.revokedTokens.delete(token);
      return false;
    }

    return true;
  }
}
