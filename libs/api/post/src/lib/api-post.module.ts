import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostController } from './post.controller';
import { Post } from './post.model';
import { PostService } from './post.service';

@Module({
  imports: [TypegooseModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class ApiPostModule {}
