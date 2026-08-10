import { Bell, ChevronDown, Download } from 'lucide-react'
import './Header.css'

function Header({ title, subtitle }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="dashboard-header-actions">
        <span className="dashboard-header-chip">23 พฤษภาคม 2567</span>
        <span className="dashboard-header-chip">09:45 น.</span>

        <button
          type="button"
          className="dashboard-header-icon-btn"
          aria-label="การแจ้งเตือน"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="dashboard-header-badge">12</span>
        </button>

        <button type="button" className="dashboard-header-profile">
          <img src="https://i.pravatar.cc/64?img=12" alt="" />
          <span className="dashboard-header-profile-info">
            <span className="dashboard-header-profile-name">สมชาย ใจดี</span>
            <span className="dashboard-header-profile-role">
              อธิบดีกรมการข้าว
            </span>
          </span>
          <ChevronDown size={16} strokeWidth={1.75} />
        </button>

        <button type="button" className="dashboard-header-cta">
          <Download size={16} strokeWidth={1.75} />
          สร้างรายงานผู้บริหาร
        </button>
      </div>
    </header>
  )
}

export default Header
