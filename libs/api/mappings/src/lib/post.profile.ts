import { PostDto } from '@post-rest/api/dtos';
import { Post } from '@post-rest/api/post';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class PostProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Post, PostDto);
  }
}
