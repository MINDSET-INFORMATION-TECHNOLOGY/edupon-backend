import { Strategy } from 'passport-jwt';
import { Role } from '../../generated/prisma/enums';
import { Request } from 'express';
import { TokenRevocationService } from '../token-revocation.service';
type JwtPayload = {
    sub: number;
    email: string;
    role: Role;
};
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly tokenRevocationService;
    constructor(tokenRevocationService: TokenRevocationService);
    validate(req: Request, payload: JwtPayload): {
        userId: number;
        email: string;
        role: Role;
    };
}
export {};
