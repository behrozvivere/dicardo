import type { Transaction, Wallet } from "@/types/wallet"

// Mock data for wallet
const mockWallet: Wallet = {
  id: "wallet-1",
  userId: "user-1",
  balance: 25000,
  updatedAt: new Date(),
}

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    userId: "user-1",
    amount: 10000,
    type: "topup",
    description: "شارژ کیف پول",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: "tx-2",
    userId: "user-1",
    amount: 7500,
    type: "purchase",
    description: "خرید شماره مجازی اسپاتیفای",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "tx-3",
    userId: "user-1",
    amount: 15000,
    type: "topup",
    description: "شارژ کیف پول",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "tx-4",
    userId: "user-1",
    amount: 8500,
    type: "purchase",
    description: "خرید شماره مجازی واتساپ",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "tx-5",
    userId: "user-1",
    amount: 16000,
    type: "topup",
    description: "شارژ کیف پول",
    createdAt: new Date(), // Today
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get wallet balance
export async function getWalletBalance(): Promise<Wallet> {
  await delay(800) // Simulate API delay
  return { ...mockWallet }
}

// Get wallet transactions
export async function getWalletTransactions(): Promise<Transaction[]> {
  await delay(1000) // Simulate API delay
  return [...mockTransactions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

// Top up wallet
export async function topUpWallet(amount: number): Promise<Wallet> {
  await delay(1200) // Simulate API delay

  // Update mock wallet
  mockWallet.balance += amount
  mockWallet.updatedAt = new Date()

  // Add transaction
  const newTransaction: Transaction = {
    id: `tx-${mockTransactions.length + 1}`,
    userId: "user-1",
    amount,
    type: "topup",
    description: "شارژ کیف پول",
    createdAt: new Date(),
  }

  mockTransactions.push(newTransaction)

  return { ...mockWallet }
}
