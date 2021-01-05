import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest-api/auth';
import { ApiCommentModule } from '@post-rest-api/comment';
import { ApiConfigModule } from '@post-rest-api/config';
import { DbConfig, dbConfiguration } from '@post-rest-api/configurations';
import {
  CommentProfile,
  PostProfile,
  UserProfile,
} from '@post-rest-api/mappings';
import { ApiPostModule } from '@post-rest-api/post';
import { ApiSecurityModule } from '@post-rest-api/security';
import { ApiUserModule } from '@post-rest-api/user';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [
        {
          name: '',
          pluginInitializer: classes,
          namingConventions: new CamelCaseNamingConvention(),
        },
      ],
      singular: true,
    }),
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
  providers: [UserProfile, CommentProfile, PostProfile],
})
export class AppModule {}
