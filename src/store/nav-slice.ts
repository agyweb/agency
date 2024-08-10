import { create } from 'zustand'

type NavState = {
  isOpen: boolean
  toggle: () => void
}

export const useNav = create<NavState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))