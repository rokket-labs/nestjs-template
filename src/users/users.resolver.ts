import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { UsersService } from './users.service'
import { UserInput } from './dto/user-input.dto'
import { UserShow } from './dto/user-show.dto'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserShow])
  async users(): Promise<UserShow[]> {
    return this.usersService.findAll()
  }

  @Query(() => UserShow)
  async getUser(@Args('id') id: string): Promise<UserShow> {
    return this.usersService.findOne(id)
  }

  @Mutation(() => UserShow)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserInput,
  ): Promise<UserShow> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => UserShow)
  async deleteUser(@Args('id') id: string): Promise<UserShow> {
    return this.usersService.delete(id)
  }
}
