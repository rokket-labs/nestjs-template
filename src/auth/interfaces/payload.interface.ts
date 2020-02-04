import { User } from 'src/users/users.schema'

export interface Payload {
  userId: string
  user: User
}
