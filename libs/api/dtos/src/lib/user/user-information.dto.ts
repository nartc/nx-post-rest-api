import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

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
