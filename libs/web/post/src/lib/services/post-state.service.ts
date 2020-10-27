import { Injectable } from '@angular/core';
import { PostDto } from '@post-rest-web/api-stub';
import { ApiResponse } from '@post-rest-web/types';
import { RxState } from '@rx-angular/state';

export interface PostState {
  posts: ApiResponse<PostDto[]>;
}

@Injectable()
export class PostStateService extends RxState<PostState> {
  readonly posts$ = this.select('posts');
}
