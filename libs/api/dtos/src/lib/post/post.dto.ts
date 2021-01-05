import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@post-rest-api/common';
import { CommentDto } from '../comment/comment.dto';
import { UserInformationDto } from '../user/user-information.dto';

export class PostDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  text: string;
  @AutoMap(() => UserInformationDto)
  @ApiProperty({ type: () => UserInformationDto })
  author: UserInformationDto;
  @AutoMap(() => CommentDto)
  @ApiProperty({ type: () => CommentDto, isArray: true })
  comments: CommentDto[];
  @AutoMap()
  @ApiProperty()
  commentsCount: number;
  @AutoMap(() => UserInformationDto)
  @ApiProperty({ type: () => UserInformationDto, isArray: true })
  likedBy: UserInformationDto[];
  @AutoMap()
  @ApiProperty()
  likedByCount: number;
}
