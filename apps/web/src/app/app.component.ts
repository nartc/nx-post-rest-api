import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'post-rest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = of({ message: 'welcome to api' });

  constructor(private http: HttpClient) {
  }
}
