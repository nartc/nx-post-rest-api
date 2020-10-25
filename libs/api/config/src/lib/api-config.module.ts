import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfiguration,
  authConfiguration,
  dbConfiguration,
} from '@post-rest-api/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [appConfiguration, authConfiguration, dbConfiguration],
    }),
  ],
})
export class ApiConfigModule {}
