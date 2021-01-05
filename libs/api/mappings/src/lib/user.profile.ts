import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { AuthUserDto, UserDto, UserInformationDto } from '@post-rest-api/dtos';
import { User } from '@post-rest-api/models';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(User, UserDto);
      mapper.createMap(User, UserInformationDto);
      mapper.createMap(User, AuthUserDto);
    };
  }
}
