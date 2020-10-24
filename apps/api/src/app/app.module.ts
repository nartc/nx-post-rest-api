import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest/api/auth';
import { ApiConfigModule, dbConfiguration } from '@post-rest/api/config';
import '@post-rest/api/mappings';
import { DbConfig } from '@post-rest/api/types';
import { ApiUserModule } from '@post-rest/api/user';
import { TypegooseModule } from 'nestjs-typegoose';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [
    AutomapperModule.withMapper(),
    ApiConfigModule,
    TypegooseModule.forRootAsync({
      inject: [dbConfiguration.KEY],
      useFactory: (dbConfig: DbConfig) => dbConfig,
    }),
    ApiAuthModule,
    ApiUserModule,
  ],
})
export class AppModule {}
