import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthConfig } from './auth.config'

export interface IdTokenUser {
  sub: string
  email_verified: string
  exp: Date
  iat: Date
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(authConfig: AuthConfig) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    })
  }

  public async validate(payload: IdTokenUser) {
    return payload
  }
}
