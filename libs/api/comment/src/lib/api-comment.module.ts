import { Module } from '@nestjs/common';
import { ApiPostModule } from '@post-rest-api/post';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommentController } from './comment.controller';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';

@Module({
  imports: [TypegooseModule.forFeature([Comment]), ApiPostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class ApiCommentModule {}
