import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// รวม a11y พื้นฐานของ panel/dialog แบบลอย (AI Assistant, Notification dropdown)
// ไว้ที่เดียว: Escape ปิดได้, focus ย้ายเข้า panel ตอนเปิด, วน Tab อยู่ใน panel
// (focus trap), คืน focus กลับปุ่มเดิมตอนปิด — ใช้ซ้ำได้ทุกที่ที่มี panel แบบนี้
export function useDismissablePanel(open, onClose) {
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    triggerRef.current = document.activeElement

    const panel = panelRef.current
    const focusable = panel
      ? Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR))
      : []
    focusable[0]?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [open, onClose])

  return panelRef
}
