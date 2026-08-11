import DashboardLayout from './components/DashboardLayout'

function ComingSoonPage({ title }) {
  return (
    <DashboardLayout title={title} subtitle="หน้านี้กำลังพัฒนา">
      <div className="rounded-db border border-dashed border-db-border bg-db-surface p-8 text-center text-db-text-muted">
        เร็วๆ นี้
      </div>
    </DashboardLayout>
  )
}

export default ComingSoonPage
