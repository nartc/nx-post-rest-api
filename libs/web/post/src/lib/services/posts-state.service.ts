import { Injectable } from '@angular/core';
import { PostDto } from '@post-rest-web/api-stub';
import { AuthStateService } from '@post-rest-web/global-states';
import { ApiResponseStatus } from '@post-rest-web/types';
import { RxState } from '@rx-angular/state';
import { combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { PostService } from './post.service';

export interface PostState {
  posts: PostDto[];
  status: ApiResponseStatus;
  error: string;
}

@Injectable()
export class PostsStateService extends RxState<PostState> {
  readonly posts$: Observable<(PostDto & { liked?: boolean })[]> = this.select(
    'posts'
  ).pipe(
    withLatestFrom(this.authStateService.user$),
    map(([posts, authUser]) =>
      posts.map((post) => {
        if (post.likedBy.some((user) => user.id === authUser.id)) {
          return { ...post, liked: true };
        }
        return post;
      })
    )
  );
  readonly isLoading$ = this.select('status').pipe(map((s) => s === 'loading'));
  readonly error$ = this.select('error');

  readonly vm$ = combineLatest([
    this.posts$,
    this.isLoading$,
    this.error$,
  ]).pipe(map(([posts, isLoading, error]) => ({ posts, isLoading, error })));

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly postService: PostService
  ) {
    super();
    this.connect(
      this.postService.getAllPosts().pipe(
        map((postsResponse) => ({
          status: postsResponse.status,
          posts: postsResponse.data,
          error: postsResponse.error,
        }))
      )
    );
    this.connect('posts', this.postService.like(), (oldState, value) => {
      return oldState.posts.map((post) => {
        if (post.id === value.id) return value;
        return post;
      });
    });
  }
}
