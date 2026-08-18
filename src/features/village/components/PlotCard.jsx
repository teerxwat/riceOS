import { Link } from 'react-router-dom'
import { Sprout, Leaf } from 'lucide-react'
import { formatNumber } from '../utils/format'

const STATUS_TONE = {
  กำลังปลูก: 'text-[var(--green-strong)] bg-[var(--badge-bg)]',
  เก็บเกี่ยวแล้ว: 'text-[var(--muted)] bg-[var(--surface-2)]',
}

// การ์ดแปลงนา ใช้ซ้ำทั้งในตัวอย่างที่หน้าแรกและรายการเต็มที่หน้า "แปลงของฉัน"
// เดิมมีกล่องรูปภาพ placeholder ว่างๆ สูง 96px ไม่มีข้อมูลอะไรอยู่ข้างใน —
// ตัดออก เปลี่ยนเป็นไอคอนเล็กในหัวการ์ดแทน เพื่อให้พื้นที่ทั้งหมดโชว์ข้อมูล
// จริงที่ชาวนาต้องใช้ตัดสินใจ (พันธุ์/พื้นที่/วันเก็บเกี่ยว) แทนพื้นที่ว่างเปล่า
//
// กดทั้งการ์ดได้ ไปหน้ารายละเอียดแปลง (PlotDetailPage)
function PlotCard({ plot }) {
  return (
    <Link
      to={`/village/plots/${plot.id}`}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 active:bg-[var(--surface-2)]"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--badge-bg)] text-[var(--green-strong)]">
          <Sprout size={22} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[16px] font-bold text-[var(--text)]">
              {plot.name}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_TONE[plot.status]}`}
            >
              {plot.status}
            </span>
          </div>
          <p className="mt-0.5 text-[14px] text-[var(--muted)]">
            {plot.variety} · {formatNumber(plot.area, { decimals: 1 })} ไร่
          </p>
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-y-1 text-[13px] text-[var(--muted)]">
        <div>
          <dt className="inline">ปลูก </dt>
          <dd className="inline font-medium text-[var(--text)]">
            {plot.plantedDate}
          </dd>
        </div>
        <div>
          <dt className="inline">คาดเก็บเกี่ยว </dt>
          <dd className="inline font-medium text-[var(--text)]">
            {plot.harvestDate}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center gap-2">
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

      {plot.carbonEnrolled && (
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[var(--green-strong)]">
          <Leaf size={13} strokeWidth={2} />
          นาคาร์บอน · {formatNumber(plot.carbonTco2e, { decimals: 2 })} tCO2e ·{' '}
          {plot.awdStatus}
        </div>
      )}
    </Link>
  )
}

export default PlotCard
