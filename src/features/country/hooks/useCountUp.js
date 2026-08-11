import { useEffect, useRef, useState } from 'react'

// นับตัวเลขไต่ขึ้นจาก 0 ถึง value ตอน mount — ให้ความรู้สึกข้อมูล real-time
// แทนที่จะโผล่ตัวเลขนิ่งๆ ทันที (respect prefers-reduced-motion)
export function useCountUp(value, { duration = 900 } = {}) {
  const [prefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [display, setDisplay] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    if (prefersReduced) return

    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      setDisplay(value * eased)
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [value, duration, prefersReduced])

  return prefersReduced ? value : display
}
