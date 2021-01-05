import { AutoMap } from '@automapper/classes';
import { Base, useMongoosePlugin } from '@post-rest-api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { Comment } from './comment.model';
import { UserRole } from './enums/user-role.enum';
import { Post } from './post.model';

@useMongoosePlugin()
export class User extends Base {
  @prop({
    required: true,
    unique: true,
  })
  @AutoMap()
  username: string;
  @prop({
    required: true,
    unique: true,
  })
  @AutoMap()
  email: string;
  @prop({ required: true })
  password: string;
  @prop({ enum: UserRole, type: String, default: UserRole.User })
  @AutoMap()
  role: UserRole;
  @prop()
  @AutoMap()
  name?: string;
  @prop()
  @AutoMap()
  avatarUrl?: string;
  @prop()
  @AutoMap()
  bio?: string;
  @prop()
  @AutoMap()
  location?: string;
  @prop({ ref: () => Post, autopopulate: true, default: [] })
  @AutoMap(() => Post)
  posts: Ref<Post>[];
  @prop({ ref: () => Post, autopopulate: true, default: [] })
  @AutoMap(() => Post)
  liked: Ref<Post>[];
  @prop({ ref: () => Comment, autopopulate: true, default: [] })
  @AutoMap(() => Comment)
  comments: Ref<Comment>[];
}
