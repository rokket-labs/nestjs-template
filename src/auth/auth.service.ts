import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'

import { User } from 'src/users/users.schema'
import { UserInput } from 'src/users/users.input'
import { Token } from './interfaces/token.interface'
import { Payload } from './interfaces/payload.interface'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(user: User): Promise<Token> {
    const payload = { sub: user.id, user }
    return {
      accessToken: this.jwt.sign(payload),
    }
  }

  async signUp(createUserDto: UserInput): Promise<User> {
    const password = await bcryptjs.hash(createUserDto.password, 10)
    return this.usersService.create({ ...createUserDto, password })
  }

  async validateUser(userInput: UserInput): Promise<User | null> {
    const { email, password } = userInput

    const user = await this.usersService.findByEmail(email)

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }

  async validate({ id }): Promise<User | null> {
    const user = await this.usersService.findOne(id)
    if (!user) throw Error('Authenticate validation error')
    return user
  }
}
