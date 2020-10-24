import { BaseDto } from '@post-rest/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { UserInformationDto } from '../user/user-information.dto';

export class CommentDto extends BaseDto {
  @AutoMap()
  text: string;
  @AutoMap(() => UserInformationDto)
  author: UserInformationDto;
  @AutoMap()
  postId: string;
}
