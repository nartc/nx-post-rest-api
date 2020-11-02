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

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent implements OnInit {
  @Input() comments: CommentDto[];

  constructor() {}

  ngOnInit(): void {}
}
