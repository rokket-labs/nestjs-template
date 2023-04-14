import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';

import { ItemsModule } from 'src/items/items.module';
import { UsersModule } from 'src/users/users.module';

import { Order } from './orders.model';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Order]),
    forwardRef(() => UsersModule),
    forwardRef(() => ItemsModule),
  ],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
