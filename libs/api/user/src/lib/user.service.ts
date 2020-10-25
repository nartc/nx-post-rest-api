import { Injectable } from '@nestjs/common';
import { BaseService, ModelType } from '@post-rest-api/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';

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
