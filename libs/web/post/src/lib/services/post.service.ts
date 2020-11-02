import { Injectable } from '@angular/core';
import { PostController, PostDto } from '@post-rest-web/api-stub';
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

  constructor(private readonly postController: PostController) {}

  likedClick(likePost: LikePost) {
    this.$liked.next(likePost);
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

  like() {
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
}
