import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class ItemInput {
  title: string;
  price: number;
  description: string;
}

@InputType()
export class UpdateItemInput extends PartialType(ItemInput) {}
