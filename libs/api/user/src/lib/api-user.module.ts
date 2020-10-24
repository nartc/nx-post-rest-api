import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class ApiUserModule {}
