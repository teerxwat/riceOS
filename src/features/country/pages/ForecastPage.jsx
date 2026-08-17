import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import TrendChart from '../components/TrendChart'
import AttentionFeed from '../components/AttentionFeed'
import { TREND } from '../data/dashboardData'
import { FORECAST_SUMMARY, AI_FORECAST_INSIGHTS } from '../data/pagesData'

function ForecastPage() {
  return (
    <DashboardLayout
      title="แนวโน้มและพยากรณ์"
      subtitle="คาดการณ์ผลผลิตและราคาข้าวด้วย AI พร้อมข้อเสนอแนะเชิงนโยบาย"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={FORECAST_SUMMARY} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-heading font-bold text-db-text">
                คาดการณ์ผลผลิตข้าว ปี 2567/68
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
          </section>

          <AttentionFeed items={AI_FORECAST_INSIGHTS} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ForecastPage
