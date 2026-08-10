import { useCallback, useState } from 'react'
import { AuthContext } from './authContext.js'

const KEY = 'riceos_user'

// Mock auth: เก็บ role ที่ล็อกอินไว้ใน localStorage (ยังไม่ต่อ backend)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem(KEY)
      return s ? JSON.parse(s) : null
    } catch {
      return null
    }
  })

  const login = useCallback((role, name) => {
    const u = { role, name: name?.trim() || '' }
    setUser(u)
    localStorage.setItem(KEY, JSON.stringify(u))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
