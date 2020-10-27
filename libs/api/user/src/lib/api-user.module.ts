import { Module } from '@nestjs/common';
import { User } from '@post-rest-api/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class ApiUserModule {}
