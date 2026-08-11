import { Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext.js'

// Gate for the center-role dashboard: not logged in -> /login,
// logged in but a different role -> their own role page.
export default function RequireCenterRole({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'center') return <Navigate to="/app" replace />
  return children
}
