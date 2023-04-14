import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleProtected } from 'nestjs-role-protected';

import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Metadata } from 'src/helpers/metadata.model';
import { Order } from 'src/orders/orders.model';
import { OrdersService } from 'src/orders/orders.service';

import { ItemInput, UpdateItemInput } from './items.input';
import { Item } from './items.model';
import { ItemsService } from './items.service';

@Resolver(Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  @Query(() => [Item])
  async allItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query(() => Item)
  @UseGuards(GqlAuthGuard)
  async Item(@Args('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Query(() => Metadata)
  async allItemsMeta(): Promise<Metadata> {
    const count = await this.itemsService.count();

    return { count };
  }

  @Mutation(() => Item)
  async createItem(@Args('input') input: ItemInput): Promise<Item> {
    return this.itemsService.create(input);
  }

  @RoleProtected({
    action: 'update',
    possession: 'any',
  })
  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: string,
    @Args('input') input: UpdateItemInput,
  ): Promise<Item> {
    return this.itemsService.update(id, input);
  }

  @RoleProtected({
    action: 'delete',
    possession: 'any',
  })
  @Mutation(() => Item)
  async deleteItem(@Args('id') id: string): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @ResolveField(() => [Order])
  async orders(@Parent() item: Item): Promise<Order[]> {
    const { id } = item;

    return this.ordersService.find({ itemId: id });
  }
}
