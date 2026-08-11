import { useEffect, useState } from 'react'
import { Download, Menu } from 'lucide-react'
import NotificationBell from './NotificationBell'
import { formatThaiDate, formatThaiTime } from '../utils/thaiDate'
import { downloadCsv } from '../utils/exportCsv'
import { HERO, KPI_STRIP } from '../data/dashboardData'

// ไม่มีรูปโปรไฟล์/ออกจากระบบซ้ำในนี้ — Navbar กลาง (src/components/Navbar.jsx)
// ที่ครอบทุกหน้าไว้แสดง role badge + ปุ่มออกจากระบบอยู่แล้วด้านบนสุด
function Header({ title, subtitle, onOpenSidebar }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  function handleExport() {
    const rows = [
      { label: HERO.label, value: `${HERO.value} ${HERO.unit}` },
      ...KPI_STRIP.map((k) => ({
        label: k.label,
        value: `${k.value} ${k.unit}`,
      })),
    ]
    downloadCsv(
      `rayngan-phu-borihan-${now.toISOString().slice(0, 10)}.csv`,
      rows
    )
  }

  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-db-border px-4 py-5 sm:px-7">
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="เปิดเมนู"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-db-text-muted hover:text-db-text lg:hidden"
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>
        <div>
          <h1 className="m-0 text-stat-lg tracking-normal text-db-text">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-label text-db-text-muted">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-lg border border-db-border bg-db-surface px-3 py-[7px] text-label text-db-text-muted">
          {formatThaiDate(now)}
        </span>
        <span className="rounded-lg border border-db-border bg-db-surface px-3 py-[7px] text-label text-db-text-muted">
          {formatThaiTime(now)}
        </span>

        <NotificationBell />

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg bg-db-green px-3.5 font-[inherit] text-body font-semibold text-white"
        >
          <Download size={16} strokeWidth={1.75} />
          สร้างรายงานผู้บริหาร
        </button>
      </div>
    </header>
  )
}

export default Header
