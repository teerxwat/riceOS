import { useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Badge } from '../common/Badge.jsx'

const STATUS_LABEL = {
  available: 'พร้อมขาย',
  reserved: 'จองแล้ว',
  sold: 'ขายแล้ว',
}

const STATUS_TONE = {
  available: 'green',
  reserved: 'amber',
  sold: 'gray',
}

const PAGE_SIZE = 5

export function ListingsTable({ listings }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const pageItems = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="cm-table-card">
      <div className="cm-table-card__head">
        <h3>รายการประกาศขายล่าสุด</h3>
      </div>
      <div className="cm-table-scroll">
        <table className="cm-table">
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>รายละเอียดสินค้า</th>
              <th>ปริมาณ (ตัน)</th>
              <th>คุณภาพ / ความชื้น</th>
              <th>ที่ตั้ง</th>
              <th>ราคา (บาท/ตัน)</th>
              <th>วันที่พร้อมส่ง</th>
              <th>ค่าขนส่ง</th>
              <th>ผู้ขาย</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id}>
                <td className="cm-strong">{item.productName}</td>
                <td>{item.description}</td>
                <td className="cm-right">{item.quantityTon.toFixed(2)}</td>
                <td>
                  <div className="cm-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        fill={i < item.qualityStars ? '#fbbf24' : 'none'}
                        color={
                          i < item.qualityStars
                            ? '#fbbf24'
                            : 'var(--c-border-strong)'
                        }
                      />
                    ))}
                  </div>
                  <p className="cm-quality-note">
                    ความชื้น {item.moisturePercent}% · {item.qualityLabel}
                  </p>
                </td>
                <td>
                  <p style={{ margin: 0 }}>{item.centerName}</p>
                  <p className="cm-location-sub">{item.location}</p>
                </td>
                <td className="cm-right cm-strong">
                  {item.pricePerTon.toLocaleString('th-TH')}
                </td>
                <td>{item.readyDate}</td>
                <td className="cm-right">{item.shippingCostPerTon} บาท/ตัน</td>
                <td>
                  <span className="cm-seller">
                    {item.seller}
                    {item.sellerVerified && (
                      <BadgeCheck size={13} color="var(--c-brand-500)" />
                    )}
                  </span>
                  <span className="cm-seller-badge">ผู้ขายยืนยันแล้ว</span>
                </td>
                <td>
                  <Badge tone={STATUS_TONE[item.status]}>
                    {STATUS_LABEL[item.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cm-pagination">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>แสดง</span>
          <select className="cm-select-sm">
            <option>{PAGE_SIZE}</option>
          </select>
          <span>รายการ</span>
        </div>
        <div className="cm-page-controls">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="cm-page-btn"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              className={`cm-page-btn ${page === i + 1 ? 'is-active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="cm-page-btn"
          >
            <ChevronRight size={14} />
          </button>
        </div>
        <span>
          {listings.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
          {Math.min(page * PAGE_SIZE, listings.length)} จาก{' '}
          {listings.length.toLocaleString('th-TH')} รายการ
        </span>
      </div>
    </div>
  )
}
