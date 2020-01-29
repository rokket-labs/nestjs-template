import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { Item } from './items.schema'
import { ItemsService } from './items.service'
import { ItemInput } from './items.input'
import { GqlAuthGuard } from 'src/auth/grapqhl-auth.guard'
import { Metadata } from 'src/helpers/types/metadata'

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
}
