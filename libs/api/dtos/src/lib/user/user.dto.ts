import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@post-rest-api/common';
import { UserRole } from '@post-rest-api/models';
import { AutoMap } from 'nestjsx-automapper';
import { CommentDto } from '../comment/comment.dto';
import { PostDto } from '../post/post.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;
  @AutoMap()
  @ApiProperty()
  name?: string;
  @AutoMap()
  @ApiProperty()
  avatarUrl?: string;
  @AutoMap()
  @ApiProperty()
  bio?: string;
  @AutoMap()
  @ApiProperty()
  location?: string;
  @AutoMap(() => PostDto)
  @ApiProperty({ type: () => PostDto, isArray: true })
  posts: PostDto[];
  @AutoMap(() => PostDto)
  @ApiProperty({ type: () => PostDto, isArray: true })
  liked: PostDto[];
  @AutoMap(() => CommentDto)
  @ApiProperty({ type: () => CommentDto })
  comments: CommentDto[];
}
