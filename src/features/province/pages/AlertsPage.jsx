// เจ้าของไฟล์: คนที่ 2 (feature province)
// การแจ้งเตือน: กรองตามระดับ + ทำเครื่องหมายว่าอ่านแล้ว (state แชร์จาก layout)
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { OctagonAlert, TriangleAlert, Info, CheckCheck } from 'lucide-react'

const SEVERITY = {
  critical: { label: 'วิกฤต', Icon: OctagonAlert, cls: 'critical' },
  warning: { label: 'เฝ้าระวัง', Icon: TriangleAlert, cls: 'warning' },
  info: { label: 'ทั่วไป', Icon: Info, cls: 'info' },
}

export default function AlertsPage() {
  const { alerts, setAlerts } = useOutletContext()
  const [filter, setFilter] = useState('all')

  const rows = alerts.filter((a) => filter === 'all' || a.severity === filter)
  const unread = alerts.filter((a) => !a.read).length

  const markRead = (id, read = true) =>
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, read } : a)))

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>การแจ้งเตือน (ยังไม่อ่าน {unread})</h2>
          <button
            type="button"
            className="pv-btn pv-btn--sm"
            disabled={unread === 0}
            onClick={() =>
              setAlerts((list) => list.map((a) => ({ ...a, read: true })))
            }
          >
            <CheckCheck size={14} /> อ่านทั้งหมด
          </button>
        </div>

        <div className="pv-filter-chips">
          <button
            type="button"
            className={`pv-filter-chip${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ทั้งหมด ({alerts.length})
          </button>
          {Object.entries(SEVERITY).map(([key, s]) => (
            <button
              key={key}
              type="button"
              className={`pv-filter-chip${filter === key ? ' active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {s.label} ({alerts.filter((a) => a.severity === key).length})
            </button>
          ))}
        </div>

        <ul className="pv-alert-list">
          {rows.map((a) => {
            const s = SEVERITY[a.severity]
            return (
              <li
                key={a.id}
                className={`pv-alert pv-alert--${s.cls}${a.read ? ' read' : ''}`}
              >
                <s.Icon size={20} className="pv-alert-icon" />
                <div className="pv-alert-body">
                  <b>{a.title}</b>
                  <p>{a.detail}</p>
                  <span className="pv-muted">
                    {a.time} · พื้นที่: {a.district}
                  </span>
                </div>
                <button
                  type="button"
                  className="pv-btn pv-btn--sm"
                  onClick={() => markRead(a.id, !a.read)}
                >
                  {a.read ? 'ทำเป็นยังไม่อ่าน' : 'อ่านแล้ว'}
                </button>
              </li>
            )
          })}
          {rows.length === 0 && (
            <li className="pv-empty">ไม่มีการแจ้งเตือนในหมวดนี้</li>
          )}
        </ul>
      </section>
    </div>
  )
}
