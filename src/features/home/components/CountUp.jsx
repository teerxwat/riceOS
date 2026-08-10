import { useEffect, useRef, useState } from 'react'

// นับเลขวิ่งเมื่อเลื่อนมาถึง
export default function CountUp({ to, suffix = '', duration = 1500 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const step = (now) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setN(Math.round(to * eased))
              if (t < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
