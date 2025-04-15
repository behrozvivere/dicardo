import type { VirtualNumber } from "./number"
import type { User } from "./user"

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "refunded"

export interface OrderItem {
  number: VirtualNumber
  quantity: number
  price: number
}

export interface Order {
  id: string
  user: User
  items: OrderItem[]
  status: OrderStatus
  total: number
  paymentMethod: string
  createdAt: Date
  updatedAt?: Date
}
