import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import RegionMap from '../components/RegionMap'
import RegionDetailPanel from '../components/RegionDetailPanel'
import { REGIONS, COUNTRY_TOTAL } from '../data/dashboardData'

function MapPage() {
  const [selectedId, setSelectedId] = useState(null)

  const selectedRegion = useMemo(
    () => REGIONS.find((r) => r.id === selectedId) ?? null,
    [selectedId]
  )

  return (
    <DashboardLayout
      title="แผนที่ประเทศ"
      subtitle="แผนที่จังหวัดจริงทั้ง 77 จังหวัด จัดกลุ่มเป็น 6 ภาค คลิกเพื่อดูรายละเอียด"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <RegionMap
            regions={REGIONS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </section>

        <RegionDetailPanel
          region={selectedRegion ?? COUNTRY_TOTAL}
          isWholeCountry={!selectedRegion}
        />
      </div>
    </DashboardLayout>
  )
}

export default MapPage
