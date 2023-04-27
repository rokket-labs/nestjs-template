import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class RegisterUserInput {
  firstName?: string
  lastName?: string
  email: string
  password: string
}

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {}
