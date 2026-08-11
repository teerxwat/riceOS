import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import DonutChart from '../components/DonutChart'
import DataTable from '../components/DataTable'
import {
  INCOME_SUMMARY,
  INCOME_BY_TYPE,
  PROVINCE_RANKING_TOP,
} from '../data/pagesData'
import { formatNumber } from '../utils/format'

const COLUMNS = [
  { key: 'rank', label: '#' },
  { key: 'province', label: 'จังหวัด' },
  {
    key: 'income',
    label: 'รายได้ (ล้านบาท)',
    align: 'right',
    render: (row) => formatNumber(row.income, { decimals: 1 }),
  },
]

function IncomePage() {
  const totalIncome = INCOME_BY_TYPE.reduce((sum, d) => sum + d.value, 0)

  return (
    <DashboardLayout
      title="รายได้เกษตรกร"
      subtitle="รายได้สะสมของเกษตรกร แยกตามชนิดข้าวและจังหวัด"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={INCOME_SUMMARY} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading font-bold text-db-text">
              รายได้แยกตามชนิดข้าว
            </h2>
            <div className="mt-4">
              <DonutChart
                data={INCOME_BY_TYPE}
                centerLabel="รวม (ล้านบาท)"
                centerValue={formatNumber(totalIncome, { decimals: 0 })}
              />
            </div>
          </section>

          <section className="rounded-db border border-db-border bg-db-surface p-5">
            <h2 className="font-display text-heading font-bold text-db-text">
              จังหวัดรายได้สูงสุด
            </h2>
            <div className="mt-3">
              <DataTable
                columns={COLUMNS}
                rows={PROVINCE_RANKING_TOP}
                rowKey="rank"
                caption="5 จังหวัดที่มีรายได้เกษตรกรสูงสุด"
              />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default IncomePage
