import Sidebar from './Sidebar'
import Header from './Header'

function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-[calc(100svh-var(--nav-h))] bg-db-bg text-sm text-db-text">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 px-7 pt-6 pb-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
