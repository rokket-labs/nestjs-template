import { forwardRef, Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CanDoAny, RoleProtected } from 'nestjs-role-protected'
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard'
import { CurrentUser } from 'src/helpers/decorators/decorators'
import { Item } from 'src/items/items.entity'
import { ItemsService } from 'src/items/items.service'
import { User } from 'src/users/users.entity'
import { UsersService } from 'src/users/users.service'

import { Order } from './orders.entity'
import { OrderInput, OrderUpdate } from './orders.input'
import { OrdersService } from './orders.service'

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  async createOrder(@Args('input') input: OrderInput): Promise<Order> {
    return this.ordersService.create(input)
  }

  @RoleProtected({
    action: 'update',
  })
  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: OrderUpdate,
    @CurrentUser() user: User,
    @CanDoAny() canDoAny: () => boolean,
  ): Promise<Order> {
    return this.ordersService.update(id, user, input, canDoAny())
  }

  @RoleProtected({
    action: 'delete',
  })
  @Mutation(() => Order)
  async deleteOrder(
    @Args('id') id: string,
    @CurrentUser() user: User,
    @CanDoAny() canDoAny: () => boolean,
  ): Promise<Order> {
    return this.ordersService.delete(id, user, canDoAny())
  }

  @ResolveField(() => User)
  async user(@Parent() order): Promise<User> {
    const { user } = order
    return await this.usersService.findOne(user)
  }

  @ResolveField(() => Item)
  async item(@Parent() order): Promise<Item> {
    const { item } = order
    return await this.itemsService.findOne(item)
  }
}
