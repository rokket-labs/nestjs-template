import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CanDoAny, RoleProtected } from 'nestjs-role-protected';

import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/helpers/decorators/decorators';
import { Item } from 'src/items/items.model';
import { ItemsService } from 'src/items/items.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

import { OrderInput, UpdateOrderInput } from './orders.input';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

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
    return this.ordersService.findAll();
  }

  @Query(() => Order)
  async Order(@Args('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  async createOrder(
    @Args('input') input: OrderInput,
    @CurrentUser() user: User,
  ): Promise<Order> {
    return this.ordersService.create({ ...input, userId: user.id });
  }

  @RoleProtected({
    action: 'update',
  })
  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: UpdateOrderInput,
    @CurrentUser() user: User,
    @CanDoAny() canDoAny: () => boolean,
  ): Promise<Order> {
    return this.ordersService.update(id, user, input, canDoAny());
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
    return this.ordersService.delete(id, user, canDoAny());
  }

  @ResolveField()
  async user(@Parent() order: Order): Promise<User> {
    const { userId } = order;

    return this.usersService.findOne(userId);
  }

  @ResolveField()
  async item(@Parent() order: Order): Promise<Item> {
    const { itemId } = order;

    return this.itemsService.findOne(itemId);
  }
}
