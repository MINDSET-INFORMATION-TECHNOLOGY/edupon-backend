"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRevocationService = void 0;
const common_1 = require("@nestjs/common");
let TokenRevocationService = class TokenRevocationService {
    revokedTokens = new Map();
    revokeToken(token, expiresAtMs) {
        const ttl = expiresAtMs && Number.isFinite(expiresAtMs) ? expiresAtMs : Date.now() + 15 * 60 * 1000;
        this.revokedTokens.set(token, ttl);
    }
    isTokenRevoked(token) {
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
};
exports.TokenRevocationService = TokenRevocationService;
exports.TokenRevocationService = TokenRevocationService = __decorate([
    (0, common_1.Injectable)()
], TokenRevocationService);
//# sourceMappingURL=token-revocation.service.js.map