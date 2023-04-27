import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcryptjs from 'bcryptjs'
import { Model } from 'mongoose'

import { IdTokenUser } from 'src/auth/jwt.strategy'

import { RegisterUserInput, UpdateUserInput } from './dto/user.input'
import { User, UserDocument } from './schemas/users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(
    userInput: RegisterUserInput,
    user: IdTokenUser,
  ): Promise<User> {
    const newUser = new this.userModel({
      ...userInput,
      email: user.email,
      isAdmin: false,
    })

    return newUser.save()
  }

  async create(input: RegisterUserInput): Promise<User> {
    const createdItem = new this.userModel(input)

    return createdItem.save()
  }

  async validate(input: RegisterUserInput): Promise<User | null> {
    const { email, password } = input
    const user = await this.userModel.findOne({ email })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id })
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    })
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id)
  }
}
