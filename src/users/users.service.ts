import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcryptjs from 'bcryptjs'

import { User } from './interfaces/users.interface'
import { UserInput } from './dto/user-input.dto'
import { UserShow } from './dto/user-show.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: UserInput): Promise<UserShow> {
    const password = await bcryptjs.hash(createUserDto.password, 10)
    const createdItem = new this.userModel({ ...createUserDto, password })
    return await createdItem.save()
  }

  async findAll(): Promise<UserShow[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<UserShow> {
    return await this.userModel.findOne({ _id: id })
  }

  async delete(id: string): Promise<UserShow> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update(id: string, user: UserInput): Promise<UserShow> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true })
  }

  async login(userInput: UserInput): Promise<UserShow> {
    console.log(userInput)
    const { email, password } = userInput
    const user = await this.userModel.findOne({ email })

    console.log({ user })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }
}
