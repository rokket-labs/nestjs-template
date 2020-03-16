import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/users/users.entity'
import { UserInput } from 'src/users/users.input'

import { AuthService } from './auth.service'
import { Login } from './dto/login.input'
import { TokenDto } from './dto/token.entity'
import { Token } from './interfaces/token.interface'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenDto)
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
