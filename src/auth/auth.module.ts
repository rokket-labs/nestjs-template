import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthConfig } from './auth.config'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthConfig, AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
