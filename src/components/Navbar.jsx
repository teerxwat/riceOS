import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Wheat,
  Moon,
  Sun,
  LogIn,
  LogOut,
  Bell,
  CalendarDays,
  Clock,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '../auth/authContext.js'
import { getRole } from '../features/roles/roles.js'
import { useAlerts } from '../features/province/alertsStore.js'
import {
  useProvinceId,
  setProvinceId,
} from '../features/province/provinceStore.js'
import { PROVINCES } from '../features/province/provinceData.js'

// dark เป็นโหมดหลัก: ใช้ dark เว้นแต่ผู้ใช้เลือก light ไว้เอง
function getInitialTheme() {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const alerts = useAlerts()
  const provinceId = useProvinceId()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  // นาฬิกาบนแถบ อัปเดตทุกครึ่งนาที
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const role = user ? getRole(user.role) : null
  const unread = alerts.filter((a) => !a.read).length

  const dateText = now.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeText = `${now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  })} น.`

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">
            <Wheat size={20} strokeWidth={2.1} />
          </span>
          <span className="brand-2line">
            <b>DONAUS</b>
            <small>RiceOS</small>
          </span>
        </NavLink>

        {(role?.id === 'province' || role?.id === 'technician') && (
          <div className="nav-page">
            <h1>
              {role.id === 'technician'
                ? 'ทีมช่างและเครื่องจักร'
                : 'ระดับจังหวัด'}
            </h1>
            {role.id === 'technician' && user.scope !== 'national' ? (
              // ช่างจังหวัด: ล็อกจังหวัดตัวเอง เปลี่ยนไม่ได้
              <span className="nav-province nav-province--locked">
                จังหวัดเชียงใหม่
              </span>
            ) : (
              <select
                className="nav-province"
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
                aria-label="เลือกจังหวัด"
              >
                {PROVINCES.map((p) => (
                  <option key={p.id} value={p.id}>
                    จังหวัด{p.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="nav-spacer" />

        <span className="nav-pill">
          <CalendarDays size={15} /> {dateText}
        </span>
        <span className="nav-pill">
          <Clock size={15} /> {timeText}
        </span>

        {role?.id === 'province' && (
          <button
            type="button"
            className="nav-bell"
            onClick={() => navigate(`${role.dashboard}/alerts`)}
            aria-label={`การแจ้งเตือน (ยังไม่อ่าน ${unread})`}
            title="การแจ้งเตือน"
          >
            <Bell size={17} />
            {unread > 0 && <em>{unread}</em>}
          </button>
        )}

        {user ? (
          <div className="nav-user-wrap">
            <button
              type="button"
              className="nav-user"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
            >
              <span className="nav-user-avatar">
                {user.name ? (
                  user.name.charAt(0)
                ) : role ? (
                  <role.Icon size={16} />
                ) : (
                  <Wheat size={16} />
                )}
              </span>
              <span className="nav-user-text">
                <b>{user.name || role?.name}</b>
                <small>{user.title || role?.subtitle || role?.name}</small>
              </span>
              <ChevronDown
                size={15}
                className={`nav-user-chev${menuOpen ? ' open' : ''}`}
              />
            </button>

            {menuOpen && (
              <div
                className="nav-menu-backdrop"
                onClick={() => setMenuOpen(false)}
              />
            )}
            {menuOpen && (
              <div className="nav-menu" role="menu">
                <button
                  type="button"
                  onClick={() =>
                    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
                  }
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  สลับโหมดสว่าง/มืด
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => {
                    setMenuOpen(false)
                    logout()
                    navigate('/')
                  }}
                >
                  <LogOut size={15} /> ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              className="nav-btn primary"
              onClick={() => navigate('/login')}
            >
              <LogIn size={16} /> เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="สลับโหมดสว่าง/มืด"
              title="สลับโหมดสว่าง/มืด"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </>
        )}
      </div>
    </header>
  )
}
