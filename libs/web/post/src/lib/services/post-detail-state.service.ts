import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDto } from '@post-rest-web/api-stub';
import { AuthStateService } from '@post-rest-web/global-states';
import { ApiResponseStatus } from '@post-rest-web/types';
import { RxState } from '@rx-angular/state';
import { filter, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostService } from './post.service';

export interface PostDetailState {
  post: PostDto & { liked?: boolean };
  status: ApiResponseStatus;
  error: string;
}

@Injectable()
export class PostDetailStateService extends RxState<PostDetailState> {
  readonly post$ = this.select('post').pipe(filter((post) => post != null));

  constructor(
    private readonly postService: PostService,
    private readonly authStateService: AuthStateService,
    private readonly route: ActivatedRoute
  ) {
    super();
    this.connect(
      this.route.params.pipe(
        pluck('id'),
        switchMap((id) => this.postService.getPost(id)),
        withLatestFrom(this.authStateService.user$),
        map(([postResponse, user]) => ({
          status: postResponse.status,
          post:
            postResponse.status === 'success'
              ? {
                  ...postResponse.data,
                  liked:
                    postResponse.data?.likedBy.some((u) => u.id === user.id) ??
                    false,
                }
              : postResponse.data,
          error: postResponse.error,
        }))
      )
    );
  }
}
