import { ApiProperty } from '@nestjs/swagger';
import { LoginParamsDto } from './login-params.dto';

export class RegisterParamsDto extends LoginParamsDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  location?: string;
  @ApiProperty()
  avatarUrl?: string;
}
