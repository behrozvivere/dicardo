export type Platform = "spotify" | "telegram" | "whatsapp" | "instagram" | "google" | "facebook"
export type NumberType = "virtual" | "permanent"

export interface VirtualNumber {
  id: string
  number: string
  platform: Platform
  country: string
  price: number
  setupFee: number
  isAvailable: boolean
  features: string[]
  description?: string
  createdAt?: Date
  type?: NumberType
}
