import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '@post-rest-api/auth';
import { InjectAuthConfig } from '@post-rest-api/config';
import type { AuthConfig } from '@post-rest-api/configurations';
import {
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultDto,
} from '@post-rest-api/dtos';
import { UserService } from '@post-rest-api/user';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectAuthConfig() private readonly authConfig: AuthConfig
  ) {}

  async register(dto: RegisterParamsDto): Promise<void> {
    const newUser = this.userService.createModel(dto);
    const salt = await genSalt(this.authConfig.salt);
    newUser.password = await hash(dto.password, salt);
    await this.userService.create(newUser);
  }

  async login({ username, password }: LoginParamsDto): Promise<TokenResultDto> {
    const user = await this.userService.findByUsername(username);

    if (user == null) {
      throw new BadRequestException(username, 'Wrong credentials');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestException(password, 'Wrong credentials');
    }

    return await this.authService.createToken(user);
  }
}
