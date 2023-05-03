import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

import { RegisterUserInput, UpdateUserInput } from './dto/user.input'
import { User, UserDocument } from './schemas/users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(input: RegisterUserInput): Promise<User> {
    const password = await bcrypt.hash(input.password, 10)

    const newUser = new this.userModel({
      ...input,
      password,
    })

    return newUser.save()
  }

  async create(input: RegisterUserInput, currentUser: User): Promise<User> {
    const password = await bcrypt.hash(input.password, 10)
    const createdItem = new this.userModel({
      ...input,
      password,
      createdBy: currentUser.id,
    })

    return createdItem.save()
  }

  async validate(input: RegisterUserInput): Promise<User | null> {
    const { email, password } = input
    const user = await this.userModel.findOne({ email })

    console.log(user.password)

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)

    console.log(valid)

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
