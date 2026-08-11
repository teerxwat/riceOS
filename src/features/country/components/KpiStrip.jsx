import { ArrowUpRight } from 'lucide-react'
import { formatNumber } from '../utils/format'

// แถบสถิติรอง — ตั้งใจให้เล็กและแน่นกว่า hero metric ชัดเจน
// (idea: สร้างลำดับความสำคัญ ไม่ใช่การ์ดขนาดเท่ากันหมด)
function KpiStrip({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.key}
          className="rounded-db border border-db-border bg-db-surface p-3.5"
        >
          <p className="text-label text-db-text-muted">{item.label}</p>
          <p className="font-display mt-1 text-stat font-semibold tabular-nums text-db-text">
            {formatNumber(item.value, {
              decimals: item.value % 1 !== 0 ? 1 : 0,
            })}
            <span className="ml-1 text-label font-normal text-db-text-muted">
              {item.unit}
            </span>
          </p>
          {item.sub && (
            <p
              className={`mt-1 flex items-center gap-1 text-caption ${
                item.trend === 'up' ? 'text-db-green' : 'text-db-text-dim'
              }`}
            >
              {item.trend === 'up' && <ArrowUpRight size={12} />}
              {item.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default KpiStrip
