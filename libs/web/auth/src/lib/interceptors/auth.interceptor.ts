import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStateService } from '@post-rest-web/global-states';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authStateService: AuthStateService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authStateService.token$.pipe(
      switchMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        const cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(cloned);
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
