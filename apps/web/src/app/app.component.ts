import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { of } from 'rxjs';

@Component({
  selector: 'post-rest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hello$ = of({ message: 'welcome to api' });

  constructor(private readonly primeNgConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primeNgConfig.ripple = true;
  }
}
