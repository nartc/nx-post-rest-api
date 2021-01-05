import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserInformationDto {
  @AutoMap()
  @ApiProperty()
  id: string;
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
