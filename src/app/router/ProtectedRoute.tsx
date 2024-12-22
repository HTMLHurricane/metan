import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import useAuthStore from '@/store/auth/slice'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
