import { useParams, Link } from 'react-router-dom'
import { Sprout, Sparkles, CalendarDays, Ruler } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS } from '../data/villageData'
import { formatNumber } from '../utils/format'

const STATUS_TONE = {
  กำลังปลูก: 'text-[var(--green-strong)] bg-[var(--badge-bg)]',
  เก็บเกี่ยวแล้ว: 'text-[var(--muted)] bg-[var(--surface-2)]',
}

function PlotDetailPage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)

  if (!plot) {
    return (
      <VillageLayout title="ไม่พบแปลงนา" backTo="/village/plots">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ไม่พบข้อมูลแปลงนี้ อาจถูกลบไปแล้ว
        </p>
      </VillageLayout>
    )
  }

  return (
    <VillageLayout title={plot.name} backTo="/village/plots">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--badge-bg)] text-[var(--green-strong)]">
              <Sprout size={24} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[17px] font-bold text-[var(--text)]">
                  {plot.name}
                </p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_TONE[plot.status]}`}
                >
                  {plot.status}
                </span>
              </div>
              <p className="mt-0.5 text-[14px] text-[var(--muted)]">
                {plot.variety}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div
                className="h-full rounded-full bg-[var(--green-strong)]"
                style={{ width: `${plot.progressPct}%` }}
              />
            </div>
            <span className="text-[12px] font-semibold text-[var(--green-strong)] tabular-nums">
              {plot.progressPct}%
            </span>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <ul>
            <li className="flex min-h-16 items-center gap-3 border-b border-[var(--border)] px-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                <Ruler size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-[var(--muted)]">
                  พื้นที่
                </span>
                <span className="block text-[14.5px] font-medium text-[var(--text)]">
                  {formatNumber(plot.area, { decimals: 1 })} ไร่
                </span>
              </span>
            </li>
            <li className="flex min-h-16 items-center gap-3 border-b border-[var(--border)] px-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                <CalendarDays size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-[var(--muted)]">
                  วันปลูก
                </span>
                <span className="block text-[14.5px] font-medium text-[var(--text)]">
                  {plot.plantedDate}
                </span>
              </span>
            </li>
            <li className="flex min-h-16 items-center gap-3 px-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                <CalendarDays size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-[var(--muted)]">
                  คาดเก็บเกี่ยว
                </span>
                <span className="block text-[14.5px] font-medium text-[var(--text)]">
                  {plot.harvestDate}
                </span>
              </span>
            </li>
          </ul>
        </section>

        <Link
          to="/village/ai"
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
        >
          <Sparkles size={18} strokeWidth={1.8} />
          คุยกับ AI เกี่ยวกับแปลงนี้
        </Link>
      </div>
    </VillageLayout>
  )
}

export default PlotDetailPage
