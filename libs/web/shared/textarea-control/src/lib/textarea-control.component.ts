import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'post-rest-textarea-control',
  template: `
    <div class="p-d-flex">
      <div class="p-field">
        <span class="p-float-label">
          <textarea
            pInputTextarea
            id="input"
            [autoResize]="true"
            [formControl]="control"
          ></textarea>
          <label for="input">Say something...</label>
        </span>
      </div>
      <button
        pButton
        pRipple
        label="Submit"
        class="p-ml-2"
        (click)="onSubmit()"
      ></button>
    </div>
  `,
  styles: [
    `
      div.p-field {
        flex-grow: 1;
      }

      textarea {
        width: 100%;
      }

      textarea::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
      }

      button {
        align-self: flex-start;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaControlComponent {
  control = new FormControl('');

  @Output() submitClick = new EventEmitter<string>();

  onSubmit() {
    if (!this.control.value) {
      return;
    }

    this.submitClick.emit(this.control.value);
    this.control.reset();
  }
}
