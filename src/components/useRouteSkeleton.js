import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// แสดง skeleton สั้น ๆ ทุกครั้งที่เปลี่ยนหน้า (รวมเมนูย่อยในแดชบอร์ด)
export function useRouteSkeleton(ms = 450) {
  const { pathname } = useLocation()
  const [state, setState] = useState({ path: pathname, loading: true })

  // path เปลี่ยน -> รีเซ็ตเป็น loading ระหว่าง render (แพทเทิร์น adjust state)
  if (state.path !== pathname) setState({ path: pathname, loading: true })

  useEffect(() => {
    if (!state.loading) return undefined
    const t = setTimeout(() => setState((s) => ({ ...s, loading: false })), ms)
    return () => clearTimeout(t)
  }, [state.loading, state.path, ms])

  return state.loading
}
