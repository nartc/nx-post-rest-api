import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDto } from '@post-rest-web/api-stub';
import { AuthStateService } from '@post-rest-web/global-states';
import { ApiResponseStatus } from '@post-rest-web/types';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostService } from './post.service';

export interface PostDetailState {
  post: PostDto;
  status: ApiResponseStatus;
  error: string;
}

@Injectable()
export class PostDetailStateService extends RxState<PostDetailState> {
  readonly post$: Observable<PostDto & { liked: boolean }> = this.select(
    'post'
  ).pipe(
    filter((post) => post != null),
    withLatestFrom(this.authStateService.user$),
    map(([post, user]) => ({
      ...post,
      liked: post.likedBy.some((u) => u.id === user.id),
    }))
  );

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
        map((postResponse) => ({
          status: postResponse.status,
          post: postResponse.data,
          error: postResponse.error,
        }))
      )
    );
    this.connect('post', this.postService.comment(), (oldState, value) => {
      oldState.post = {
        ...oldState.post,
        comments: [...oldState.post.comments, value],
        commentsCount: oldState.post.commentsCount + 1,
      };
      return oldState.post;
    });
    this.connect('post', this.postService.toggleLike());
  }
}
