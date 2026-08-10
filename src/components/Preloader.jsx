import { useEffect, useState } from 'react'
import { Wheat } from 'lucide-react'
import './Preloader.css'

// หน้าโหลดก่อนเข้าเว็บจริง แสดงครั้งเดียวตอนเปิดหน้าเว็บ
export default function Preloader() {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // แสดงอย่างน้อย ~1.9s หรือจนหน้าโหลดเสร็จ (อันไหนช้ากว่า)
    let loaded = false
    let minPassed = false
    const finish = () => {
      if (loaded && minPassed) setDone(true)
    }
    const onLoad = () => {
      loaded = true
      finish()
    }
    if (document.readyState === 'complete') loaded = true
    else window.addEventListener('load', onLoad)

    const t = setTimeout(() => {
      minPassed = true
      finish()
    }, 1900)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setHidden(true), 750) // รอ fade จบ
    return () => clearTimeout(t)
  }, [done])

  if (hidden) return null

  return (
    <div className={`preloader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="pre-orb" />
      <div className="pre-logo">
        <Wheat size={54} strokeWidth={1.6} />
      </div>
      <div className="pre-title">riceOS</div>
      <div className="pre-bar">
        <span />
      </div>
      <div className="pre-sub">กำลังเตรียมทุ่งนาให้คุณ…</div>
    </div>
  )
}
