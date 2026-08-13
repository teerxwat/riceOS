import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Wheat, Moon, Sun, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '../auth/authContext.js'
import { getRole } from '../features/roles/roles.js'

// dark เป็นโหมดหลัก: ใช้ dark เว้นแต่ผู้ใช้เลือก light ไว้เอง
function getInitialTheme() {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const role = user ? getRole(user.role) : null

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <Wheat size={22} className="brand-icon" />
          riceOS
        </NavLink>

        <div className="nav-spacer" />

        {role && (
          <span className="nav-role">
            <role.Icon size={16} />
            {/* ชื่อ role (สั้น เช่น "ชาวบ้าน") โชว์เสมอ ส่วนชื่อผู้ใช้ที่ความ
                ยาวไม่แน่นอนซ่อนเฉพาะจอแคบ กัน badge ยาวจนตกบรรทัด */}
            <span>{role.name}</span>
            {user.name && (
              <span className="nav-role-username"> · {user.name}</span>
            )}
          </span>
        )}

        {user ? (
          <button
            type="button"
            className="nav-btn"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            <LogOut size={16} />
            <span className="nav-btn-label-full">ออกจากระบบ</span>
            <span className="nav-btn-label-short">ออก</span>
          </button>
        ) : (
          <button
            type="button"
            className="nav-btn primary"
            onClick={() => navigate('/login')}
          >
            <LogIn size={16} />
            <span className="nav-btn-label-full">เข้าสู่ระบบ</span>
            <span className="nav-btn-label-short">เข้า</span>
          </button>
        )}

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label="สลับโหมดสว่าง/มืด"
          title="สลับโหมดสว่าง/มืด"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>
    </header>
  )
}
