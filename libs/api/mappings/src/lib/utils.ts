import { CreateMapFluentFunction } from '@nartc/automapper';
import { Base, BaseDto } from '@post-rest-api/common';
import { ignore } from 'nestjsx-automapper';

export function ignoreBaseProperties<TS extends Base, TD extends BaseDto>(
  createMapFluentFunction: CreateMapFluentFunction<TS, TD>
): CreateMapFluentFunction<TS, TD> {
  createMapFluentFunction
    .forMember((s) => s.createdAt, ignore())
    .forMember((s) => s.updatedAt, ignore())
    .forMember((s) => s.id, ignore())
    .forMember((s) => s.isActive, ignore());
  return createMapFluentFunction;
}

// export function mapBaseProperties<TS extends Base, TD extends BaseDto>(
//   createMapFluentFunction: CreateMapFluentFunction<TS, TD>
// ): CreateMapFluentFunction<TS, TD> {
//   createMapFluentFunction
//     .forMember()
//
//   return createMapFluentFunction;
// }
