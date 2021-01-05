import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ModelType } from '@post-rest-api/common';
import { BaseService } from '@post-rest-api/common';
import { CommentDto, CreateCommentParamsDto } from '@post-rest-api/dtos';
import { Comment, Post, User } from '@post-rest-api/models';
import { PostService } from '@post-rest-api/post';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectModel(Comment) private readonly commentModel: ModelType<Comment>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly postService: PostService
  ) {
    super(commentModel);
  }

  async getCommentsForPost(postId: string): Promise<CommentDto[]> {
    const comments: Comment[] = await this.findAll()
      .where('post')
      .equals(Types.ObjectId(postId))
      .sort({ createdAt: 1 })
      .limit(100)
      .exec();

    return this.mapper.mapArray(comments, CommentDto, Comment);
  }

  async getComment(id: string) {
    const comment: Comment = await this.findById(id).exec();
    return this.mapper.map(comment, CommentDto, Comment);
  }

  async createComment(
    userId: string,
    { postId, text }: CreateCommentParamsDto
  ): Promise<CommentDto> {
    const post = await this.postService.findById(postId).exec();

    if (post == null) {
      throw new NotFoundException(postId, 'No post found');
    }

    const newComment = this.createModel({ text });
    newComment.post = Types.ObjectId(post.id);
    newComment.author = Types.ObjectId(userId);
    const created: Comment = (await this.create(newComment)).toObject({
      virtuals: true,
    });

    await this.postService
      .updateBy(post.id, {
        $push: { comments: Types.ObjectId(created.id) },
      })
      .exec();
    return this.mapper.map(created, CommentDto, Comment);
  }

  async deleteComment(userId: string, id: string) {
    const comment: Comment = await this.findById(id).exec();
    const commentAuthor = comment.author as User;
    const postAuthor = (comment.post as Post).author as User;
    if (commentAuthor.id !== userId && postAuthor.id !== userId) {
      throw new ForbiddenException(userId, 'Cannot delete comment');
    }

    await this.deleteById(id).exec();
    return this.mapper.map(comment, CommentDto, Comment);
  }
}
