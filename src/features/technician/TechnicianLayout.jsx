// เจ้าของไฟล์: คนที่ 4 (feature technician)
// โครงแดชบอร์ดช่าง: sidebar เมนู + แถบหัว + เนื้อหาตาม route ย่อย
// ช่างจังหวัด = ล็อกจังหวัดตัวเอง / ช่างใหญ่ (national) = สลับจังหวัด + สิทธิ์จัดการ
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Map,
  Cog,
  ClipboardList,
  Package,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../../auth/authContext.js'
import { PROVINCES } from '../province/provinceData.js'
import { useProvinceId } from '../province/provinceStore.js'
import { TEAM } from './technicianData.js'
import '../province/province.css'
import './technician.css'

const MENU = [
  { to: '.', end: true, label: 'ภาพรวม', Icon: LayoutDashboard },
  { to: 'map', label: 'แผนที่งานซ่อม', Icon: Map },
  { to: 'machines', label: 'เครื่องจักรทั้งหมด', Icon: Cog },
  { to: 'workorders', label: 'ใบงานซ่อม', Icon: ClipboardList },
  { to: 'parts', label: 'อะไหล่และคลัง', Icon: Package },
]

export default function TechnicianLayout() {
  const { user } = useAuth()
  const provinceId = useProvinceId()
  const [refreshedAt, setRefreshedAt] = useState(() =>
    new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )

  const isChief = user?.scope === 'national'
  // ช่างจังหวัดถูกล็อกที่เชียงใหม่ (จังหวัดของตัวเอง) / ช่างใหญ่ตาม selector บนแถบ
  const province = isChief
    ? PROVINCES.find((p) => p.id === provinceId)
    : PROVINCES.find((p) => p.id === 'cnx')

  const online = TEAM.length

  return (
    <div className="pv-shell">
      <aside className="pv-sidebar">
        <nav>
          {MENU.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `pv-menu-item${isActive ? ' active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pv-side-info">
          <b>ทีมช่างออนไลน์ ({online} คน)</b>
          <dl>
            {TEAM.map((t) => (
              <div key={t.name}>
                <dt>
                  <i
                    className="pv-chip-dot"
                    style={{
                      background: t.status === 'free' ? '#3fae57' : '#e8b84b',
                    }}
                  />{' '}
                  {t.name}
                </dt>
                <dd>{t.status === 'free' ? 'ว่าง' : 'ปฏิบัติงาน'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <div className="pv-main">
        <header className="pv-topbar">
          <div>
            <span className="pv-topbar-eyebrow">
              {isChief
                ? 'ช่างใหญ่ · ดูแลระบบทั้งประเทศ'
                : 'ทีมช่างประจำจังหวัด'}
            </span>
            <h1>
              ทีมช่างและเครื่องจักร · จังหวัด{province?.name}
              {isChief && (
                <span className="tc-chief-badge">
                  <ShieldCheck size={14} /> สิทธิ์จัดการทั้งหมด
                </span>
              )}
            </h1>
          </div>
          <div className="pv-topbar-tools">
            <button
              type="button"
              className="pv-refresh"
              onClick={() =>
                setRefreshedAt(
                  new Date().toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                )
              }
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw size={15} /> อัปเดตล่าสุด {refreshedAt} น.
            </button>
          </div>
        </header>

        <div className="pv-content">
          <Outlet context={{ isChief, province }} />
        </div>
      </div>
    </div>
  )
}
