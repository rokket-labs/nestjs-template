import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { IdTokenUser } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/utils/decorators/current-user'

import { UserDto } from './dto/user.dto'
import { RegisterUserInput } from './dto/user.input'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async registerUser(
    @Args('userInput') userInput: RegisterUserInput,
    @CurrentUser() currentUser: IdTokenUser,
  ) {
    return this.usersService.registerUser(userInput, currentUser)
  }
}
