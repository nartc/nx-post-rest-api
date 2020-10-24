import { ConfigType } from '@nestjs/config';
import {
  appConfiguration,
  authConfiguration,
  dbConfiguration,
} from '@post-rest/api/config';

export type TODO = any;

export type AppConfig = ConfigType<typeof appConfiguration>;
export type AuthConfig = ConfigType<typeof authConfiguration>;
export type DbConfig = ConfigType<typeof dbConfiguration>;
