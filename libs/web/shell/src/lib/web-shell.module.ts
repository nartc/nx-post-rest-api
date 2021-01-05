import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@post-rest-web/auth';
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
                canLoad: [AuthGuard],
                loadChildren: () => import('@post-rest-web/post').then((m) => m.WebPostModule),
            },
        ],
    },
    {
        path: '',
        loadChildren: () => import('@post-rest-web/auth').then((m) => m.WebAuthModule),
    },
], { relativeLinkResolution: 'legacy' }),
    MenubarModule,
  ],
  declarations: [LayoutComponent],
  exports: [RouterModule],
})
export class WebShellModule {}
