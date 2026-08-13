import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2, ShieldCheck, Milestone, ArrowRight } from 'lucide-react'
import { useAuth } from '../../auth/authContext.js'
import { getRole } from './roles.js'
import './roles.css'

export default function RolePage() {
  const { user } = useAuth()
  const role = getRole(user?.role)

  // role ที่มีแดชบอร์ดแล้ว ข้ามหน้าอธิบายบทบาท เข้าแดชบอร์ดทันที
  if (role?.dashboard) return <Navigate to={role.dashboard} replace />

  if (!role) {
    return (
      <div className="role-page">
        <p>ไม่พบบทบาทนี้</p>
      </div>
    )
  }

  const { Icon } = role

  return (
    <div className="role-page" style={{ '--role-accent': role.accent }}>
      <header className="role-hero">
        <div className="role-badge">
          <Icon size={40} strokeWidth={1.7} />
        </div>
        <div>
          <span className="role-eyebrow">
            บทบาทของคุณ{user.name ? ` · ${user.name}` : ''}
          </span>
          <h1>{role.name}</h1>
          <p className="role-sub">{role.subtitle}</p>
        </div>
      </header>

      <p className="role-summary">{role.summary}</p>

      {role.id === 'center' && (
        <Link to="/app/center" className="nav-btn primary role-dashboard-link">
          เข้าสู่แดชบอร์ดศูนย์ข้าว <ArrowRight size={16} />
        </Link>
      )}

      <div className="role-grid">
        <section className="role-card">
          <h2>หน้าที่หลัก</h2>
          <ul className="dot-list">
            {role.duties.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="role-card">
          <h2>สิ่งที่ทำได้ในระบบ</h2>
          <ul className="check-list">
            {role.canDo.map((c) => (
              <li key={c}>
                <CheckCircle2 size={18} className="li-check" />
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="role-meta">
        <div className="meta-item">
          <ShieldCheck size={22} />
          <div>
            <b>ข้อมูลที่เข้าถึงได้</b>
            <p>{role.access}</p>
          </div>
        </div>
        <div className="meta-item">
          <Milestone size={22} />
          <div>
            <b>บทบาทในโครงการ (6 ช่วง)</b>
            <p>{role.phase}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
