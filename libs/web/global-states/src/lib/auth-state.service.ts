import { Injectable } from '@angular/core';
import { UserInformationDto } from '@post-rest-web/api-stub';
import { RxState } from '@rx-angular/state';
import { map, tap } from 'rxjs/operators';

export interface AuthState {
  token: string;
  user: UserInformationDto;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService extends RxState<AuthState> {
  readonly user$ = this.select('user');
  readonly token$ = this.select('token');
  readonly isAuth$ = this.token$.pipe(map((token) => !!token));

  constructor() {
    super();
    this.hold(this.storeLocalEffect);

    const token = localStorage.getItem('token') || '';
    if (token) {
      this.set({
        token,
        user: JSON.parse(localStorage.getItem('user')),
      });
    }
  }

  private get storeLocalEffect() {
    return this.select().pipe(
      tap(({ token, user }) => {
        if (!token) {
          localStorage.clear();
        } else {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }
}
