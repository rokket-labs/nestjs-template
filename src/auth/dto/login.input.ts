import { InputType } from '@nestjs/graphql'

@InputType()
export class Login {
  email: string
  password: string
}
