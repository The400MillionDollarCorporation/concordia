/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand'

export interface MiscTypes {
  avifSupport: boolean
  setAvifSupport: (avifSupport: boolean) => void

  triggerTransition: string
  setTriggerTransition: (triggerTransition: string) => void

  preloaded: boolean
  setPreloaded: (preloaded: boolean) => void
  preloadDuration: number
  setPreloadDuration: (preloadDuration: number) => void
}

export const createMiscSlice: StateCreator<MiscTypes> = (set) => ({
  avifSupport: true,
  setAvifSupport: (value: boolean) => set({ avifSupport: value }),

  triggerTransition: '',
  setTriggerTransition: (triggerTransition: string) =>
    set({ triggerTransition }),

  preloaded: false,
  setPreloaded: (preloaded: boolean) => set({ preloaded }),
  preloadDuration: 2.6,
  setPreloadDuration: (preloadDuration: number) => set({ preloadDuration }),
})
