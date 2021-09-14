import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

import { User } from 'src/users/schemas/users.model'

@Schema()
export class Article {
  @Prop()
  isPublished: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}
