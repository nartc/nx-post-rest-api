import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TextareaControlComponent } from './textarea-control.component';

@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
  ],
  declarations: [TextareaControlComponent],
  exports: [TextareaControlComponent],
})
export class WebSharedTextareaControlModule {}
