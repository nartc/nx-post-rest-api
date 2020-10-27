import { BaseDto } from '@post-rest-api/common';
import { UserRole } from '@post-rest-api/models';
import { AutoMap } from 'nestjsx-automapper';

export class AuthUserDto extends BaseDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap()
  role: UserRole;
}
