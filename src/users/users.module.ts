import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { UserSchema } from './users.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
