import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import HeroMetric from '../components/HeroMetric'
import KpiStrip from '../components/KpiStrip'
import RegionMap from '../components/RegionMap'
import RegionDetailPanel from '../components/RegionDetailPanel'
import TrendChart from '../components/TrendChart'
import AttentionFeed from '../components/AttentionFeed'
import {
  HERO,
  KPI_STRIP,
  REGIONS,
  COUNTRY_TOTAL,
  TREND,
  ATTENTION_FEED,
  ENVIRONMENT_TODAY,
} from '../data/dashboardData'

function CountryOverviewPage() {
  const [selectedId, setSelectedId] = useState(null)

  const selectedRegion = useMemo(
    () => REGIONS.find((r) => r.id === selectedId) ?? null,
    [selectedId]
  )

  return (
    <DashboardLayout
      title="ภาพรวมประเทศไทย"
      subtitle="โครงการยกระดับศูนย์ข้าวชุมชนสู่การขับเคลื่อนข้าวเปลือกคาร์บอนต่ำ 1,000 ศูนย์"
    >
      <div className="flex flex-col gap-5">
        {/* แถวที่ 1: hero metric เด่นๆ ตัวเดียว + สถิติรองแบบแน่น */}
        <div
          className="animate-fade-up grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.4fr]"
          style={{ animationDelay: '0ms' }}
        >
          <HeroMetric hero={HERO} />
          <div className="flex flex-col justify-center">
            <KpiStrip items={KPI_STRIP} />
          </div>
        </div>

        {/* แถวที่ 2: แผนภาพภาค (พระเอกของหน้า) เชื่อมกับแผงรายละเอียด */}
        <div
          className="animate-fade-up grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]"
          style={{ animationDelay: '90ms' }}
        >
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading font-bold text-db-text">
              สรุปตามภาค
            </h2>
            <div className="mt-3">
              <RegionMap
                regions={REGIONS}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </section>

          <RegionDetailPanel
            region={selectedRegion ?? COUNTRY_TOTAL}
            isWholeCountry={!selectedRegion}
          />
        </div>

        {/* แถวที่ 3: แนวโน้มผลผลิต + สิ่งที่ต้องรู้วันนี้ */}
        <div
          className="animate-fade-up grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]"
          style={{ animationDelay: '180ms' }}
        >
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-heading font-bold text-db-text">
                แนวโน้มผลผลิตข้าว ปี 2567/68
              </h2>
              <span className="text-label text-db-text-muted">
                หน่วย: ล้านตันสะสม
              </span>
            </div>
            <div className="mt-3">
              <TrendChart
                months={TREND.months}
                actual={TREND.actual}
                forecast={TREND.forecast}
                target={TREND.target}
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5 text-caption text-db-text-muted">
                <span className="h-0.5 w-4 rounded-full bg-db-green" />
                ผลผลิตจริง
              </span>
              <span className="flex items-center gap-1.5 text-caption text-db-text-muted">
                <span className="h-0.5 w-4 rounded-full bg-db-text-muted" />
                คาดการณ์ (AI)
              </span>
              <span className="flex items-center gap-1.5 text-caption text-db-text-muted">
                <span className="h-0.5 w-4 rounded-full bg-db-amber" />
                เป้าหมาย
              </span>
            </div>
          </section>

          <AttentionFeed items={ATTENTION_FEED} />
        </div>

        {/* แถวที่ 4: สถานการณ์สิ่งแวดล้อมวันนี้ — แถบเล็กท้ายหน้า ไม่แย่งซีน */}
        <div className="animate-fade-up" style={{ animationDelay: '260ms' }}>
          <h2 className="mb-3 font-display text-heading-sm font-bold text-db-text">
            สถานการณ์สิ่งแวดล้อมวันนี้
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ENVIRONMENT_TODAY.map((item) => (
              <div
                key={item.key}
                className="rounded-db border border-db-border bg-db-surface p-3.5"
              >
                <p className="text-label text-db-text-muted">{item.label}</p>
                <p className="font-display mt-1 text-stat font-semibold text-db-text">
                  {item.value}
                  {item.unit && (
                    <span className="ml-1 text-caption font-normal text-db-text-muted">
                      {item.unit}
                    </span>
                  )}
                </p>
                <p
                  className={`mt-0.5 text-caption ${
                    item.tone === 'good' ? 'text-db-green' : 'text-db-amber'
                  }`}
                >
                  {item.deltaLabel} {item.delta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CountryOverviewPage
