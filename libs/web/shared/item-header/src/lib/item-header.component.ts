import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'post-rest-item-header',
  template: `
    <div class="p-d-flex">
      <img class="avatar" [src]="avatarUrl" alt="Avatar" />
      <div class="p-d-flex p-flex-column p-ml-4">
        <h2 class="p-mb-0">{{ username }}</h2>
        <h4 class="author-name p-my-0">({{ name }})</h4>
      </div>
      <small class="p-ml-auto">{{ updatedAt | date: 'short' }}</small>
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemHeaderComponent {
  @Input() avatarUrl: string;
  @Input() username: string;
  @Input() name: string;
  @Input() updatedAt: Date;
}
