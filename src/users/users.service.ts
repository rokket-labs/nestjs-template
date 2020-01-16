import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { User } from './users.schema'
import { UserInput } from './dto/user-input.dto'
import { UserShow } from './dto/user-show.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: ReturnModelType<typeof User>,
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
