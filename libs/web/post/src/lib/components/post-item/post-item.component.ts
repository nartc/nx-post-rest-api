import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PostDto } from '@post-rest-web/api-stub';

@Component({
  selector: 'post-rest-post-item',
  template: `
    <div class="p-d-flex">
      <img class="avatar" [src]="post.author.avatarUrl" alt="Author avatar" />
      <div class="p-d-flex p-flex-column p-ml-4">
        <h2 class="p-mb-0">{{ post.author.username }}</h2>
        <h4 class="author-name p-my-0">({{ post.author.name }})</h4>
      </div>
      <small class="p-ml-auto">{{ post.updatedAt | date: 'short' }}</small>
    </div>
    <p class="p-mb-0">{{ post.text }}</p>
    <hr class="divider p-my-4" />
    <div class="p-d-flex">
      <button
        pButton
        pRipple
        type="button"
        icon="pi pi-heart"
        class="p-button-rounded p-button-danger"
        [class.p-button-outlined]="!post.liked"
        [pTooltip]="post.liked ? 'Unlike' : 'Like'"
        tooltipPosition="top"
        (click)="likeToggle.emit(post.liked)"
        [label]="post.likedByCount.toString()"
      ></button>
      <button
        pButton
        pRipple
        type="button"
        icon="pi pi-comment"
        class="p-button-rounded p-button-info p-ml-2"
        pTooltip="Comments"
        tooltipPosition="top"
        (click)="commentClick.emit()"
        [label]="post.commentsCount.toString()"
      ></button>
    </div>
  `,
  styles: [
    `
      .avatar {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        object-fit: cover;
      }

      .author-name {
        font-weight: lighter;
      }

      .divider {
        font-weight: lighter;
        opacity: 0.5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-col-12 p-shadow-4 p-p-4 p-mb-4 p-component p-d-block',
  },
})
export class PostItemComponent {
  @Input() post: PostDto & { liked?: boolean };
  @Output() commentClick = new EventEmitter();
  @Output() likeToggle = new EventEmitter<boolean>();
}
