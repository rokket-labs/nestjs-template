import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { User } from './users.schema'
import { UserInput } from './users.input'
import { UserShow } from './dto/user-show.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findAll(): Promise<UserShow[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<UserShow> {
    return await this.userModel.findOne(id)
  }

  async delete(id: string): Promise<UserShow> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update(id: string, user: UserInput): Promise<UserShow> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true })
  }
}
