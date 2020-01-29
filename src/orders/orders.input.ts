import { InputType, Field } from 'type-graphql'

@InputType()
export class OrderInput {
  @Field()
  readonly item: string

  @Field()
  readonly user: string

  @Field()
  readonly quantity: number
}
