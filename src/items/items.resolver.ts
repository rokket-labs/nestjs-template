import { UseGuards, Inject, forwardRef } from '@nestjs/common'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'

import { Item } from './items.schema'
import { ItemsService } from './items.service'
import { ItemInput } from './items.input'
import { GqlAuthGuard } from 'src/auth/grapqhl-auth.guard'
import { Metadata } from 'src/helpers/types/metadata'
import { OrdersService } from 'src/orders/orders.service'
import { Order } from 'src/orders/orders.schema'

@Resolver(Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  @Query(() => [Item])
  async allItems(): Promise<Item[]> {
    return this.itemsService.findAll()
  }

  @Query(() => Item)
  @UseGuards(GqlAuthGuard)
  async Item(@Args('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id)
  }

  @Query(() => Metadata)
  async allItemsMeta(): Promise<Metadata> {
    const count = await this.itemsService.count()
    return { count }
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

  @ResolveProperty()
  async orders(@Parent() item): Promise<Order[]> {
    const { id } = item
    console.log(id)
    return await this.ordersService.find({ item: id })
  }
}
