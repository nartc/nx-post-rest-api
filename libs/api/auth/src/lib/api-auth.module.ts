import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { AuthConfig } from '@post-rest-api/configurations';
import { authConfiguration } from '@post-rest-api/configurations';
import { ApiUserModule } from '@post-rest-api/user';
import { AuthService } from './auth.service';
import { PassportGlobalModule } from './modules';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportGlobalModule,
    JwtModule.registerAsync({
      inject: [authConfiguration.KEY],
      useFactory: (authConfig: AuthConfig) => ({
        secret: authConfig.jwtSecret,
        signOptions: {
          expiresIn: authConfig.jwtExpired,
        },
      }),
    }),
    ApiUserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class ApiAuthModule {}
