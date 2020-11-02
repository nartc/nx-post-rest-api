import { Injectable } from '@angular/core';
import {
  CommentController,
  CommentDto,
  CreateCommentParamsDto,
  CreatePostParamsDto,
  PostController,
  PostDto,
} from '@post-rest-web/api-stub';
import { ApiResponse } from '@post-rest-web/types';
import { RxUtil } from '@post-rest-web/utilities';
import { iif, Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interface LikePost {
  postId: string;
  isLikedCurrent: boolean;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly $liked = new Subject<LikePost>();
  private readonly $postComment = new Subject<CreateCommentParamsDto>();
  private readonly $createPost = new Subject<CreatePostParamsDto>();

  constructor(
    private readonly postController: PostController,
    private readonly commentController: CommentController
  ) {}

  likedClick(likePost: LikePost) {
    this.$liked.next(likePost);
  }

  commentPost(dto: CreateCommentParamsDto) {
    this.$postComment.next(dto);
  }

  postCreate(dto: CreatePostParamsDto) {
    this.$createPost.next(dto);
  }

  getAllPosts(): Observable<ApiResponse<PostDto[]>> {
    return this.postController.get().pipe(
      // delay(2000),
      RxUtil.toApiResponse([])
    );
  }

  getPost(id: string): Observable<ApiResponse<PostDto>> {
    return this.postController.getPost(id).pipe(RxUtil.toApiResponse(null));
  }

  createPost(): Observable<PostDto> {
    return this.$createPost.pipe(
      mergeMap((dto) => this.postController.create(dto))
    );
  }

  toggleLike(): Observable<PostDto> {
    return this.$liked.pipe(
      mergeMap(({ postId, isLikedCurrent }) =>
        iif(
          () => isLikedCurrent,
          this.postController.unlike(postId),
          this.postController.like(postId)
        )
      )
    );
  }

  comment(): Observable<CommentDto> {
    return this.$postComment.pipe(
      mergeMap((dto) => this.commentController.create(dto))
    );
  }
}
