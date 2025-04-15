export type TransactionType = "topup" | "purchase" | "refund"

export interface Transaction {
  id: string
  userId: string
  amount: number
  type: TransactionType
  description: string
  createdAt: Date
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  updatedAt: Date
}
