import { BaseDto } from '@post-rest/api/common';
import { AutoMap } from 'nestjsx-automapper';

export class UserInformationDto extends BaseDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap()
  name?: string;
  @AutoMap()
  avatarUrl?: string;
  @AutoMap()
  bio?: string;
  @AutoMap()
  location?: string;
}
