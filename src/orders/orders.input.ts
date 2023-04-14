import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class OrderInput {
  itemId: string;
  userId: string;
  quantity: number;
}

@InputType()
export class UpdateOrderInput extends PartialType(
  OmitType(OrderInput, ['userId']),
) {}
