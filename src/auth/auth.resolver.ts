import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { User } from '../users/schemas/users.model'

import { Login } from './dto/login.input'
import { UserInput } from './dto/user.input'
import { Token } from './interfaces/token.model'
import { AuthService } from './auth.service'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async login(@Args('input') input: Login): Promise<Token> {
    const user = await this.authService.validateUser(input)

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    return this.authService.login(user)
  }

  @Mutation(() => User)
  async signUp(@Args('input') input: UserInput): Promise<User> {
    const user = await this.authService.signUp(input)

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    return user
  }
}
