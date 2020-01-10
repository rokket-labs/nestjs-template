import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { TokenDto } from './dto/token.dto'
import { Token } from './interfaces/token.interface'
import { UserLogin } from 'src/users/dto/user-login.dto'
import { AuthService } from './auth.service'
import { HttpException, HttpStatus } from '@nestjs/common'

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Mutation(() => TokenDto)
  async login(@Args('input') input: UserLogin): Promise<Token> {
    const user = await this.authService.login(input)
    console.log(user)

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    const token = { jwt: this.jwt.sign({ ...user }) }

    return token
  }
}
