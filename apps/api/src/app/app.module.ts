import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest/api/auth';
import { ApiConfigModule } from '@post-rest/api/config';
import '@post-rest/api/mappings';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [AutomapperModule.withMapper(), ApiConfigModule, ApiAuthModule],
})
export class AppModule {}
