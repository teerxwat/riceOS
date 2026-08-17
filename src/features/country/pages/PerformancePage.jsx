import DashboardLayout from '../components/DashboardLayout'
import DataTable from '../components/DataTable'
import { REGIONS, COUNTRY_TOTAL } from '../data/dashboardData'
import {
  PROVINCE_RANKING_TOP,
  PROVINCE_RANKING_BOTTOM,
} from '../data/pagesData'
import { formatNumber } from '../utils/format'

const REGION_COLUMNS = [
  { key: 'name', label: 'ภาค', render: (row) => `ภาค${row.name}` },
  {
    key: 'centers',
    label: 'ศูนย์ (แห่ง)',
    align: 'right',
    render: (row) => formatNumber(row.centers),
  },
  {
    key: 'production',
    label: 'ผลผลิต (พันตัน)',
    align: 'right',
    render: (row) => formatNumber(row.production, { decimals: 1 }),
  },
  {
    key: 'area',
    label: 'พื้นที่คาร์บอนต่ำ (ไร่)',
    align: 'right',
    render: (row) => formatNumber(row.area),
  },
  {
    key: 'income',
    label: 'รายได้ (ล้านบาท)',
    align: 'right',
    render: (row) => formatNumber(row.income, { decimals: 1 }),
  },
]

const RANKING_COLUMNS = [
  { key: 'rank', label: '#' },
  { key: 'province', label: 'จังหวัด' },
  {
    key: 'production',
    label: 'ผลผลิต (ตัน)',
    align: 'right',
    render: (row) => formatNumber(row.production, { decimals: 1 }),
  },
  {
    key: 'income',
    label: 'รายได้ (ล้านบาท)',
    align: 'right',
    render: (row) => formatNumber(row.income, { decimals: 1 }),
  },
  {
    key: 'progress',
    label: '% เป้าหมาย',
    align: 'right',
    render: (row) => `${formatNumber(row.progress, { decimals: 1 })}%`,
  },
]

function PerformancePage() {
  const totalRow = {
    id: 'total',
    name: 'รวมทั้งประเทศ',
    centers: COUNTRY_TOTAL.centers,
    production: COUNTRY_TOTAL.production,
    area: COUNTRY_TOTAL.area,
    income: COUNTRY_TOTAL.income,
  }

  return (
    <DashboardLayout
      title="ผลการดำเนินงาน"
      subtitle="เปรียบเทียบผลการดำเนินงานรายภาค และจังหวัดที่มีผลงานโดดเด่น/ต้องสนับสนุน"
    >
      <div className="flex flex-col gap-5">
        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            ผลการดำเนินงานรายภาค
          </h2>
          <div className="mt-3">
            <DataTable
              columns={REGION_COLUMNS}
              rows={[...REGIONS, totalRow]}
              caption="ผลการดำเนินงานรายภาคเทียบกับผลรวมทั้งประเทศ"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading-sm font-bold text-db-green">
              จังหวัดผลงานเด่น (Top 5)
            </h2>
            <div className="mt-3">
              <DataTable
                columns={RANKING_COLUMNS}
                rows={PROVINCE_RANKING_TOP}
                rowKey="rank"
                caption="5 จังหวัดที่มีผลงานโดดเด่นที่สุด"
              />
            </div>
          </section>

          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading-sm font-bold text-db-amber">
              จังหวัดที่ต้องสนับสนุน (Bottom 5)
            </h2>
            <div className="mt-3">
              <DataTable
                columns={RANKING_COLUMNS}
                rows={PROVINCE_RANKING_BOTTOM}
                rowKey="rank"
                caption="5 จังหวัดที่ต้องการการสนับสนุนเพิ่ม"
              />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PerformancePage
