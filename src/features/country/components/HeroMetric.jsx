import { TrendingUp } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { formatNumber } from '../utils/format'

// ตัวเลขที่สำคัญที่สุดของหน้า — ตั้งใจ "หลุด" กรอบการ์ดที่ใช้ซ้ำทั่วทั้งหน้า
// (แถบสีซ้ายแทนกรอบเต็ม) ให้แตกต่างจาก KpiStrip ข้างๆ ชัดเจน ไม่ใช่การ์ด
// อีกใบที่หน้าตาเหมือนทุกใบ (idea: hero metric แทน KPI 6 ใบเท่ากัน)
function HeroMetric({ hero }) {
  const shown = useCountUp(hero.value)
  const pct = Math.min((hero.value / hero.target) * 100, 100)

  return (
    <section className="border-db-green border-l-4 py-1 pl-5">
      <p className="text-label font-medium text-db-text-muted">{hero.label}</p>

      <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-display text-hero font-bold tracking-tight tabular-nums text-db-text">
          {formatNumber(shown, { decimals: 1 })}
        </span>
        <span className="pb-2 text-lg text-db-text-muted">{hero.unit}</span>

        <span className="mb-2 ml-1 inline-flex items-center gap-1 rounded-full bg-db-green-bg px-2.5 py-1 text-label font-semibold text-db-green">
          <TrendingUp size={14} strokeWidth={2} />+{hero.deltaPct}%
        </span>
      </div>

      <div className="mt-4 max-w-sm">
        <div className="h-2 w-full overflow-hidden rounded-full bg-db-border/60">
          <div
            className="h-full rounded-full bg-db-green transition-[width] duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-label text-db-text-muted">
          {hero.targetLabel} · {formatNumber(pct, { decimals: 1 })}%
        </p>
      </div>
    </section>
  )
}

export default HeroMetric
