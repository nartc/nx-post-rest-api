import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'post-rest-sign-up',
  template: `
    <p>
      sign-up works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
