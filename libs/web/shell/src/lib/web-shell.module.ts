import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: LayoutComponent },
      {
        path: '',
        loadChildren: () =>
          import('@post-rest-web/auth').then((m) => m.WebAuthModule),
      },
    ]),
    MenubarModule,
  ],
  declarations: [LayoutComponent],
  exports: [RouterModule],
})
export class WebShellModule {}
