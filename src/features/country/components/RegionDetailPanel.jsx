import { formatNumber } from '../utils/format'

const STATUS_TEXT = { ok: 'ปกติ', watch: 'เฝ้าระวัง', risk: 'วิกฤต' }
const STATUS_COLOR = {
  ok: 'text-db-green bg-db-green-bg',
  watch: 'text-db-amber bg-db-amber-bg',
  risk: 'text-db-red bg-db-red-bg',
}

const STAT_ROWS = [
  { key: 'centers', label: 'ศูนย์ข้าว', unit: 'แห่ง' },
  { key: 'production', label: 'ผลผลิต', unit: 'พันตัน', decimals: 1 },
  { key: 'area', label: 'พื้นที่ทำคาร์บอนต่ำ', unit: 'ไร่' },
  { key: 'income', label: 'รายได้เกษตรกร', unit: 'ล้านบาท', decimals: 1 },
  {
    key: 'awdAdoptionPct',
    label: 'สัดส่วนพื้นที่ทำ AWD',
    unit: '%',
    decimals: 1,
  },
]

// เปลี่ยนเนื้อหาตามภาคที่เลือกบน RegionMap — ผูกแผนที่กับตัวเลขไว้ด้วยกัน
// แทนที่จะเป็น 2 widget แยกที่ต้องกวาดตาไปมาเอง (idea: เชื่อมแผนที่+ตาราง)
function RegionDetailPanel({ region, isWholeCountry }) {
  return (
    <section className="rounded-db border border-db-border bg-db-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-heading font-bold text-db-text">
          {isWholeCountry ? 'ภาพรวมทั้งประเทศ' : `ภาค${region.name}`}
        </h2>
        {!isWholeCountry && (
          <span
            className={`rounded-full px-2.5 py-1 text-label font-semibold ${STATUS_COLOR[region.status]}`}
          >
            {STATUS_TEXT[region.status]}
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {STAT_ROWS.map((row) => (
          <div key={row.key}>
            <dt className="text-label text-db-text-muted">{row.label}</dt>
            <dd className="font-display mt-0.5 text-stat font-semibold tabular-nums text-db-text">
              {formatNumber(
                row.key === 'production'
                  ? region[row.key] * 1
                  : region[row.key],
                { decimals: row.decimals ?? 0 }
              )}
              <span className="ml-1 text-caption font-normal text-db-text-muted">
                {row.unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {!isWholeCountry && (
        <p className="mt-4 text-label text-db-text-dim">
          กดปุ่ม "ทั้งประเทศ" เหนือแผนที่ หรือ "← ดูทั้งประเทศ" บนแผนที่
          เพื่อกลับไปดูภาพรวม
        </p>
      )}
    </section>
  )
}

export default RegionDetailPanel
