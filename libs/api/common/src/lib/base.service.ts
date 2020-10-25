import { InternalServerErrorException } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { MongoError } from 'mongodb';
import {
  CreateQuery,
  DocumentQuery,
  FilterQuery,
  Query,
  Types,
  UpdateQuery,
} from 'mongoose';
import { Base } from './base.model';

type QueryList<T extends Base> = DocumentQuery<
  DocumentType<T>[],
  DocumentType<T>
>;
type QueryItem<T extends Base> = DocumentQuery<
  DocumentType<T>,
  DocumentType<T>
>;

interface QueryOptions {
  lean?: boolean;
  autopopulate?: boolean;
}

export type ModelType<T extends Base> = ReturnModelType<AnyParamConstructor<T>>;

export abstract class BaseService<T extends Base> {
  protected model: ModelType<T>;

  protected constructor(model: ModelType<T>) {
    this.model = model;
  }

  private static get defaultOptions(): QueryOptions {
    return { lean: true, autopopulate: true };
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  protected getQueryOptions(options?: QueryOptions) {
    const mergedOptions = {
      ...BaseService.defaultOptions,
      ...(options || {}),
    };
    const option = mergedOptions.lean ? { virtuals: true } : null;

    if (option && mergedOptions.autopopulate) {
      option['autopopulate'] = true;
    }

    return { lean: option, autopopulate: mergedOptions.autopopulate };
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  findAll(options?: QueryOptions): QueryList<T> {
    return this.model.find().setOptions(this.getQueryOptions(options));
  }

  findOne(options?: QueryOptions): QueryItem<T> {
    return this.model.findOne().setOptions(this.getQueryOptions(options));
  }

  findById(id: string, options?: QueryOptions): QueryItem<T> {
    return this.model
      .findById(Types.ObjectId(id))
      .setOptions(this.getQueryOptions(options));
  }

  async create(item: CreateQuery<T>): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  deleteOne(options?: QueryOptions): QueryItem<T> {
    return this.model
      .findOneAndDelete()
      .setOptions(this.getQueryOptions(options));
  }

  deleteById(id: string, options?: QueryOptions): QueryItem<T> {
    return this.model
      .findByIdAndDelete(Types.ObjectId(id))
      .setOptions(this.getQueryOptions(options));
  }

  update(item: T, options?: QueryOptions): QueryItem<T> {
    return this.model
      .findByIdAndUpdate(Types.ObjectId(item.id), { $set: item } as any, {
        new: true,
      })
      .setOptions(this.getQueryOptions(options));
  }

  updateBy(
    id: string,
    updateQuery: UpdateQuery<DocumentType<T>>,
    options?: QueryOptions
  ): QueryItem<T> {
    return this.model
      .findByIdAndUpdate(Types.ObjectId(id), updateQuery, {
        new: true,
      })
      .setOptions(this.getQueryOptions(options));
  }

  count(filter: FilterQuery<DocumentType<T>> = {}): Query<number> {
    return this.model.count(filter);
  }

  async countAsync(filter: FilterQuery<DocumentType<T>> = {}): Promise<number> {
    try {
      return await this.count(filter);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }

  async exists(filter: FilterQuery<DocumentType<T>> = {}): Promise<boolean> {
    try {
      return await this.model.exists(filter);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
  }
}
