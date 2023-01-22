import { create } from 'zustand'

export const useBearStore = create((set) => ({
    data: 0,
    setEvent: (data) => set(() => ({ data }))
}))