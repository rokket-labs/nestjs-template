import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseRoles, ACGuard } from 'nest-access-control'

import { User } from 'src/users/users.schema'
import { Inject, forwardRef, UseGuards, SetMetadata } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { ItemsService } from 'src/items/items.service'
import { Item } from 'src/items/items.schema'

import { OrdersService } from './orders.service'
import { Order } from './orders.schema'
import { OrderInput, OrderUpdate } from './orders.input'
import { GqlAuthGuard } from 'src/auth/grapqhl-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import {
  UserRoles,
  UserId,
} from 'src/helpers/decorators/graphql-user.decorator'
import { Roles as RolesType } from 'src/app.roles'
import { CurrentUser } from 'src/helpers/decorators/decorators'

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

  @UseGuards(GqlAuthGuard, RolesGuard)
  @UseRoles({
    resource: 'order',
    action: 'update',
    possession: 'own',
  })
  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: OrderUpdate,
    @CurrentUser() user: User,
  ): Promise<Order> {
    console.log(user)
    return this.ordersService.update(id, user, input)
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
