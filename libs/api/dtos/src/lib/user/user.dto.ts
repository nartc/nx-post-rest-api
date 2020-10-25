import { BaseDto } from '@post-rest-api/common';
import { UserRole } from '@post-rest-api/user';
import { AutoMap } from 'nestjsx-automapper';
import { CommentDto } from '../comment/comment.dto';
import { PostDto } from '../post/post.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap()
  role: UserRole;
  @AutoMap()
  name?: string;
  @AutoMap()
  avatarUrl?: string;
  @AutoMap()
  bio?: string;
  @AutoMap()
  location?: string;
  @AutoMap(() => PostDto)
  posts: PostDto[];
  @AutoMap(() => PostDto)
  liked: PostDto[];
  @AutoMap(() => CommentDto)
  comments: CommentDto[];
}
