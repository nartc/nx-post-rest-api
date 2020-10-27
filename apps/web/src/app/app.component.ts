import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'post-rest-root',
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private readonly primeNgConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primeNgConfig.ripple = true;
  }
}
