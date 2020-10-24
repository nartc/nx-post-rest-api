import autoPopulate from 'mongoose-autopopulate';
import leanVirtuals from 'mongoose-lean-virtuals';
import { applyDecorators } from '@nestjs/common';
import { plugin } from '@typegoose/typegoose';

export function useMongoosePlugin() {
  return applyDecorators(plugin(autoPopulate), plugin(leanVirtuals));
}
