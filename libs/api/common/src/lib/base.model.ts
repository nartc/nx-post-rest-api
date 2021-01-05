import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { timestamps: true },
})
export abstract class Base {
  @prop()
  @AutoMap()
  createdAt?: Date;
  @prop()
  @AutoMap()
  updatedAt?: Date;
  @prop({ required: true, default: true, index: true })
  @AutoMap()
  isActive: boolean;
  @AutoMap()
  id?: string;
}

export abstract class BaseDto {
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  createdAt?: Date;
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  updatedAt?: Date;
  @ApiPropertyOptional()
  @AutoMap()
  id?: string;
  @ApiProperty()
  @AutoMap()
  isActive: boolean;
}
