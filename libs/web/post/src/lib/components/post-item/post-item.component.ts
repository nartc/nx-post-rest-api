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
    <post-rest-item-header
      [avatarUrl]="post.author.avatarUrl"
      [username]="post.author.username"
      [name]="post.author.name"
      [updatedAt]="post.updatedAt"
    ></post-rest-item-header>
    <p class="p-mb-0">{{ post.text }}</p>
    <hr class="divider p-my-4" />
    <div class="p-d-flex">
      <!--      TODO(chau): this is a hack. for some reason, [class.p-button-outlined] does not work-->
      <button
        *ngIf="post.liked"
        pButton
        pRipple
        type="button"
        icon="pi pi-heart"
        class="p-button-rounded p-button-danger"
        [class.p-button-outlined]="!post.liked"
        [pTooltip]="'Unlike'"
        tooltipPosition="top"
        (click)="likeToggle.emit(post.liked)"
        [label]="post.likedByCount.toString()"
      ></button>
      <button
        *ngIf="!post.liked"
        pButton
        pRipple
        type="button"
        icon="pi pi-heart"
        class="p-button-rounded p-button-outlined p-button-danger"
        [pTooltip]="'Like'"
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
