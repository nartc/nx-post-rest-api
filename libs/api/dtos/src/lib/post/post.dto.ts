import { BaseDto } from '@post-rest/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { CommentDto } from '../comment';
import { UserInformationDto } from '../user';

export class PostDto extends BaseDto {
  @AutoMap()
  text: string;
  @AutoMap(() => UserInformationDto)
  author: UserInformationDto;
  @AutoMap(() => CommentDto)
  comments: CommentDto[];
  @AutoMap()
  commentsCount: number;
  @AutoMap(() => UserInformationDto)
  likedBy: UserInformationDto[];
  @AutoMap()
  likedByCount: number;
}
