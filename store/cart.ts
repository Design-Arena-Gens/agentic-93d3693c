"use client"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = { id: string; name: string; price: number; image: string; quantity: number }

type State = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

export const useCart = create<State>()(persist((set, get) => ({
  items: [],
  add: (item, qty=1) => {
    const existing = get().items.find(i => i.id === item.id)
    if (existing) {
      set({ items: get().items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i) })
    } else {
      set({ items: [...get().items, { ...item, quantity: qty }] })
    }
  },
  remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  setQty: (id, qty) => set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) }),
  clear: () => set({ items: [] })
}), { name: 'freshcart-cart' }))
