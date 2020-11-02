import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxUtil } from '@post-rest-web/utilities';
import { PostDetailStateService } from '../../services/post-detail-state.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post-rest-post-detail',
  template: `
    <div class="post-detail p-grid">
      <div class="p-col-8 p-offset-2">
        <ng-container *rxLet="post$; let post">
          <post-rest-post-item
            [post]="post"
            (likeToggle)="onLikeToggled($event, post.id)"
          ></post-rest-post-item>
          <post-rest-post-comments
            [comments]="post.comments"
          ></post-rest-post-comments>
          <post-rest-textarea-control
            (submitClick)="onSubmitClicked($event, post.id)"
          ></post-rest-textarea-control>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        padding: 1rem;
        justify-content: center;
      }

      .post-detail {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostDetailStateService],
})
export class PostDetailComponent {
  post$ = this.postDetailStateService.post$.pipe(RxUtil.log('post detail'));

  constructor(
    private readonly postService: PostService,
    private readonly postDetailStateService: PostDetailStateService
  ) {}

  onSubmitClicked(text: string, postId: string) {
    this.postService.commentPost({ text, postId });
  }

  onLikeToggled(isLikedCurrent: boolean, postId: string) {
    this.postService.likedClick({ isLikedCurrent, postId });
  }
}
