import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_BASE_URL } from '@post-rest-web/api-stub';
import { authInterceptorProvider } from '@post-rest-web/auth';
import { WebShellModule } from '@post-rest-web/shell';
import { RippleModule } from 'primeng/ripple';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RippleModule,
    WebShellModule,
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    authInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
