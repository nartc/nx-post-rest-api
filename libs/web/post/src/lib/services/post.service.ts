import { Injectable } from '@angular/core';
import { PostController, PostDto } from '@post-rest-web/api-stub';
import { ApiResponse } from '@post-rest-web/types';
import { RxUtil } from '@post-rest-web/utilities';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PostStateService } from './post-state.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postController: PostController,
    private readonly postStateService: PostStateService
  ) {
    this.postStateService.connect('posts', this.getAllPosts());
  }

  private getAllPosts(): Observable<ApiResponse<PostDto[]>> {
    return this.postController
      .get()
      .pipe(delay(2000), RxUtil.toApiResponse([]));
  }
}
