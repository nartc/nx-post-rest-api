import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@post-rest-api/common';
import { AutoMap } from 'nestjsx-automapper';
import { UserInformationDto } from '../user/user-information.dto';

export class CommentDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  text: string;
  @AutoMap(() => UserInformationDto)
  @ApiProperty({ type: () => UserInformationDto })
  author: UserInformationDto;
  @AutoMap()
  @ApiProperty()
  postId: string;
}
