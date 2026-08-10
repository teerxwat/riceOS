import { Navigate } from 'react-router-dom'
import { useAuth } from './authContext.js'

// ถ้ายังไม่ล็อกอิน เด้งไปหน้า /login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}
