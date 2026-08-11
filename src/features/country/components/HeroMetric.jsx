import { TrendingUp } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { formatNumber } from '../utils/format'

// ตัวเลขที่สำคัญที่สุดของหน้า — ใหญ่ เด่น ใช้ font ต่างจาก body เพื่อดึงสายตา
// ก่อนสิ่งอื่นทั้งหมด (idea: hero metric แทน KPI 6 ใบเท่ากัน)
function HeroMetric({ hero }) {
  const shown = useCountUp(hero.value)
  const pct = Math.min((hero.value / hero.target) * 100, 100)

  return (
    <section className="rounded-db border border-db-border bg-db-surface p-6">
      <p className="text-[13px] font-medium text-db-text-muted">{hero.label}</p>

      <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-display text-[56px] leading-none font-bold tracking-tight tabular-nums text-db-text">
          {formatNumber(shown, { decimals: 1 })}
        </span>
        <span className="pb-2 text-lg text-db-text-muted">{hero.unit}</span>

        <span className="mb-2 ml-1 inline-flex items-center gap-1 rounded-full bg-db-green-bg px-2.5 py-1 text-[13px] font-semibold text-db-green">
          <TrendingUp size={14} strokeWidth={2} />+{hero.deltaPct}%
        </span>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-db-border/60">
          <div
            className="h-full rounded-full bg-db-green transition-[width] duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-[12.5px] text-db-text-muted">
          {hero.targetLabel} · {formatNumber(pct, { decimals: 1 })}%
        </p>
      </div>
    </section>
  )
}

export default HeroMetric
