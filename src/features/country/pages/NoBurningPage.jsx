import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import AttentionFeed from '../components/AttentionFeed'
import { BURNING_SUMMARY, BURNING_HOTSPOT_ALERTS } from '../data/pagesData'

function NoBurningPage() {
  return (
    <DashboardLayout
      title="การลดการเผา"
      subtitle="ติดตามจุดความร้อนและความคืบหน้าการลดการเผาฟางทั่วประเทศ"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={BURNING_SUMMARY} />
        <AttentionFeed items={BURNING_HOTSPOT_ALERTS} />
      </div>
    </DashboardLayout>
  )
}

export default NoBurningPage
