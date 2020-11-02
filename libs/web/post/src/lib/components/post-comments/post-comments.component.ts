import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommentDto } from '@post-rest-web/api-stub';

@Component({
  selector: 'post-rest-post-comments',
  template: `
    <p-card *ngFor="let comment of comments" styleClass="p-mb-2">
      <post-rest-item-header
        [avatarUrl]="comment.author.avatarUrl"
        [username]="comment.author.username"
        [name]="comment.author.name"
        [updatedAt]="comment.updatedAt"
      ></post-rest-item-header>
      <p>{{ comment.text }}</p>
    </p-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-mb-4 p-d-block'
  }
})
export class PostCommentsComponent implements OnInit {
  @Input() comments: CommentDto[];

  constructor() {}

  ngOnInit(): void {}
}
