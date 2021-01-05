import { AutoMap } from '@automapper/classes';
import { BaseDto } from '@post-rest-api/common';
import { UserRole } from '@post-rest-api/models';

export class AuthUserDto extends BaseDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap(() => String)
  role: UserRole;
}
