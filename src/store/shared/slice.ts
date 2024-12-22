import { create } from 'zustand'
import { ISharedStore } from './types'

const useSharedStore = create<ISharedStore>(() => ({}))

export default useSharedStore
