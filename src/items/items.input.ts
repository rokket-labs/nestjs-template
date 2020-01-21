import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class ItemInput {
  @Field(() => String)
  readonly title: string

  @Field(() => Int)
  readonly price: number

  @Field(() => String)
  readonly description: string
}
