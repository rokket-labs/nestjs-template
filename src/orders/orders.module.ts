import { Module, forwardRef } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { Order } from './orders.schema'
import { OrdersService } from './orders.service'
import { OrdersResolver } from './orders.resolver'
import { UsersModule } from 'src/users/users.module'
import { ItemsModule } from 'src/items/items.module'

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
