export type MessageSender = "user" | "support"

export interface ChatMessage {
  id: string
  sender: MessageSender
  content: string
  timestamp: Date
  isRead: boolean
}

export interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}
