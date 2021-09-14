import { Injectable } from '@nestjs/common'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'

import { UserInput } from './dto/user.input'
import { AuthConfig } from './auth.config'

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool
  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    })
  }

  authenticateUser(user: UserInput): Promise<CognitoUserSession> {
    const { name, password } = user

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    })
    const userData = {
      Username: name,
      Pool: this.userPool,
    }

    const newUser = new CognitoUser(userData)

    return new Promise((resolve, reject) => {
      const callbacks = {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
        },
      }

      return newUser.authenticateUser(authenticationDetails, {
        ...callbacks,
        newPasswordRequired: (userAttributes) => {
          delete userAttributes.email_verified
          delete userAttributes.phone_number_verified

          newUser.completeNewPasswordChallenge(
            password,
            userAttributes,
            callbacks,
          )
        },
      })
    })
  }
}
