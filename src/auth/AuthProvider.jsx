import { useCallback, useState } from 'react'
import { AuthContext } from './authContext.js'
import { CREDENTIALS } from '../features/auth/credentials.js'

const KEY = 'riceos_user'

// session เก่าที่ยังไม่มีชื่อจริง/ตำแหน่ง/ขอบเขต -> เติมจากบัญชี mock ให้อัตโนมัติ
function migrate(u) {
  if (!u) return u
  if (u.title && (u.role !== 'technician' || u.scope)) return u
  const c = CREDENTIALS.find((x) => x.role === u.role)
  return c ? { ...u, name: c.displayName, title: c.title, scope: c.scope } : u
}

// Mock auth: เก็บ role ที่ล็อกอินไว้ใน localStorage (ยังไม่ต่อ backend)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem(KEY)
      return migrate(s ? JSON.parse(s) : null)
    } catch {
      return null
    }
  })

  const login = useCallback((role, name, title, scope) => {
    const u = {
      role,
      name: name?.trim() || '',
      title: title || '',
      scope: scope || undefined,
    }
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
