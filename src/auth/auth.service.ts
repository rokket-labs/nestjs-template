import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { cleanUserModel } from '../helpers/cleanUserModel'
import { User } from '../users/schemas/users.model'
import { UsersService } from '../users/users.service'

import { UserInput } from './dto/user.input'
import { Token } from './interfaces/token.model'

type ValidateInput = {
  id: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(user: User): Promise<Token> {
    const payload = {
      sub: user.id,
      user: cleanUserModel(user),
    }

    return {
      accessToken: this.jwt.sign(payload),
    }
  }

  async signUp(createUserDto: UserInput): Promise<User> {
    return this.usersService.registerUser({ ...createUserDto })
  }

  async validateUser(userInput: UserInput): Promise<User | null> {
    return await this.usersService.validate(userInput)
  }

  async validate({ id }: ValidateInput): Promise<User | null> {
    const user = await this.usersService.findOne(id)

    if (!user) throw Error('Authenticate validation error')

    return user
  }
}
