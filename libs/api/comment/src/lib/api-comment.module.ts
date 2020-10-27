import { Module } from '@nestjs/common';
import { Comment } from '@post-rest-api/models';
import { ApiPostModule } from '@post-rest-api/post';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypegooseModule.forFeature([Comment]), ApiPostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class ApiCommentModule {}
