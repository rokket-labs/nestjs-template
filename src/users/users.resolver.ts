import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { Item } from 'src/items/items.model'
import { Order } from 'src/orders/orders.model'
import { OrdersService } from 'src/orders/orders.service'

import { UpdateUserInput } from './users.input'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
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
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.delete(id)
  }

  @ResolveField(() => [Order])
  async orders(@Parent() item: Item): Promise<Order[]> {
    const { id } = item

    return this.ordersService.find({ userId: id })
  }
}
