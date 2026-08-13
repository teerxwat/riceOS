import { Bell, ChevronDown, Download } from 'lucide-react'

function Header({ title, subtitle }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-db-border px-7 py-5">
      <div>
        <h1 className="m-0 text-[22px] tracking-normal text-db-text">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px] text-db-text-muted">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-lg border border-db-border bg-db-surface px-3 py-[7px] text-[12.5px] text-db-text-muted">
          23 พฤษภาคม 2567
        </span>
        <span className="rounded-lg border border-db-border bg-db-surface px-3 py-[7px] text-[12.5px] text-db-text-muted">
          09:45 น.
        </span>

        <button
          type="button"
          className="relative inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-db-border bg-db-surface text-db-text-muted"
          aria-label="การแจ้งเตือน"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-db-red px-1 text-[10px] font-bold text-white">
            12
          </span>
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-db-border bg-db-surface py-1.5 pr-2.5 pl-1.5 font-[inherit] text-db-text"
        >
          <img
            className="h-[26px] w-[26px] rounded-full object-cover"
            src="https://i.pravatar.cc/64?img=12"
            alt=""
          />
          <span className="flex flex-col text-left leading-[1.25]">
            <span className="text-[12.5px] font-medium">สมชาย ใจดี</span>
            <span className="text-[11px] text-db-text-muted">
              อธิบดีกรมการข้าว
            </span>
          </span>
          <ChevronDown size={16} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-db-green px-3.5 py-[9px] font-[inherit] text-[13px] font-semibold text-[#06240f]"
        >
          <Download size={16} strokeWidth={1.75} />
          สร้างรายงานผู้บริหาร
        </button>
      </div>
    </header>
  )
}

export default Header
