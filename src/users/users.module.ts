import { Module, forwardRef } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './users.schema'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: { timestamps: true } },
    ]),
    forwardRef(() => OrdersModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, TypegooseModule],
})
export class UsersModule {}
