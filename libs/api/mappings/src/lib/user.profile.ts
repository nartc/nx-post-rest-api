import { AuthUserDto, UserDto, UserInformationDto } from '@post-rest/api/dtos';
import { User } from '@post-rest/api/user';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserDto);
    mapper.createMap(User, UserInformationDto);
    mapper.createMap(User, AuthUserDto);
  }
}
