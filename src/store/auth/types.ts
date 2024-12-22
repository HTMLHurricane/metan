import { Tokens } from "@/utils/api/auth/types"

export interface IAuthState {
  tokens: Tokens
  isLoggedIn: boolean
  login: (newToken: Tokens) => void
  logout: () => void
}
