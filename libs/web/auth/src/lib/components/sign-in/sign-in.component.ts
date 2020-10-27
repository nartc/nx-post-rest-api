import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'post-rest-sign-in',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="p-grid p-align-center" style="height: 100vh">
        <p-card class="p-col-6 p-offset-3" header="Sign In">
          <div class="p-fluid">
            <div class="p-field">
              <span class="p-input-icon-left">
                <i class="pi pi-user"></i>
                <input
                  type="text"
                  pInputText
                  placeholder="Username"
                  formControlName="username"
                />
              </span>
            </div>
            <div class="p-field">
              <span class="p-input-icon-left">
                <i class="pi pi-lock"></i>
                <input
                  type="password"
                  pInputText
                  placeholder="Password"
                  formControlName="password"
                />
              </span>
            </div>
          </div>
          <button
            pButton
            pRipple
            label="Sign in"
            class="p-mr-2"
            type="submit"
          ></button>
          <button
            pButton
            pRipple
            label="Sign up here"
            class="p-button-secondary"
            routerLink="/sign-up"
          ></button>
        </p-card>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService]
})
export class SignInComponent implements OnInit {
  form = this.fb.group({
    username: [],
    password: [],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signInClick(
      this.form.value.username,
      this.form.value.password
    );
  }
}
