import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostStateService } from '../../services/post-state.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post-rest-post-container',
  template: `
    <ng-container *rxLet="posts$; let postsResponse; suspense: suspense">
      <p-progressSpinner
        *ngIf="postsResponse.status === 'loading'"
      ></p-progressSpinner>
      <p-messages *ngIf="postsResponse.status === 'failure'" severity="error">
        <ng-template pTemplate>
          {{ postsResponse.error }}
        </ng-template>
      </p-messages>
      <post-rest-posts
        *ngIf="postsResponse.status === 'success'"
        [posts]="postsResponse.data"
      ></post-rest-posts>
    </ng-container>
    <ng-template #suspense>
      Initializing...
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        padding: 1rem;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostStateService, PostService],
})
export class PostContainerComponent implements OnInit {
  posts$ = this.postStateService.posts$;

  constructor(
    private readonly postStateService: PostStateService,
    readonly postService: PostService
  ) {}

  ngOnInit(): void {}
}
