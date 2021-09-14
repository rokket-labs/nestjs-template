import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthConfig {
  constructor(private configService: ConfigService) {}

  public userPoolId: string = this.configService.get<string>(
    'COGNITO_USER_POOL_ID',
    process.env.COGNITO_USER_POOL_ID,
  )
  public clientId: string = this.configService.get<string>(
    'COGNITO_CLIENT_ID',
    process.env.COGNITO_CLIENT_ID,
  )
  public region: string = this.configService.get<string>(
    'COGNITO_REGION',
    process.env.COGNITO_REGION,
  )
  public authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`
}
