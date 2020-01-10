import { Injectable } from '@nestjs/common'
import { User } from 'src/users/interfaces/users.interface'
import { UserShow } from '../users/dto/user-show.dto'
import { UserInput } from 'src/users/dto/user-input.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async login(userInput: UserInput): Promise<UserShow> {
    const { email, password } = userInput
    const user = await this.userModel.findOne({ email })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }
}
