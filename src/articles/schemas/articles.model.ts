import { ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

import { User } from 'src/users/schemas/users.model'

@Schema()
@ObjectType()
export class Article {
  @Prop()
  isPublished: boolean

  @Prop()
  title: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export type ArticleDocument = Article & Document

export const ArticleSchema = SchemaFactory.createForClass(Article)
