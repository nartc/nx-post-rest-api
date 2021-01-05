import { AutoMap } from '@automapper/classes';
import { Base, useMongoosePlugin } from '@post-rest-api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { Comment } from './comment.model';
import { User } from './user.model';

@useMongoosePlugin()
export class Post extends Base {
  @prop({ required: true, minlength: 1 })
  @AutoMap()
  text: string;
  @prop({ ref: () => User, autopopulate: true })
  @AutoMap(() => User)
  author: Ref<User>;
  @prop({ ref: () => Comment, autopopulate: true, default: [] })
  @AutoMap(() => Comment)
  comments: Ref<Comment>[];
  @prop({ ref: () => User, autopopulate: true, default: [] })
  @AutoMap(() => User)
  likedBy: Ref<User>[];
}
