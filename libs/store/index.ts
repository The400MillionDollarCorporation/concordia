import { create } from 'zustand'

import { MiscTypes, createMiscSlice } from './MiscSlice'

export const useStore = create<MiscTypes>()((...a) => ({
  ...createMiscSlice(...a),
}))
