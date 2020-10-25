import { Base, useMongoosePlugin } from '@post-rest-api/common';
import { Post } from '@post-rest-api/post';
import { User } from '@post-rest-api/user';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class Comment extends Base {
  @prop({ required: true, minlength: 1 })
  @AutoMap()
  text: string;
  @prop({ ref: () => Post })
  @AutoMap(() => Post)
  post: Ref<Post>;
  @prop({ ref: () => User })
  @AutoMap(() => User)
  author: Ref<User>;
}
