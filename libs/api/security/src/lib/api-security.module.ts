import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@post-rest-api/auth';
import { ApiUserModule } from '@post-rest-api/user';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [ApiAuthModule, ApiUserModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class ApiSecurityModule {}
