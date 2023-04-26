import { InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  email: string
  password: string
}
