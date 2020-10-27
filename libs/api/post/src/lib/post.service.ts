import { ForbiddenException, Injectable } from '@nestjs/common';
import type { ModelType } from '@post-rest-api/common';
import { BaseService } from '@post-rest-api/common';
import { CreatePostParamsDto, PostDto } from '@post-rest-api/dtos';
import { Post } from '@post-rest-api/models';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @InjectModel(Post) private readonly postModel: ModelType<Post>,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(postModel);
  }

  async getPosts(): Promise<PostDto[]> {
    const posts: Post[] = await this.findAll()
      .sort({ createdAt: -1 })
      .limit(25)
      .exec();
    return this.mapper.mapArray(posts, PostDto, Post);
  }

  async getPostByUserId(userId: string): Promise<PostDto[]> {
    const postsByUser: Post[] = await this.findAll()
      .where('author')
      .equals(Types.ObjectId(userId))
      .sort({ createdAt: -1 })
      .limit(25)
      .exec();

    return this.mapper.mapArray(postsByUser, PostDto, Post);
  }

  async getPost(id: string): Promise<PostDto> {
    const post = await this.findById(id).exec();
    return this.mapper.map<Post>(post, PostDto, Post);
  }

  async createPost(userId: string, dto: CreatePostParamsDto): Promise<PostDto> {
    const newPost = this.createModel(dto);
    newPost.author = Types.ObjectId(userId);
    const created: Post = (await this.create(newPost)).toObject({
      virtuals: true,
    });
    return this.mapper.map(created, PostDto, Post);
  }

  async deletePost(userId: string, id: string): Promise<PostDto> {
    const post: Post = await this.findById(id).exec();
    if (!Types.ObjectId(userId).equals(post.author as Types.ObjectId)) {
      throw new ForbiddenException(
        userId,
        'You can only delete your own posts'
      );
    }
    await this.deleteById(id).exec();
    return this.mapper.map(post, PostDto, Post);
  }

  async like(userId: string, id: string): Promise<PostDto> {
    const updated: Post = await this.updateBy(id, {
      $addToSet: { likedBy: Types.ObjectId(userId) },
    }).exec();
    return this.mapper.map(updated, PostDto, Post);
  }

  async unlike(userId: string, id: string) {
    const updated: Post = await this.updateBy(id, {
      $pull: { likedBy: Types.ObjectId(userId) },
    }).exec();
    return this.mapper.map(updated, PostDto, Post);
  }
}
