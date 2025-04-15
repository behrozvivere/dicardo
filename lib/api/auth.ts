import type { User } from "@/types/user"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "کاربر تست",
    email: "test@example.com",
    phone: "09123456789",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  },
]

// Login with Google
export async function loginWithGoogle(token: string): Promise<User> {
  await delay(1000) // Simulate API delay

  // In a real app, this would validate the token with Google
  // and either find or create a user based on the Google profile

  // For demo purposes, just return a mock user
  return mockUsers[0]
}

// Login with phone
export async function loginWithPhone(phone: string, otp: string): Promise<User> {
  await delay(1000) // Simulate API delay

  // In a real app, this would validate the OTP
  // and either find or create a user based on the phone number

  // For demo purposes, just return a mock user with the provided phone
  return {
    ...mockUsers[0],
    phone,
  }
}

// Register
export async function register(name: string, email: string, phone: string): Promise<User> {
  await delay(1000) // Simulate API delay

  // In a real app, this would create a new user

  // For demo purposes, just return a mock user with the provided details
  return {
    ...mockUsers[0],
    name,
    email,
    phone,
  }
}
