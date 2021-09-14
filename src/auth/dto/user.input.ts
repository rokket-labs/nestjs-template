import { InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  name: string
  password: string
}
