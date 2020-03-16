import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import * as bcryptjs from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'

import { User } from './users.entity'
import { UserInput } from './users.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(input: UserInput): Promise<User> {
    const createdItem = new this.userModel(input)
    return await createdItem.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id })
  }

  async validate(input: UserInput): Promise<User | null> {
    const { email, password } = input
    const user = await this.userModel.findOne({ email })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email })
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update(id: string, user: Partial<UserInput>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true })
  }
}
