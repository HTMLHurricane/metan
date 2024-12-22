import { create } from 'zustand'
import { TOKEN } from '@/utils/config/token'
import { IAuthState } from './types'
import { Tokens } from '@/utils/api/auth/types'

const useAuthStore = create<IAuthState>((set) => ({
  tokens: {
    access: TOKEN.getAccessToken() || '',
    refresh: TOKEN.getRefreshToken() || '',
  },
  isLoggedIn: !!TOKEN.getAccessToken(),

  login: (newToken: Tokens) => {
    TOKEN.setAccessToken(newToken.access)
    TOKEN.setRefreshToken(newToken.refresh)
    set({ tokens: newToken, isLoggedIn: true })
  },

  logout: () => {
    TOKEN.removeAccessToken()
    set({ tokens: { access: '', refresh: '' }, isLoggedIn: false })
  },
}))

export default useAuthStore
