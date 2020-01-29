import { Module, forwardRef } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { ItemsService } from './items.service'
import { ItemsResolver } from './items.resolver'
import { Item } from './items.schema'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
  imports: [TypegooseModule.forFeature([Item]), forwardRef(() => OrdersModule)],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
