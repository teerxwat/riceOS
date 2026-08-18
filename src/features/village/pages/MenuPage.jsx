import {
  UserCircle,
  Bell,
  Warehouse,
  BookOpen,
  Phone,
  Info,
  Leaf,
  FileText,
  Truck,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import VillageLayout from '../components/VillageLayout'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../../../auth/authContext.js'
import { PROFILE } from '../data/villageData'

const MENU_ITEMS = [
  { icon: UserCircle, label: 'โปรไฟล์ของฉัน', to: '/village/profile' },
  { icon: Leaf, label: 'กระเป๋าคาร์บอน', to: '/village/carbon' },
  { icon: Bell, label: 'ตั้งค่าการแจ้งเตือน', to: '/village/notifications' },
  {
    icon: Warehouse,
    label: 'ศูนย์ข้าวของฉัน',
    desc: PROFILE.center,
    to: '/village/contact',
  },
  { icon: FileText, label: 'คลังเอกสาร', to: '/village/documents' },
  { icon: Truck, label: 'คิวโรงอบ/โรงสี', to: '/village/mill' },
  { icon: BookOpen, label: 'คู่มือการใช้งาน', to: '/village/manual' },
  { icon: Phone, label: 'ติดต่อเจ้าหน้าที่ศูนย์', to: '/village/contact' },
  { icon: Info, label: 'เกี่ยวกับแอป', to: '/village/about' },
]

function MenuPage() {
  const [theme, toggleTheme] = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <VillageLayout title="เมนู" subtitle={PROFILE.name}>
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <ul>
          {MENU_ITEMS.map(({ icon: Icon, label, desc, to }) => (
            <li
              key={label}
              className="border-b border-[var(--border)] last:border-0"
            >
              <Link
                to={to}
                className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] text-[var(--text)]">
                    {label}
                  </span>
                  {desc && (
                    <span className="block truncate text-[12.5px] text-[var(--muted)]">
                      {desc}
                    </span>
                  )}
                </span>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-[var(--muted)]"
                />
              </Link>
            </li>
          ))}

          <li className="border-b border-[var(--border)] last:border-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                {theme === 'dark' ? (
                  <Moon size={19} strokeWidth={1.8} />
                ) : (
                  <Sun size={19} strokeWidth={1.8} />
                )}
              </span>
              <span className="min-w-0 flex-1 text-[15px] text-[var(--text)]">
                โหมดมืด
              </span>
              <span
                aria-hidden="true"
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-[var(--green-strong)]'
                    : 'bg-[var(--border)]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </span>
            </button>
          </li>
        </ul>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[15px] font-semibold text-[#e5484d] active:bg-[var(--surface-2)]"
      >
        <LogOut size={18} strokeWidth={1.8} />
        ออกจากระบบ
      </button>
    </VillageLayout>
  )
}

export default MenuPage
