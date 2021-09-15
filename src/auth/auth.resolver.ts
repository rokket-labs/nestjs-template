import { BadRequestException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { UserInput } from './dto/user.input'
import { UserSession } from './dto/user-session.model'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * This method is only used for testing, all login should
   * be done through the frontend application and consumed through
   * the GraphQL Guard.
   */
  @Mutation(() => UserSession)
  async login(
    @Args('user') authenticateRequest: UserInput,
  ): Promise<UserSession> {
    try {
      const response = await this.authService.authenticateUser(
        authenticateRequest,
      )

      return {
        idToken: response.getIdToken().getJwtToken(),
        refreshToken: response.getRefreshToken().getToken(),
        accessToken: response.getAccessToken().getJwtToken(),
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
