import { forwardRef, Inject } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Order } from 'src/orders/orders.entity'
import { OrdersService } from 'src/orders/orders.service'

import { User } from './users.entity'
import { UserInput } from './users.input'
import { UsersService } from './users.service'

@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

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
    @Args('input') input: UserInput,
  ): Promise<User> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.delete(id)
  }

  @ResolveField(() => [Order])
  async orders(@Parent() item): Promise<Order[]> {
    const { id } = item
    return await this.ordersService.find({ user: id })
  }
}
