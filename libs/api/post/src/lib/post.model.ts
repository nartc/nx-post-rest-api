import { Comment } from '@post-rest/api/comment';
import { Base, useMongoosePlugin } from '@post-rest/api/common';
import { User } from '@post-rest/api/user';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class Post extends Base {
  @prop({ required: true, minlength: 1 })
  @AutoMap()
  text: string;
  @prop({ ref: () => User })
  @AutoMap(() => User)
  author: Ref<User>;
  @prop({ ref: () => Comment, autopopulate: true, default: [] })
  @AutoMap(() => Comment)
  comments: Ref<Comment>[];
  @prop({ ref: () => User, autopopulate: true, default: [] })
  @AutoMap(() => User)
  likedBy: Ref<User>[];
}
