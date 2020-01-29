import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { OrdersService } from './orders.service'
import { Order } from './orders.schema'
import { OrderInput } from './orders.input'
import { User } from 'src/users/users.schema'
import { Inject, forwardRef } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { ItemsService } from 'src/items/items.service'
import { Item } from 'src/items/items.schema'

@Resolver(Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ItemsService))
    private readonly itemsService: ItemsService,
  ) {}

  @Query(() => [Order])
  async allOrders(): Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Query(() => Order)
  async Order(@Args('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id)
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: OrderInput): Promise<Order> {
    return this.ordersService.create(input)
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: OrderInput,
  ): Promise<Order> {
    return this.ordersService.update(id, input)
  }

  @Mutation(() => Order)
  async deleteItem(@Args('id') id: string): Promise<Order> {
    return this.ordersService.delete(id)
  }

  @ResolveProperty()
  async user(@Parent() order): Promise<User> {
    const { user } = order
    return await this.usersService.findOne(user)
  }

  @ResolveProperty()
  async item(@Parent() order): Promise<Item> {
    const { item } = order
    return await this.itemsService.findOne(item)
  }
}
