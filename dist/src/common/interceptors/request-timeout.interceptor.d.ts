import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class RequestTimeoutInterceptor implements NestInterceptor {
    private static readonly REQUEST_TIMEOUT_MS;
    intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
