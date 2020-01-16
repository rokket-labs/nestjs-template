import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './users.schema'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, TypegooseModule],
})
export class UsersModule {}
