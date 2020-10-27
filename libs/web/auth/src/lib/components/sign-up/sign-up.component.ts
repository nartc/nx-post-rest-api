import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'post-rest-sign-up',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="p-grid p-align-center" style="height: 100vh">
        <p-card class="p-col-6 p-offset-3" header="Sign Up">
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
                <i class="pi pi-envelope"></i>
                <input
                  type="email"
                  pInputText
                  placeholder="Email"
                  formControlName="email"
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
            <div class="p-field">
              <span class="p-input-icon-left">
                <i class="pi pi-ellipsis-h"></i>
                <input
                  type="text"
                  pInputText
                  placeholder="Name"
                  formControlName="name"
                />
              </span>
            </div>
            <div class="p-field">
              <span class="p-input-icon-left">
                <i class="pi pi-ellipsis-h"></i>
                <input
                  type="text"
                  pInputText
                  placeholder="Location"
                  formControlName="location"
                />
              </span>
            </div>
            <div class="p-field">
              <span class="p-input-icon-left">
                <i class="pi pi-ellipsis-h"></i>
                <input
                  type="text"
                  pInputText
                  placeholder="Avatar"
                  formControlName="avatarUrl"
                />
              </span>
            </div>
          </div>
          <button
            pButton
            pRipple
            label="Sign up"
            class="p-mr-2"
            type="submit"
          ></button>
          <button
            pButton
            pRipple
            label="Sign in here"
            class="p-button-secondary"
            routerLink="/sign-in"
          ></button>
        </p-card>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: [],
    email: [],
    password: [],
    name: [],
    location: [],
    avatarUrl: [],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signUpClick(this.form.value);
  }
}
