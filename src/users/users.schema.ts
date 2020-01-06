import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})
