import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'post-rest-layout',
  template: `
    <p-menubar [model]="links"></p-menubar>
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  links: MenuItem[] = [
    { label: 'Sign In', routerLink: '/sign-in' },
    { label: 'Sign Up', routerLink: '/sign-up' },
  ];
}
