import VillageLayout from '../components/VillageLayout'
import PlotCard from '../components/PlotCard'
import { PLOTS } from '../data/villageData'

function PlotsPage() {
  return (
    <VillageLayout title="แปลงของฉัน" subtitle={`ทั้งหมด ${PLOTS.length} แปลง`}>
      <div className="flex flex-col gap-3">
        {PLOTS.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </div>
    </VillageLayout>
  )
}

export default PlotsPage
