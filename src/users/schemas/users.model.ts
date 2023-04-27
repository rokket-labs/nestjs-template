import { HideField, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// import { Role } from 'src/roles/schemas/roles.model'

@Schema()
@ObjectType()
export class User {
  id: string

  // @Prop({ index: 'text', unique: true })
  // sub: string

  // @Prop({ type: Types.ObjectId, ref: 'Role' })
  // role: Role

  @Prop({ required: true, lowercase: true })
  email: string

  @HideField()
  @Prop({ required: true })
  password: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop({ default: false })
  isAdmin: boolean
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
