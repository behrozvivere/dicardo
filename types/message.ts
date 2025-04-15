import type { User } from "./user"

export interface Message {
  id: string
  sender: User
  receiver: User
  content: string
  isRead: boolean
  createdAt: Date
}
