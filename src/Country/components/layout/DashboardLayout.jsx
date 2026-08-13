import Sidebar from './Sidebar'
import Header from './Header'

function DashboardLayout({ title, subtitle, activeLabel, children }) {
  return (
    <div className="flex min-h-svh bg-db-bg text-sm text-db-text [color-scheme:dark]">
      <Sidebar activeLabel={activeLabel} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 px-7 pt-6 pb-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
