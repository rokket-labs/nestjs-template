import { InputType } from '@nestjs/graphql'

@InputType()
export class RegisterUserInput {
  firstName: string
  lastName: string
}
