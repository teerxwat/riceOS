import { useEffect, useState } from 'react'
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
  Moon,
  Sun,
  LogOut,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/authContext.js'
import { getRole } from '../../roles/roles.js'

// dark เป็นโหมดหลัก (เหมือน Navbar กลาง) — ที่นี่ต้องมีสวิตช์ของตัวเองเพราะ
// Navbar กลางถูกซ่อนไว้แล้วสำหรับ /country (ดู Layout.jsx)
function getInitialTheme() {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

// จัดกลุ่มเมนู 10 รายการเป็น 3 หมวด แทน flat list ยาวๆ ให้กวาดตาหาง่ายขึ้น
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

// < lg (1024px): ซ่อนเป็น off-canvas drawer เลื่อนเข้า/ออกด้วย `open`
// ≥ lg: อยู่ตำแหน่งเดิมเสมอ (translate-x-0 บังคับ, ไม่สนใจ open)
function Sidebar({ open, onClose, onOpenAssistant }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const role = user ? getRole(user.role) : null

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      {open && (
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิดเมนู"
          className="fixed inset-0 z-[1198] cursor-default bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-[1199] box-border flex h-svh w-[260px] flex-col gap-5 overflow-y-auto border-r border-db-border bg-db-surface-alt p-3.5 transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:z-auto lg:w-[232px] lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิดเมนู"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center self-end rounded-lg text-db-text-muted hover:text-db-text lg:hidden"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        <nav className="flex flex-col gap-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-0.5">
              <p className="px-2.5 pb-1 text-caption font-semibold tracking-wide text-db-text-dim uppercase">
                {section.title}
              </p>
              {section.items.map(({ label, icon: Icon, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={to === '/country'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center gap-2.5 rounded-lg px-2.5 text-body ${
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
            onClick={onOpenAssistant}
            className="relative flex min-h-11 cursor-pointer flex-col items-start justify-center gap-0.5 rounded-db border border-db-border bg-db-surface p-3 text-left font-[inherit] text-db-text"
          >
            <span className="text-body font-semibold">AI Assistant</span>
            <span className="text-label text-db-text-muted">
              ผู้ช่วยผู้บริหาร ถามได้ทุกเรื่อง
            </span>
            <ChevronRight
              className="absolute top-3 right-3 text-db-text-dim"
              size={16}
              strokeWidth={1.75}
            />
          </button>

          {/* ออกจากระบบ/สลับธีม ย้ายมาจาก Navbar กลาง (ซ่อนไว้แล้วสำหรับ
              /country ดู Layout.jsx) — ผู้ใช้จริง (ไม่ใช่ชื่อ mock คงที่) */}
          <div className="flex items-center gap-2.5 rounded-db p-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-db-green-bg text-db-green">
              {role ? <role.Icon size={16} /> : <Home size={16} />}
            </span>
            <div className="flex min-w-0 flex-1 flex-col leading-[1.3]">
              <span className="truncate text-body font-medium text-db-text">
                {user?.name || role?.name || 'ผู้ใช้งาน'}
              </span>
              <span className="truncate text-label text-db-text-muted">
                {user?.title || role?.subtitle || role?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="สลับโหมดสว่าง/มืด"
              title="สลับโหมดสว่าง/มืด"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-db-text-muted hover:bg-db-surface hover:text-db-text"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="ออกจากระบบ"
              title="ออกจากระบบ"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-db-text-muted hover:bg-db-red-bg hover:text-db-red"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
