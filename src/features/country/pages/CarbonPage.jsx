import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import DonutChart from '../components/DonutChart'
import { CARBON_SUMMARY, STRAW_USAGE } from '../data/pagesData'
import { ENVIRONMENT_TODAY } from '../data/dashboardData'
import { formatNumber } from '../utils/format'

function CarbonPage() {
  const totalStraw = STRAW_USAGE.reduce((sum, d) => sum + d.value, 0)

  return (
    <DashboardLayout
      title="คาร์บอนและสิ่งแวดล้อม"
      subtitle="ความคืบหน้าคาร์บอนเครดิต การใช้ประโยชน์จากฟาง และสถานการณ์สิ่งแวดล้อม"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={CARBON_SUMMARY} />

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            สัดส่วนการใช้ประโยชน์จากฟางและตอซัง
          </h2>
          <div className="mt-4">
            <DonutChart
              data={STRAW_USAGE}
              centerLabel="รวม (ตัน)"
              centerValue={formatNumber(totalStraw)}
            />
          </div>
        </section>

        <section>
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
        </section>
      </div>
    </DashboardLayout>
  )
}

export default CarbonPage
