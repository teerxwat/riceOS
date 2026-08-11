import { BadgeCheck, Newspaper, TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from '../common/Card.jsx'

export function MatchingSidebar({
  matching,
  centralPrices,
  news,
  pricesUpdatedAt,
}) {
  return (
    <div className="cm-sidebar">
      <Card title="จับคู่ความต้องการ (Matching)">
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '0.75rem',
            color: 'var(--c-text-muted)',
          }}
        >
          คำสั่งซื้อที่แนะนำสำหรับคุณ
        </p>
        <div className="c-flex-col" style={{ gap: '0.5rem' }}>
          {matching.map((m) => (
            <div key={m.id} className="cm-match-item">
              <div className="cm-match-item__row">
                <div>
                  <p className="cm-match-item__name">
                    {m.productName}
                    {m.verified && (
                      <BadgeCheck size={12} color="var(--c-brand-500)" />
                    )}
                  </p>
                  <p className="cm-match-item__meta">
                    ต้องการ {m.quantityTon} ตัน · {m.location}
                  </p>
                </div>
                <span className="cm-match-pct">{m.matchPercent}% Match</span>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="cm-link-btn">
          ดูทั้งหมด
        </button>
      </Card>

      <Card
        title="ประกาศราคากลางวันนี้ (บาท/ตัน)"
        titleAction={
          <span className="c-card__header-action">
            อัปเดต {pricesUpdatedAt}
          </span>
        }
      >
        <div>
          {centralPrices.map((p) => (
            <div key={p.product} className="cm-price-row">
              <span>{p.product}</span>
              <span className="cm-price-value">
                {p.pricePerTon.toLocaleString('th-TH')}
                <span
                  className={`cm-price-delta ${p.changePercent >= 0 ? 'cm-price-delta--up' : 'cm-price-delta--down'}`}
                >
                  {p.changePercent >= 0 ? (
                    <TrendingUp size={11} />
                  ) : (
                    <TrendingDown size={11} />
                  )}
                  {Math.abs(p.changePercent)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title={
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Newspaper size={14} /> ข่าวสารตลาด
          </span>
        }
      >
        <div>
          {news.map((n, i) => (
            <div key={i} className="cm-news-item">
              <p>{n.text}</p>
              <p>{n.date}</p>
            </div>
          ))}
        </div>
        <button type="button" className="cm-link-btn">
          ดูทั้งหมด
        </button>
      </Card>
    </div>
  )
}
