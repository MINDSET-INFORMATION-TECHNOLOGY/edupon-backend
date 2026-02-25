import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError, catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class RequestTimeoutInterceptor implements NestInterceptor {
  private static readonly REQUEST_TIMEOUT_MS = 60_000;

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(RequestTimeoutInterceptor.REQUEST_TIMEOUT_MS),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(
            () => new RequestTimeoutException('Request exceeded 60 seconds and was terminated'),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
