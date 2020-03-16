import { Injectable } from '@nestjs/common'
import { Command } from 'nestjs-command'
import { Roles } from 'src/app.roles'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UserSeed {
  constructor(private readonly authService: AuthService) {}
  @Command({
    command: 'users',
    describe: 'create basic users',
    autoExit: true,
  })
  async create(): Promise<void> {
    const adminId = '5e55853d019b693dac7d226e'
    await this.authService.signUp({
      _id: adminId,
      email: 'admin@user.com',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'Admin',
      roles: [Roles.ADMIN],
    })
  }
}
