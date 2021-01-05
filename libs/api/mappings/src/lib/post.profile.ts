import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { PostDto } from '@post-rest-api/dtos';
import { Post } from '@post-rest-api/models';

@Injectable()
export class PostProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
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
    };
  }
}
