import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authConfiguration } from '@post-rest/api/config';
import { AuthConfig } from '@post-rest/api/types';
import { ApiUserModule } from '@post-rest/api/user';
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
