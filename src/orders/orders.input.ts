import { InputType } from '@nestjs/graphql'

@InputType()
export class OrderInput {
  item: string

  user: string

  quantity: number
}

@InputType()
export class OrderUpdate {
  item?: string

  quantity?: number
}
