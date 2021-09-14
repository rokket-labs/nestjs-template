import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './schemas/users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
