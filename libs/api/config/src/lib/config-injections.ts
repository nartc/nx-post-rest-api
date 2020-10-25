import { Inject } from '@nestjs/common';
import {
  appConfiguration,
  authConfiguration,
  dbConfiguration,
} from '@post-rest-api/configurations';

export const InjectAppConfig = () => Inject(appConfiguration.KEY);
export const InjectAuthConfig = () => Inject(authConfiguration.KEY);
export const InjectDbConfig = () => Inject(dbConfiguration.KEY);
