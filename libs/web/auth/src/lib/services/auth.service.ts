import { Injectable } from '@angular/core';
import { LoginParamsDto, SecurityController } from '@post-rest-web/api-stub';
import { AuthState, AuthStateService } from '@post-rest-web/global-states';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private $signIn = new Subject<LoginParamsDto>();

  constructor(
    private readonly securityController: SecurityController,
    private readonly authStateService: AuthStateService
  ) {
    this.authStateService.connect(this.signInEffect);
  }

  signInClick(username: string, password: string) {
    this.$signIn.next({ username, password });
  }

  private get signInEffect(): Observable<AuthState> {
    return this.$signIn.pipe(
      take(1),
      mergeMap((dto) => this.securityController.login(dto)),
      map(({ user, token }) => ({ user, token }))
    );
  }
}
