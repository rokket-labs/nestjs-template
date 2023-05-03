import { InputType, PartialType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'

import { CreateArticleInput } from './create-article.input'

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @IsMongoId()
  id: string
}
