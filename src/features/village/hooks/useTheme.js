import { useEffect, useState } from 'react'

function getInitialTheme() {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

// สลับ light/dark เอง — ทำ logic เดียวกับ Navbar.jsx (dark เป็นค่าเริ่มต้น,
// เก็บ localStorage key 'theme' เดียวกัน) แต่แยกไฟล์ของตัวเอง เพราะหน้า
// village ซ่อน Navbar กลางไว้ (ดู Layout.jsx) เลยต้องมีจุดสลับธีมเป็นของตัวเอง
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return [theme, toggleTheme]
}
