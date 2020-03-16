import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'
import { AuthModule } from 'src/auth/auth.module'

import { UserSeed } from '../users/seed/user.seed'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [CommandModule, UsersModule, AuthModule],
  providers: [UserSeed],
  exports: [UserSeed],
})
export class SeedsModule {}
