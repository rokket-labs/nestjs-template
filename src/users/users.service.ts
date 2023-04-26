import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcryptjs from 'bcryptjs'
import { Model } from 'mongoose'

import { IdTokenUser } from 'src/auth/jwt.strategy'

import { UserInput } from '../auth/dto/user.input'

import { RegisterUserInput } from './dto/user.input'
import { User, UserDocument } from './schemas/users.model'

type UserInputJWT = RegisterUserInput & UserInput

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
      cognitoUserId: user.sub,
      isAdmin: false,
    })

    return newUser.save()
  }

  async findOrRegisterUser(user: IdTokenUser): Promise<User> {
    const foundUser = await this.userModel.findOne({
      cognitoUserId: user.sub,
      email: user.email,
    })

    if (foundUser) return foundUser

    return this.registerUser({}, user)
  }

  async create(input: UserInputJWT): Promise<User> {
    const createdItem = new this.userModel(input)

    return createdItem.save()
  }

  async validate(input: UserInputJWT): Promise<User | null> {
    const { email, password } = input
    const user = await this.userModel.findOne({ email })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id })
  }
}
