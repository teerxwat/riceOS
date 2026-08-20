import { Megaphone, Phone } from 'lucide-react'
import { Card } from '../common/Card.jsx'

export function BottomInfoRow({ ricePrices, announcement, contact }) {
  return (
    <div className="c-grid c-grid-1 c-grid-lg-3">
      <Card title="ราคาข้าววันนี้ (บาท/ตัน)">
        <div className="c-grid c-grid-2">
          {ricePrices.map((p) => (
            <div key={p.product} className="cd-price-item">
              <p className="cd-price-item__label">{p.product}</p>
              <p className="cd-price-item__value">
                {p.pricePerTon.toLocaleString('th-TH')}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title={
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Megaphone size={15} color="var(--c-brand-400)" />
            ประกาศจากส่วนกลาง
          </span>
        }
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--c-text)',
          }}
        >
          {announcement.title}
        </p>
        <p
          style={{
            margin: '0.25rem 0 0',
            fontSize: '0.75rem',
            color: 'var(--c-text-muted)',
          }}
        >
          {announcement.body}
        </p>
      </Card>

      <Card
        title={
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Phone size={15} color="var(--c-brand-400)" />
            ติดต่อศูนย์
          </span>
        }
      >
        <p
          style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--c-text)',
          }}
        >
          {contact.phone}
        </p>
        <p
          style={{
            margin: '0.25rem 0 0',
            fontSize: '0.75rem',
            color: 'var(--c-text-muted)',
          }}
        >
          {contact.hours}
        </p>
      </Card>
    </div>
  )
}
