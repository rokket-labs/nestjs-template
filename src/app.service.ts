import { Injectable } from '@nestjs/common'

import { IdTokenUser } from './auth/jwt.strategy'

@Injectable()
export class AppService {
  getHello(user: IdTokenUser): string {
    return `Hello ${user.email}`
  }
}
