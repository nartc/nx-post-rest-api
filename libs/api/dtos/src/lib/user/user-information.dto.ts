import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@post-rest-api/common';
import { AutoMap } from 'nestjsx-automapper';

export class UserInformationDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @ApiProperty()
  email: string;
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
}
