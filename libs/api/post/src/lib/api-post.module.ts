import { Module } from '@nestjs/common';
import { Post } from '@post-rest-api/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypegooseModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class ApiPostModule {}
