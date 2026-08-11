import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import DataTable from '../components/DataTable'
import { CENTERS_SUMMARY, CENTERS_LIST } from '../data/pagesData'
import { formatNumber } from '../utils/format'

const REGION_LABEL = {
  north: 'เหนือ',
  northeast: 'ตะวันออกเฉียงเหนือ',
  central: 'กลาง',
  east: 'ตะวันออก',
  west: 'ตะวันตก',
  south: 'ใต้',
}

const STATUS_STYLE = {
  ok: 'text-db-green bg-db-green-bg',
  watch: 'text-db-amber bg-db-amber-bg',
  risk: 'text-db-red bg-db-red-bg',
  offline: 'text-db-text-dim bg-db-border/40',
}
const STATUS_LABEL = {
  ok: 'ปกติ',
  watch: 'เฝ้าระวัง',
  risk: 'วิกฤต',
  offline: 'ออฟไลน์',
}

const COLUMNS = [
  { key: 'name', label: 'ศูนย์ข้าว' },
  { key: 'province', label: 'จังหวัด' },
  {
    key: 'region',
    label: 'ภาค',
    render: (row) => REGION_LABEL[row.region],
  },
  {
    key: 'status',
    label: 'สถานะ',
    render: (row) => (
      <span
        className={`rounded-full px-2 py-0.5 text-caption font-semibold ${STATUS_STYLE[row.status]}`}
      >
        {STATUS_LABEL[row.status]}
      </span>
    ),
  },
  {
    key: 'production',
    label: 'ข้าวออบ (ตัน)',
    align: 'right',
    render: (row) => formatNumber(row.production, { decimals: 1 }),
  },
  {
    key: 'income',
    label: 'รายได้ (ล้านบาท)',
    align: 'right',
    render: (row) => formatNumber(row.income, { decimals: 1 }),
  },
]

function CentersPage() {
  return (
    <DashboardLayout
      title="ศูนย์ข้าวทั้งหมด"
      subtitle="รายชื่อและสถานะศูนย์ข้าวชุมชนทั่วประเทศ 1,000 ศูนย์"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={CENTERS_SUMMARY} />

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-heading font-bold text-db-text">
              รายชื่อศูนย์ข้าว
            </h2>
            <span className="text-label text-db-text-muted">
              แสดงตัวอย่าง {CENTERS_LIST.length} จาก 1,000 ศูนย์
            </span>
          </div>
          <div className="mt-3">
            <DataTable
              columns={COLUMNS}
              rows={CENTERS_LIST}
              caption="รายชื่อและสถานะศูนย์ข้าวชุมชน"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default CentersPage
