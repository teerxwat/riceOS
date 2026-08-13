import { useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { NOTIFICATIONS } from '../data/notifications'
import { usePersistedState } from '../hooks/usePersistedState'
import { useDismissablePanel } from '../hooks/useDismissablePanel'

const DOT_COLOR = {
  critical: 'bg-db-red',
  warning: 'bg-db-amber',
  good: 'bg-db-green',
}

// กระดิ่งแจ้งเตือน + dropdown รายการ — ปิดได้ทั้งกดปุ่มซ้ำ, Escape, หรือคลิกนอกกรอบ
// สถานะอ่านแล้วจำไว้ใน localStorage เลยรอดข้ามการเปลี่ยนหน้า (Header ถูก
// mount ใหม่ทุกครั้งที่เปลี่ยนหน้า เพราะแต่ละหน้ามี DashboardLayout ของตัวเอง)
function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [readIds, setReadIds] = usePersistedState(
    'riceos_country_read_notifications',
    []
  )
  const panelRef = useDismissablePanel(open, () => setOpen(false))

  const unreadCount = NOTIFICATIONS.filter(
    (n) => !readIds.includes(n.id)
  ).length

  function markRead(id) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function markAllRead() {
    setReadIds(NOTIFICATIONS.map((n) => n.id))
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-db-border bg-db-surface text-db-text-muted"
        aria-label={`การแจ้งเตือน${unreadCount > 0 ? ` (ยังไม่อ่าน ${unreadCount} รายการ)` : ''}`}
        aria-expanded={open}
      >
        <Bell size={18} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-db-red px-1 text-caption leading-none font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="ปิดรายการแจ้งเตือน"
            className="fixed inset-0 z-[999] cursor-default"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="การแจ้งเตือน"
            className="absolute top-full right-0 z-[1000] mt-2 w-80 overflow-hidden rounded-db border border-db-border bg-db-surface shadow-db"
          >
            <div className="flex items-center justify-between border-b border-db-border p-3">
              <p className="text-body font-semibold text-db-text">
                การแจ้งเตือน ({NOTIFICATIONS.length})
              </p>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="flex cursor-pointer items-center gap-1 text-caption font-medium text-db-green hover:underline"
                >
                  <CheckCheck size={13} />
                  อ่านทั้งหมด
                </button>
              )}
            </div>

            {NOTIFICATIONS.length === 0 ? (
              <p className="p-6 text-center text-label text-db-text-muted">
                ไม่มีการแจ้งเตือนใหม่
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((n) => {
                  const isRead = readIds.includes(n.id)
                  return (
                    <li
                      key={n.id}
                      className="border-b border-db-border last:border-0"
                    >
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className={`flex w-full min-h-11 cursor-pointer items-start gap-2.5 p-3 text-left hover:bg-db-surface-alt ${
                          isRead ? 'opacity-55' : ''
                        }`}
                      >
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            isRead ? 'bg-db-border' : DOT_COLOR[n.severity]
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-label text-db-text">{n.title}</p>
                          <p className="mt-0.5 text-caption text-db-text-dim">
                            {n.time}
                          </p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationBell
