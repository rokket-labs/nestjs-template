import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'

import { User } from './users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: { timestamps: true } },
    ]),
    // forwardRef(() => OrdersModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
