import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Wheat } from 'lucide-react'

// หน้าโหลดคั่นเมื่อสลับ "โซนหลัก" ของแอป (เช่น home -> จังหวัด -> ช่าง)
// การคลิกเมนูย่อยภายในโซนเดียวกัน (path ขึ้นต้นเหมือนเดิม) จะไม่ขึ้นหน้านี้
function sectionOf(pathname) {
  const p = pathname.split('/').filter(Boolean)
  if (p[0] === 'app' && p[1] === 'center') return 'center'
  return p[0] ?? 'home'
}

export default function RouteLoader() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const prev = useRef(sectionOf(pathname))

  useEffect(() => {
    const sec = sectionOf(pathname)
    if (sec === prev.current) return undefined
    prev.current = sec
    setShow(true)
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [pathname])

  if (!show) return null
  return (
    <div className="route-loader" role="status" aria-label="กำลังโหลดหน้า">
      <img
        src="/logo.png"
        alt=""
        className="route-loader-logo"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'grid'
        }}
      />
      <div className="route-loader-mark" style={{ display: 'none' }}>
        <Wheat size={28} strokeWidth={2.1} />
      </div>
      <div className="route-loader-bar">
        <span />
      </div>
      <p>กำลังโหลด…</p>
    </div>
  )
}
