import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS } from '../data/villageData'

// สีตามสถานะ AWD — เขียว=เหมาะสม, ฟ้า=เปิดน้ำ, แดง=เสี่ยง/ผิดปกติ, เทา=ยัง
// ไม่เข้าร่วมโครงการคาร์บอน (ไม่มีสถานะ AWD ให้แสดง)
const DOT_COLOR = {
  เหมาะสม: 'bg-[var(--green-strong)]',
  เปิดน้ำ: 'bg-[#3b82f6]',
  'เสี่ยง/ผิดปกติ': 'bg-[#e5484d]',
}

const LEGEND = [
  { label: 'เหมาะสม', color: 'bg-[var(--green-strong)]' },
  { label: 'เปิดน้ำ', color: 'bg-[#3b82f6]' },
  { label: 'เสี่ยง/ผิดปกติ', color: 'bg-[#e5484d]' },
  { label: 'ยังไม่เข้าร่วม', color: 'bg-[var(--muted)]' },
]

// แผนที่แปลงนาแบบย่อ (ไม่ใช่แผนที่จริงจาก Google Map/ดาวเทียมเหมือน mockup
// ต้นแบบ เพราะไม่มีพิกัด GPS จริงให้ผูกในสาธิตนี้) — ใช้กล่องสัดส่วนคงที่ +
// ตำแหน่ง mapPos (%) ของแต่ละแปลงแทน ให้พอเห็นภาพรวมและสถานะ AWD ของทุกแปลง
// ในหน้าเดียว กดจุดไหนไปหน้ารายละเอียดแปลงนั้นได้เลย
function FarmMapPage() {
  return (
    <VillageLayout title="แผนที่แปลงนา" backTo="/village/plots">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--badge-bg),var(--surface-2))]">
        {PLOTS.map((plot) => (
          <Link
            key={plot.id}
            to={`/village/plots/${plot.id}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${plot.mapPos.x}%`, top: `${plot.mapPos.y}%` }}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-md active:scale-95 ${
                plot.carbonEnrolled
                  ? DOT_COLOR[plot.awdStatus]
                  : 'bg-[var(--muted)]'
              }`}
            >
              <Sprout size={16} strokeWidth={2} />
            </span>
            <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-[var(--text)] shadow">
              {plot.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {LEGEND.map((l) => (
          <div
            key={l.label}
            className="flex items-center gap-1.5 text-[12.5px] text-[var(--muted)]"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {PLOTS.map((plot) => (
          <li key={plot.id}>
            <Link
              to={`/village/plots/${plot.id}`}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 active:bg-[var(--surface-2)]"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  plot.carbonEnrolled
                    ? DOT_COLOR[plot.awdStatus]
                    : 'bg-[var(--muted)]'
                }`}
              />
              <span className="min-w-0 flex-1 truncate text-[14px] text-[var(--text)]">
                {plot.name}
              </span>
              <span className="shrink-0 text-[12.5px] text-[var(--muted)]">
                {plot.carbonEnrolled ? plot.awdStatus : 'ยังไม่เข้าร่วม'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </VillageLayout>
  )
}

export default FarmMapPage
