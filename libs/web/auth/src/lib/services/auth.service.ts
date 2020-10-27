import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoginParamsDto,
  RegisterParamsDto,
  SecurityController,
} from '@post-rest-web/api-stub';
import { AuthState, AuthStateService } from '@post-rest-web/global-states';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private $signIn = new Subject<LoginParamsDto>();
  private $signUp = new Subject<RegisterParamsDto>();

  constructor(
    private readonly securityController: SecurityController,
    private readonly authStateService: AuthStateService,
    private readonly router: Router
  ) {
    this.authStateService.connect(this.signInEffect);
    this.authStateService.hold(this.signUpEffect);
  }

  signInClick(username: string, password: string) {
    this.$signIn.next({ username, password });
  }

  signUpClick(dto: RegisterParamsDto) {
    this.$signUp.next(dto);
  }

  private get signInEffect(): Observable<AuthState> {
    return this.$signIn.pipe(
      take(1),
      mergeMap((dto) => this.securityController.login(dto)),
      map(({ user, token }) => ({ user, token }))
    );
  }

  private get signUpEffect() {
    return this.$signUp.pipe(
      take(1),
      mergeMap((dto) => this.securityController.register(dto)),
      tap(() => this.router.navigate(['/sign-in']))
    );
  }
}
