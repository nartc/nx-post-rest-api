import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { API_BASE_URL } from '@post-rest-web/api-stub';
import { WebShellModule } from '@post-rest-web/shell';
import { RippleModule } from 'primeng/ripple';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RippleModule, WebShellModule],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
