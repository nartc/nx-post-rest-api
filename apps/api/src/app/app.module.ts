import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest-api/auth';
import { ApiCommentModule } from '@post-rest-api/comment';
import { ApiConfigModule } from '@post-rest-api/config';
import { DbConfig, dbConfiguration } from '@post-rest-api/configurations';
import '@post-rest-api/mappings';
import { ApiPostModule } from '@post-rest-api/post';
import { ApiSecurityModule } from '@post-rest-api/security';
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
    ApiSecurityModule,
    ApiCommentModule,
    ApiPostModule,
  ],
})
export class AppModule {}
