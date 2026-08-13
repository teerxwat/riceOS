import { useEffect, useState } from 'react'

function readTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

// ปุ่มสลับ light/dark อยู่ใน Navbar กลาง (src/components/Navbar.jsx) ที่ตั้ง
// document.documentElement.dataset.theme ไว้ตรงๆ — ไฟล์นี้แค่ "ฟัง" ค่านั้น
// ผ่าน MutationObserver เพื่อให้ component ในนี้ปรับตามได้ (เช่น เลือก tile
// แผนที่ให้เข้ากับธีม) โดยไม่ต้องส่ง prop จาก Navbar ข้ามมาให้
export function useColorScheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return theme
}
