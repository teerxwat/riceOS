import { createContext, useContext } from 'react'

// context เก็บผู้ใช้ที่ล็อกอินอยู่ (mock — ไม่มี backend)
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}
