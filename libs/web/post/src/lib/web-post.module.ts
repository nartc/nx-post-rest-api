import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template';
import { SharedModule } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PostsComponent } from './components/posts/posts.component';
import { PostContainerComponent } from './containers/post-container/post-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostContainerComponent }]),
    LetModule,
    ProgressSpinnerModule,
    MessagesModule,
    SharedModule,
  ],
  declarations: [PostsComponent, PostContainerComponent],
})
export class WebPostModule {}
