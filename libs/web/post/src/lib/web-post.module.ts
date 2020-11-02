import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@post-rest-web/auth';
import { LetModule } from '@rx-angular/template';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostDetailComponent } from './containers/post-detail/post-detail.component';
import { PostsComponent } from './containers/posts/posts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: PostsComponent },
          {
            path: ':id',
            component: PostDetailComponent,
          },
        ],
      },
    ]),
    LetModule,
    ProgressSpinnerModule,
    MessagesModule,
    SharedModule,
    DataViewModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
    CardModule,
  ],
  declarations: [
    PostsComponent,
    PostItemComponent,
    PostDetailComponent,
    PostCommentsComponent,
  ],
})
export class WebPostModule {}
