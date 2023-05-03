import { Injectable } from '@nestjs/common'

import { User } from './users/schemas/users.model'

@Injectable()
export class AppService {
  getHello(user: User): string {
    return `Hello ${user.email}`
  }
}
