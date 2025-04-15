import type { ChatMessage, ChatSession } from "@/types/chat"

// Mock data for chat session
const mockChatSession: ChatSession = {
  id: "chat-1",
  userId: "user-1",
  messages: [
    {
      id: "msg-1",
      sender: "support",
      content: "سلام، به پشتیبانی خوش آمدید. چطور می‌توانم به شما کمک کنم؟",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
    },
    {
      id: "msg-2",
      sender: "user",
      content: "سلام، من یک سوال در مورد شماره‌های مجازی دارم.",
      timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000), // 1.9 hours ago
      isRead: true,
    },
    {
      id: "msg-3",
      sender: "support",
      content: "بله، بفرمایید. چه سوالی دارید؟",
      timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
      isRead: true,
    },
  ],
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  updatedAt: new Date(Date.now() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get chat session
export async function getChatSession(): Promise<ChatSession> {
  await delay(800) // Simulate API delay
  return { ...mockChatSession, messages: [...mockChatSession.messages] }
}

// Send message
export async function sendMessage(content: string): Promise<ChatMessage> {
  await delay(500) // Simulate API delay

  // Create new message
  const newMessage: ChatMessage = {
    id: `msg-${mockChatSession.messages.length + 1}`,
    sender: "user",
    content,
    timestamp: new Date(),
    isRead: true,
  }

  // Add to session
  mockChatSession.messages.push(newMessage)
  mockChatSession.updatedAt = new Date()

  // Simulate support response after a delay
  setTimeout(() => {
    const supportResponses = [
      "بله، می‌توانم کمک کنم. لطفاً جزئیات بیشتری ارائه دهید.",
      "ممنون از پیام شما. کارشناسان ما در حال بررسی موضوع هستند.",
      "این مورد را بررسی کردم. آیا اطلاعات بیشتری نیاز دارید؟",
      "متوجه شدم. لطفاً چند لحظه صبر کنید تا اطلاعات لازم را برای شما آماده کنم.",
      "با تشکر از تماس شما. آیا می‌توانم در مورد دیگری کمک کنم؟",
    ]

    const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)]

    const supportMessage: ChatMessage = {
      id: `msg-${mockChatSession.messages.length + 1}`,
      sender: "support",
      content: randomResponse,
      timestamp: new Date(),
      isRead: false,
    }

    mockChatSession.messages.push(supportMessage)
    mockChatSession.updatedAt = new Date()
  }, 2000)

  return newMessage
}
