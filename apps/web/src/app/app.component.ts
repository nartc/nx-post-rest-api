import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '@post-rest-web/global-states';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'post-rest-root',
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly primeNgConfig: PrimeNGConfig,
    private readonly authStateService: AuthStateService
  ) {}

  ngOnInit() {
    this.primeNgConfig.ripple = true;
    this.authStateService.user$.subscribe(console.log);
  }
}
