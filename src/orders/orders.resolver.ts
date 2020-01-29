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

  @Mutation(() => Order)
  async createOrder(@Args('input') input: OrderInput): Promise<Order> {
    return this.ordersService.create(input)
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

/*
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { Item } from './items.schema'
import { ItemsService } from './items.service'
import { ItemInput } from './items.input'
import { GqlAuthGuard } from 'src/auth/grapqhl-auth.guard'
import { Metadata } from 'src/helpers/types/metadata'
import { OrdersService } from './orders.service'

@Resolver(Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  async allItems(): Promise<Item[]> {
    return this.itemsService.findAll()
  }

  @Query(() => Item)
  @UseGuards(GqlAuthGuard)
  async Item(@Args('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id)
  }

  @Mutation(() => Item)
  async createItem(@Args('input') input: ItemInput): Promise<Item> {
    return this.itemsService.create(input)
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: string,
    @Args('input') input: ItemInput,
  ): Promise<Item> {
    return this.itemsService.update(id, input)
  }

  @Mutation(() => Item)
  async deleteItem(@Args('id') id: string): Promise<Item> {
    return this.itemsService.delete(id)
  }

  @Query(() => Metadata)
  async allItemsMeta(): Promise<Metadata> {
    const count = await this.itemsService.count()
    return { count }
  }
}
*/
