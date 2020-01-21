import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { Item } from './items.schema'
import { ItemsService } from './items.service'
import { ItemInput } from './items.input'
import { GqlAuthGuard } from 'src/auth/grapqhl-auth.guard'

@Resolver('Items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return this.itemsService.findAll()
  }

  @Query(() => Item)
  @UseGuards(GqlAuthGuard)
  async getItem(@Args('id') id: string): Promise<Item> {
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

  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello'
  }
}
