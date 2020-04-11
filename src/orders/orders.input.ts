import { InputType, OmitType, PartialType } from '@nestjs/graphql'

@InputType()
export class OrderInput {
  item: string
  user: string
  quantity: number
}

@InputType()
export class UpdateOrderInput extends PartialType(
  OmitType(OrderInput, ['user']),
) {}
