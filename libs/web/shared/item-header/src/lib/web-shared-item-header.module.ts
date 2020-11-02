import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemHeaderComponent } from './item-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ItemHeaderComponent],
  exports: [ItemHeaderComponent],
})
export class WebSharedItemHeaderModule {}
