import { PostDto } from '@post-rest-api/dtos';
import { Post } from '@post-rest-api/post';
import { AutoMapper, mapFrom, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class PostProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Post, PostDto)
      .forMember(
        (d) => d.commentsCount,
        mapFrom((s) => s.comments.length)
      )
      .forMember(
        (d) => d.likedByCount,
        mapFrom((s) => s.likedBy.length)
      );
  }
}
