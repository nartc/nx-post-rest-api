import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { AuthStateService } from '@post-rest-web/global-states';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.isAuth$();
  }

  canLoad(): Observable<boolean> {
    return this.isAuth$();
  }

  canActivateChild(): Observable<boolean> {
    return this.isAuth$();
  }

  private isAuth$(): Observable<boolean> {
    return this.authStateService.isAuth$.pipe(
      take(1),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
