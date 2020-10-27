import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PostDto } from '@post-rest-web/api-stub';

@Component({
  selector: 'post-rest-posts',
  template: `
    <ul>
      <li *ngFor="let post of posts">
        {{ post.text }}
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  @Input() posts: PostDto[];

  constructor() {}

  ngOnInit(): void {}
}
