import { Comment } from '@post-rest-api/comment';
import { CommentDto } from '@post-rest-api/dtos';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class CommentProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Comment, CommentDto);
  }
}
