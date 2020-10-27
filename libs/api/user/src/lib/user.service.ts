import { Injectable } from '@nestjs/common';
import type { ModelType } from '@post-rest-api/common';
import { BaseService } from '@post-rest-api/common';
import { User } from '@post-rest-api/models';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {
    super(userModel);
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.findOne().where('username').equals(username).exec();
    } catch (e) {
      UserService.throwMongoError(e);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.findOne().where('email').equals(email).exec();
    } catch (e) {
      UserService.throwMongoError(e);
    }
  }
}
