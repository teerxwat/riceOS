import { Link } from 'react-router-dom'
import { Plus, Map } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import PlotCard from '../components/PlotCard'
import { PLOTS } from '../data/villageData'

function PlotsPage() {
  return (
    <VillageLayout title="แปลงของฉัน" subtitle={`ทั้งหมด ${PLOTS.length} แปลง`}>
      <div className="mb-3 flex gap-2">
        <Link
          to="/village/plots/new"
          className="flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] text-[14.5px] font-semibold text-[var(--green-strong)] active:bg-[var(--surface-2)]"
        >
          <Plus size={18} strokeWidth={2.2} />
          เพิ่มแปลงใหม่
        </Link>
        <Link
          to="/village/plots/map"
          aria-label="แผนที่แปลงนา"
          className="flex min-h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] active:scale-95"
        >
          <Map size={20} strokeWidth={1.8} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {PLOTS.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </div>
    </VillageLayout>
  )
}

export default PlotsPage
