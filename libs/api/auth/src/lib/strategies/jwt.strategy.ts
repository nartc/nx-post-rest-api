import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectAuthConfig } from '@post-rest/api/config';
import { AuthConfig } from '@post-rest/api/types';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    @InjectAuthConfig() readonly authConfig: AuthConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<void> {
    const user = await this.authService.validateUser(payload);
    if (user == null) {
      return done(new UnauthorizedException(), null);
    }

    return done(null, user);
  }
}
