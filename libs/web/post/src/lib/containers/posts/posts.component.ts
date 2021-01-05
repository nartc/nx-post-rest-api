import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostsStateService } from '../../services/posts-state.service';

@Component({
  selector: 'post-rest-post-container',
  template: `
    <ng-container *rxLet="vm$; let vm; rxSuspense: suspense">
      <p-progressSpinner *ngIf="vm.isLoading"></p-progressSpinner>
      <p-messages *ngIf="vm.error" severity="error">
        <ng-template pTemplate>
          {{ vm.error }}
        </ng-template>
      </p-messages>
      <div *ngIf="vm.posts.length" class="post-list p-grid">
        <div class="p-col-8 p-offset-2">
      <post-rest-textarea-control
        (submitClick)="onSubmitClicked($event)"
      ></post-rest-textarea-control>
          <p-dataView [value]="vm.posts" layout="list">
            <ng-template pTemplate="listItem" let-post let-index="rowIndex">
              <post-rest-post-item
                [post]="post"
                (likeToggle)="onLikeToggled($event, post.id)"
                (commentClick)="onCommentClicked(post.id)"
              ></post-rest-post-item>
            </ng-template>
          </p-dataView>
        </div>
      </div>
    </ng-container>
    <ng-template #suspense> Initializing...</ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        padding: 1rem;
        justify-content: center;
      }

      .post-list {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostsStateService],
})
export class PostsComponent implements OnInit {
  vm$ = this.postStateService.vm$;

  constructor(
    private readonly postStateService: PostsStateService,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  onLikeToggled(isLikedCurrent: boolean, postId: string) {
    this.postService.likedClick({ postId, isLikedCurrent });
  }

  onCommentClicked(postId: string) {
    this.ngZone.run(() => {
      // TODO(chau): monitor this https://github.com/rx-angular/rx-angular/issues/412
      this.router.navigate(['/posts', postId]);
    });
  }

  onSubmitClicked(text: string) {
    this.postService.postCreate({ text });
  }
}
