import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostDetailStateService } from '../../services/post-detail-state.service';

@Component({
  selector: 'post-rest-post-detail',
  template: `
    <div class="post-detail p-grid">
      <div class="p-col-8 p-offset-2">
        <ng-container *rxLet="post$; let post">
          <post-rest-post-item [post]="post"></post-rest-post-item>
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
  post$ = this.postDetailStateService.post$;

  constructor(
    private readonly postDetailStateService: PostDetailStateService
  ) {}
}
