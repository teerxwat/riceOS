import { useEffect, useState } from 'react'

// useState ที่จำค่าไว้ใน localStorage — รูปแบบเดียวกับที่ AuthProvider ใช้เก็บ
// user session ไว้ (src/auth/AuthProvider.jsx) เพื่อให้ pattern ตรงกันทั้งแอป
export function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage ไม่พร้อมใช้งาน (private mode ฯลฯ) — ข้ามไปเงียบๆ
    }
  }, [key, value])

  return [value, setValue]
}
