import { Base, useMongoosePlugin } from '@post-rest-api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Post } from './post.model';
import { User } from './user.model';

@useMongoosePlugin()
export class Comment extends Base {
  @prop({ required: true, minlength: 1 })
  @AutoMap()
  text: string;
  @prop({ ref: () => Post, autopopulate: true })
  @AutoMap(() => Post)
  post: Ref<Post>;
  @prop({ ref: () => User, autopopulate: true })
  @AutoMap(() => User)
  author: Ref<User>;
}
