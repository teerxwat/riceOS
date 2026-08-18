import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Satellite,
  Zap,
  Store,
  UserPlus,
  Sprout,
  Phone,
  MessageCircle,
  Mail,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../../../auth/authContext.js'

const NAV_ITEMS = [
  { to: '/app/center', label: 'หน้าหลัก', icon: LayoutDashboard },
  { to: '/app/center/satellite', label: 'ภาพถ่ายดาวเทียม', icon: Satellite },
  { to: '/app/center/machines', label: 'เครื่องจักรและพลังงาน', icon: Zap },
  { to: '/app/center/marketplace', label: 'ตลาดข้าว', icon: Store },
  { to: '/app/center/add-farmer', label: 'เพิ่มเกษตรกร', icon: UserPlus },
]

export function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="c-sidebar">
      <div className="c-sidebar__brand">
        <span className="c-sidebar__brand-icon">
          <Sprout size={20} />
        </span>
        <div>
          <p className="c-sidebar__brand-title">
            DONAUS <span>RiceOS</span>
          </p>
          <p className="c-sidebar__brand-sub">ศูนย์จัดการระบบโรงสีข้าว</p>
        </div>
      </div>

      <nav className="c-sidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app/center'}
            className={({ isActive }) =>
              `c-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="c-sidebar__footer">
        <p className="c-sidebar__footer-title">ศูนย์ช่วยเหลือ</p>
        <div className="c-sidebar__contact">
          <span>
            <Phone size={13} /> 02-123-4567
          </span>
          <span>
            <MessageCircle size={13} /> @donaus_support
          </span>
          <span>
            <Mail size={13} /> support@donaus.co.th
          </span>
        </div>
        <button
          type="button"
          className="c-sidebar__exit"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          <LogOut size={14} /> ออกจากระบบ
        </button>
        <p className="c-sidebar__version">เวอร์ชัน 1.0.0</p>
      </div>
    </aside>
  )
}
