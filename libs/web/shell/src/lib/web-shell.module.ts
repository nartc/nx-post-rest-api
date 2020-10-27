import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'posts', pathMatch: 'full' },
          {
            path: 'posts',
            loadChildren: () =>
              import('@post-rest-web/post').then((m) => m.WebPostModule),
          },
        ],
      },
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
