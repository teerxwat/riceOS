import {
  Wheat,
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
import './Sidebar.css'

const NAV_ITEMS = [
  { label: 'ภาพรวมประเทศ', icon: Home },
  { label: 'ศูนย์ข้าวทั้งหมด', icon: Building2 },
  { label: 'แผนที่ประเทศ', icon: Map },
  { label: 'ผลการดำเนินงาน', icon: BarChart3 },
  { label: 'คาร์บอนและสิ่งแวดล้อม', icon: Leaf },
  { label: 'รายได้เกษตรกร', icon: Wallet },
  { label: 'การลดการเผา', icon: Flame },
  { label: 'แนวโน้มและพยากรณ์', icon: TrendingUp },
  { label: 'รายงานผู้บริหาร', icon: FileText },
  { label: 'ตั้งค่า', icon: Settings },
]

function Sidebar({ activeLabel = 'ภาพรวมประเทศ' }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Wheat size={22} strokeWidth={1.75} />
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">DONAUS</span>
          <span className="sidebar-logo-sub">RiceOS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={
              label === activeLabel
                ? 'sidebar-nav-item active'
                : 'sidebar-nav-item'
            }
          >
            <Icon size={18} strokeWidth={1.75} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-ai-card">
          <span className="sidebar-ai-title">AI Assistant</span>
          <span className="sidebar-ai-desc">ผู้ช่วยผู้บริหาร ถามได้ทุกเรื่อง</span>
          <ChevronRight className="sidebar-ai-arrow" size={16} strokeWidth={1.75} />
        </button>

        <div className="sidebar-user">
          <img
            className="sidebar-user-avatar"
            src="https://i.pravatar.cc/64?img=12"
            alt=""
          />
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">สมชาย ใจดี</span>
            <span className="sidebar-user-role">อธิบดีกรมการข้าว</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
