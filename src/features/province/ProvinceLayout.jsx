// เจ้าของไฟล์: คนที่ 2 (feature province)
// โครงหน้าแดชบอร์ดจังหวัด: sidebar เมนู + แถบหัว + เนื้อหาตาม route ย่อย
import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Warehouse,
  Map,
  BarChart3,
  ListChecks,
  FileText,
  Bell,
  Settings,
  RefreshCw,
} from 'lucide-react'
import { PROVINCES, fmt } from './provinceData.js'
import { useAlerts, setAlerts } from './alertsStore.js'
import { useProvinceId } from './provinceStore.js'
import './province.css'

const MENU = [
  { to: '.', end: true, label: 'ภาพรวมจังหวัด', Icon: LayoutDashboard },
  { to: 'centers', label: 'ศูนย์ข้าวชุมชน', Icon: Warehouse },
  { to: 'map', label: 'แผนที่จังหวัด', Icon: Map },
  { to: 'compare', label: 'เปรียบเทียบอำเภอ', Icon: BarChart3 },
  { to: 'progress', label: 'ความคืบหน้าโครงการ', Icon: ListChecks },
  { to: 'reports', label: 'รายงาน', Icon: FileText },
  { to: 'alerts', label: 'การแจ้งเตือน', Icon: Bell },
  { to: 'settings', label: 'ตั้งค่า', Icon: Settings },
]

// สรุปตัวเลขจังหวัดท้าย sidebar (mock)
const SIDE_STATS = [
  { label: 'ศูนย์ทั้งหมด', value: '57 ศูนย์' },
  { label: 'ศูนย์ออนไลน์', value: '52 ศูนย์' },
  { label: 'อำเภอทั้งหมด', value: '25 อำเภอ' },
  { label: 'ตำบลทั้งหมด', value: '204 ตำบล' },
  { label: 'สมาชิกทั้งหมด', value: `${fmt(8945)} คน` },
]

export default function ProvinceLayout() {
  const provinceId = useProvinceId()
  const alerts = useAlerts()
  const [refreshedAt, setRefreshedAt] = useState(() =>
    new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )

  const province = PROVINCES.find((p) => p.id === provinceId)
  const unread = useMemo(() => alerts.filter((a) => !a.read).length, [alerts])

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
              {to === 'alerts' && unread > 0 && (
                <em className="pv-menu-badge">{unread}</em>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="pv-side-info">
          <b>ข้อมูลจังหวัด</b>
          <dl>
            {SIDE_STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <div className="pv-main">
        <header className="pv-topbar">
          <div>
            <span className="pv-topbar-eyebrow">ผู้บริหารระดับจังหวัด</span>
            <h1>จังหวัด{province?.name}</h1>
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
          <Outlet context={{ alerts, setAlerts, province }} />
        </div>
      </div>
    </div>
  )
}
