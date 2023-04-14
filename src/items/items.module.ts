import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';

import { OrdersModule } from 'src/orders/orders.module';

import { Item } from './items.model';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  imports: [TypegooseModule.forFeature([Item]), forwardRef(() => OrdersModule)],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
