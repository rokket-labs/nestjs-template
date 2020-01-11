import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from './interfaces/users.interface'
import { UserInput } from './dto/user-input.dto'
import { UserShow } from './dto/user-show.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

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
