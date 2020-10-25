import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest-api/auth';
import { ApiConfigModule } from '@post-rest-api/config';
import { DbConfig, dbConfiguration } from '@post-rest-api/configurations';
import '@post-rest-api/mappings';
import { ApiUserModule } from '@post-rest-api/user';
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
