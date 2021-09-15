import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from './auth/gql-auth.guard'
import { User } from './users/schemas/users.model'
import { CurrentUser } from './utils/decorators/current-user'
import { AppService } from './app.service'

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  getHello(@CurrentUser() user: User): string {
    return this.appService.getHello(user)
  }
}
