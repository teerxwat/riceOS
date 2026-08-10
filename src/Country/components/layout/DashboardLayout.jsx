import Sidebar from './Sidebar'
import Header from './Header'
import './DashboardLayout.css'

function DashboardLayout({ title, subtitle, activeLabel, children }) {
  return (
    <div className="dashboard">
      <Sidebar activeLabel={activeLabel} />
      <div className="dashboard-main">
        <Header title={title} subtitle={subtitle} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
