import { InputType } from '@nestjs/graphql'

@InputType()
export class ItemInput {
  title: string

  price: number

  description: string
}
