import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IdTokenUser } from 'src/auth/jwt.strategy'

import { RegisterUserInput } from './dto/user.input'
import { User, UserDocument } from './schemas/users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(
    userInput: RegisterUserInput,
    user: IdTokenUser,
  ): Promise<User> {
    console.log(userInput, user)

    const newUser = new this.userModel({
      ...userInput,
      email: user.email,
      cognitoUserId: user.sub,
      isAdmin: false,
    })

    return newUser.save()
  }
}
