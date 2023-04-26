import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateArticleInput {
  @Field(() => Boolean, { defaultValue: true })
  isPublished?: boolean

  title: string
}
