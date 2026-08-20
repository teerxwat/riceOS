import { ClipboardCheck, Microscope, Scale, ShoppingBag } from 'lucide-react'
import { Card } from '../common/Card.jsx'

const QUEUE_ITEMS = (queue) => [
  { label: 'รับซื้อข้าว', value: queue.receiving, icon: ShoppingBag },
  { label: 'อบข้าว', value: queue.drying, icon: ClipboardCheck },
  { label: 'ชั่งน้ำหนัก', value: queue.weighing, icon: Scale },
  { label: 'ตรวจคุณภาพ', value: queue.quality, icon: Microscope },
]

export function ServiceQueuePanel({ queue, currentlyServing }) {
  return (
    <Card
      title="คิวบริการวันนี้"
      titleAction={
        <span className="c-card__header-action">อัปเดต {queue.updatedAt}</span>
      }
    >
      <div
        className="c-grid"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        {QUEUE_ITEMS(queue).map(({ label, value, icon: Icon }) => (
          <div key={label} className="cd-queue-item">
            <Icon size={18} color="var(--c-brand-400)" />
            <span className="cd-queue-item__value">{value}</span>
            <span className="cd-queue-item__label">{label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p className="cd-serving-label">
          กำลังให้บริการ ({currentlyServing.length} คิว)
        </p>
        <div className="cd-serving-list">
          {currentlyServing.map((item, i) => (
            <div key={i} className="cd-serving-item">
              <span className="cd-serving-item__who">
                {item.type} · {item.name}
              </span>
              <span className="cd-serving-item__no">
                คิวที่ {item.queueNo}
                {item.extra ? ` (${item.extra})` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
