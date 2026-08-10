import {
  Wheat,
  Home,
  Building2,
  Map,
  BarChart3,
  Leaf,
  Wallet,
  Flame,
  TrendingUp,
  FileText,
  Settings,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'ภาพรวมประเทศ', icon: Home },
  { label: 'ศูนย์ข้าวทั้งหมด', icon: Building2 },
  { label: 'แผนที่ประเทศ', icon: Map },
  { label: 'ผลการดำเนินงาน', icon: BarChart3 },
  { label: 'คาร์บอนและสิ่งแวดล้อม', icon: Leaf },
  { label: 'รายได้เกษตรกร', icon: Wallet },
  { label: 'การลดการเผา', icon: Flame },
  { label: 'แนวโน้มและพยากรณ์', icon: TrendingUp },
  { label: 'รายงานผู้บริหาร', icon: FileText },
  { label: 'ตั้งค่า', icon: Settings },
]

function Sidebar({ activeLabel = 'ภาพรวมประเทศ' }) {
  return (
    <aside className="sticky top-0 box-border flex h-svh w-[232px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-db-border bg-db-surface-alt p-3.5">
      <div className="flex items-center gap-2.5 px-2 text-db-green">
        <Wheat size={22} strokeWidth={1.75} />
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-bold text-db-text">DONAUS</span>
          <span className="text-xs text-db-text-muted">RiceOS</span>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = label === activeLabel
          return (
            <button
              key={label}
              type="button"
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-left font-[inherit] text-[13.5px] ${
                isActive
                  ? 'bg-db-green-bg font-semibold text-db-green'
                  : 'text-db-text-muted hover:bg-db-surface hover:text-db-text'
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2.5">
        <button
          type="button"
          className="relative flex cursor-pointer flex-col items-start gap-0.5 rounded-db border border-db-border bg-db-surface p-3 text-left font-[inherit] text-db-text"
        >
          <span className="text-[13px] font-semibold">AI Assistant</span>
          <span className="text-[11.5px] text-db-text-muted">
            ผู้ช่วยผู้บริหาร ถามได้ทุกเรื่อง
          </span>
          <ChevronRight
            className="absolute top-3 right-3 text-db-text-dim"
            size={16}
            strokeWidth={1.75}
          />
        </button>

        <div className="flex items-center gap-2.5 rounded-db p-2">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://i.pravatar.cc/64?img=12"
            alt=""
          />
          <div className="flex min-w-0 flex-col leading-[1.3]">
            <span className="text-[13px] font-medium text-db-text">
              สมชาย ใจดี
            </span>
            <span className="text-[11.5px] text-db-text-muted">
              อธิบดีกรมการข้าว
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
