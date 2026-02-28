export declare class TokenRevocationService {
    private readonly revokedTokens;
    revokeToken(token: string, expiresAtMs?: number): void;
    isTokenRevoked(token: string): boolean;
}
