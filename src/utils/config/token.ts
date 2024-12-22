export const ACCESS_TOKEN_NAME = 'access_token'
export const REFRESH_TOKEN_NAME = 'refresh_token'

export function setToken(tokenName: string, tokenValue: string) {
  localStorage.setItem(tokenName, tokenValue)
}
export function getToken(tokenName: string) {
  const result = localStorage.getItem(tokenName)
  return result
}
export function deleteToken(tokenName: string) {
  window.localStorage.removeItem(tokenName)
  return true
}

export const TOKEN = {
  getAccessToken: () => getToken(ACCESS_TOKEN_NAME),
  setAccessToken: (token: string) => setToken(ACCESS_TOKEN_NAME, token),
  removeAccessToken: () => deleteToken(ACCESS_TOKEN_NAME),
  getRefreshToken: () => getToken(REFRESH_TOKEN_NAME),
  setRefreshToken: (token: string) => setToken(REFRESH_TOKEN_NAME, token),
  removeRefreshToken: () => deleteToken(REFRESH_TOKEN_NAME),
}
