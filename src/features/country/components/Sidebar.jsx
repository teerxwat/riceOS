import {
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
import { NavLink } from 'react-router-dom'

const NAV_SECTIONS = [
  {
    title: 'ภาพรวม',
    items: [
      { label: 'ภาพรวมประเทศ', icon: Home, to: '/country' },
      { label: 'ศูนย์ข้าวทั้งหมด', icon: Building2, to: '/country/centers' },
      { label: 'แผนที่ประเทศ', icon: Map, to: '/country/map' },
      { label: 'ผลการดำเนินงาน', icon: BarChart3, to: '/country/performance' },
    ],
  },
  {
    title: 'วิเคราะห์',
    items: [
      { label: 'คาร์บอนและสิ่งแวดล้อม', icon: Leaf, to: '/country/carbon' },
      { label: 'รายได้เกษตรกร', icon: Wallet, to: '/country/income' },
      { label: 'การลดการเผา', icon: Flame, to: '/country/no-burning' },
      { label: 'แนวโน้มและพยากรณ์', icon: TrendingUp, to: '/country/forecast' },
    ],
  },
  {
    title: 'จัดการ',
    items: [
      { label: 'รายงานผู้บริหาร', icon: FileText, to: '/country/reports' },
      { label: 'ตั้งค่า', icon: Settings, to: '/country/settings' },
    ],
  },
]

function Sidebar() {
  return (
    <aside className="sticky top-[var(--nav-h)] box-border flex h-[calc(100svh-var(--nav-h))] w-[232px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-db-border bg-db-surface-alt p-3.5">
      <nav className="flex flex-col gap-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-1 text-[10.5px] font-semibold tracking-wide text-db-text-dim uppercase">
              {section.title}
            </p>
            {section.items.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/country'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-[13.5px] ${
                    isActive
                      ? 'bg-db-green-bg font-semibold text-db-green'
                      : 'text-db-text-muted hover:bg-db-surface hover:text-db-text'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.75} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
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
