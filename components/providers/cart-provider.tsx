"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { VirtualNumber } from "@/types/number"

type CartItem = {
  number: VirtualNumber
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (number: VirtualNumber) => void
  removeItem: (numberId: string) => void
  clearCart: () => void
  getItemsCount: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (number: VirtualNumber) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.number.id === number.id)
      if (existingItem) {
        return prevItems.map((item) => (item.number.id === number.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { number, quantity: 1 }]
    })
  }

  const removeItem = (numberId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.number.id !== numberId))
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.number.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        getItemsCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
