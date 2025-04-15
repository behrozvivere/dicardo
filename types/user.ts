export type UserRole = "user" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatar?: string
  createdAt?: Date
}
