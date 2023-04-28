// import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

// import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
// import { IdTokenUser } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/utils/decorators/current-user'

import { UserDto } from './dto/user.dto'
import { RegisterUserInput, UpdateUserInput } from './dto/user.input'
import { User } from './schemas/users.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => UserDto)
  // @UseGuards(GqlAuthGuard)
  // async registerUser(
  //   @Args('userInput') userInput: RegisterUserInput,
  //   @CurrentUser() currentUser: IdTokenUser,
  // ) {
  //   return this.usersService.registerUser(userInput, currentUser)
  // }

  @Mutation(() => UserDto)
  async createUser(
    @Args('userInput') userInput: RegisterUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.usersService.create(userInput, currentUser)
  }

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(() => User)
  async User(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.delete(id)
  }
}
