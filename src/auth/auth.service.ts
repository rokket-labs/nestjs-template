import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/interfaces/users.interface'
import { UserShow } from '../users/dto/user-show.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate({ id }): Promise<UserShow> {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw Error('Authenticate validation error')
    }

    return user
  }
}
