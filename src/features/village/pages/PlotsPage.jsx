import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import PlotCard from '../components/PlotCard'
import { PLOTS } from '../data/villageData'

function PlotsPage() {
  return (
    <VillageLayout title="แปลงของฉัน" subtitle={`ทั้งหมด ${PLOTS.length} แปลง`}>
      <Link
        to="/village/plots/new"
        className="mb-3 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] text-[14.5px] font-semibold text-[var(--green-strong)] active:bg-[var(--surface-2)]"
      >
        <Plus size={18} strokeWidth={2.2} />
        เพิ่มแปลงใหม่
      </Link>
      <div className="flex flex-col gap-3">
        {PLOTS.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </div>
    </VillageLayout>
  )
}

export default PlotsPage
