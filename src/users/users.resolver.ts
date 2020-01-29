import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'

import { UsersService } from './users.service'
import { UserInput } from './users.input'
import { User } from './users.schema'
import { Order } from 'src/orders/orders.schema'
import { Inject, forwardRef } from '@nestjs/common'
import { OrdersService } from 'src/orders/orders.service'

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

  @ResolveProperty()
  async orders(@Parent() item): Promise<Order[]> {
    const { id } = item
    return await this.ordersService.find({ user: id })
  }
}
