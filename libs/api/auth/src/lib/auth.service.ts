import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectAuthConfig } from '@post-rest-api/config';
import type { AuthConfig } from '@post-rest-api/configurations';
import {
  AuthUserDto,
  TokenResultDto,
  UserInformationDto,
} from '@post-rest-api/dtos';
import { User } from '@post-rest-api/models';
import { UserService } from '@post-rest-api/user';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectAuthConfig() private readonly authConfig: AuthConfig,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async createToken(user: User): Promise<TokenResultDto> {
    const tokenResult = new TokenResultDto();
    tokenResult.token = await this.jwtService.signAsync({
      email: user.email,
      username: user.username,
      role: user.role,
    });
    tokenResult.computeExpiry(this.authConfig.jwtExpired);
    tokenResult.user = this.mapper.map(user, UserInformationDto, User);
    return tokenResult;
  }

  async verify<
    TPayload extends Record<string, unknown> = Record<string, unknown>
  >(token: string): Promise<TPayload> {
    try {
      return await this.jwtService.verifyAsync<TPayload>(token);
    } catch (e) {
      throw new InternalServerErrorException(token, 'Error verifying token');
    }
  }

  async validateUser({ username }: JwtPayload): Promise<AuthUserDto> {
    const user = await this.userService.findByUsername(username);
    return this.mapper.map(user, AuthUserDto, User);
  }
}
