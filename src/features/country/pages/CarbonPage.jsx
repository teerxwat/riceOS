import { BadgeCheck } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import DonutChart from '../components/DonutChart'
import TrendChart from '../components/TrendChart'
import DataTable from '../components/DataTable'
import {
  CARBON_SUMMARY,
  STRAW_USAGE,
  CARBON_PIPELINE,
  CARBON_TREND,
  CARBON_CERTIFICATIONS,
  CARBON_TRANSACTIONS,
} from '../data/pagesData'
import { ENVIRONMENT_TODAY } from '../data/dashboardData'
import { formatNumber } from '../utils/format'

const TX_COLUMNS = [
  { key: 'date', label: 'วันที่' },
  { key: 'region', label: 'ภาค' },
  { key: 'type', label: 'รายการ' },
  {
    key: 'amount',
    label: 'ปริมาณ (tCO₂e)',
    align: 'right',
    render: (row) => (
      <span className={row.amount < 0 ? 'text-db-text-muted' : 'text-db-green'}>
        {row.amount > 0 ? '+' : ''}
        {formatNumber(row.amount)}
      </span>
    ),
  },
  {
    key: 'value',
    label: 'มูลค่า (ล้านบาท)',
    align: 'right',
    render: (row) =>
      row.priceMillionBaht
        ? formatNumber(row.priceMillionBaht, { decimals: 2 })
        : '—',
  },
  { key: 'status', label: 'สถานะ' },
]

function CarbonPage() {
  const totalStraw = STRAW_USAGE.reduce((sum, d) => sum + d.value, 0)
  const totalCredits = CARBON_PIPELINE.reduce((sum, d) => sum + d.value, 0)

  return (
    <DashboardLayout
      title="คาร์บอนและสิ่งแวดล้อม"
      subtitle="ความคืบหน้าคาร์บอนเครดิต การใช้ประโยชน์จากฟาง และสถานการณ์สิ่งแวดล้อม"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={CARBON_SUMMARY} />

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            แนวโน้มคาร์บอนเครดิตสะสมทั่วประเทศ
          </h2>
          <div className="mt-4">
            <TrendChart
              months={CARBON_TREND.months}
              actual={CARBON_TREND.actual}
              forecast={CARBON_TREND.forecast}
              target={CARBON_TREND.target}
              unit="tCO₂e"
              ariaLabel="แนวโน้มคาร์บอนเครดิตสะสม ผลจริงเทียบคาดการณ์และเป้าหมาย"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading font-bold text-db-text">
              สถานะคาร์บอนเครดิตตามขั้นตอน (Pipeline)
            </h2>
            <div className="mt-4">
              <DonutChart
                data={CARBON_PIPELINE}
                centerLabel="รวม (tCO₂e)"
                centerValue={formatNumber(totalCredits)}
              />
            </div>
          </section>

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
        </div>

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <div className="flex items-center gap-1.5">
            <BadgeCheck size={18} className="text-db-green" />
            <h2 className="font-display text-heading font-bold text-db-text">
              มาตรฐานและการรับรอง
            </h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {CARBON_CERTIFICATIONS.map((c) => (
              <span
                key={c}
                className="rounded-full bg-db-green-bg px-3 py-1.5 text-label font-medium text-db-green"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            ประวัติการสร้าง/จำหน่ายคาร์บอนเครดิตล่าสุด
          </h2>
          <div className="mt-4">
            <DataTable
              columns={TX_COLUMNS}
              rows={CARBON_TRANSACTIONS}
              caption="ประวัติการสร้างและจำหน่ายคาร์บอนเครดิตล่าสุด"
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
