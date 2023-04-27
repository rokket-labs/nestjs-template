import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
// import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from 'src/users/users.service'

import { Payload, UserPayload } from './dto/user-session.model'

export interface IdTokenUser {
  sub: string
  email_verified: string
  exp: Date
  iat: Date
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET', process.env.JWT_SECRET),
      // secretOrKeyProvider: passportJwtSecret({
      //   cache: true,
      //   rateLimit: true,
      //   jwksRequestsPerMinute: 5,
      //   jwksUri: `${config.get<string>(
      //     'AUTHORITY_ID',
      //     process.env.AUTHORITY_ID,
      //   )}/.well-known/jwks.json`,
      // }),
      // audience: config.get<string>('CLIENT_ID', process.env.CLIENT_ID),
      // issuer: config.get<string>('AUTHORITY_ID', process.env.AUTHORITY_ID),
      // algorithms: ['RS256'],
    })
  }

  validate(payload: Payload): UserPayload {
    return payload.user
  }
  // public async validate(payload: IdTokenUser) {
  //   const user = await this.usersService.findOrRegisterUser(payload)

  //   return user
  // }
}
