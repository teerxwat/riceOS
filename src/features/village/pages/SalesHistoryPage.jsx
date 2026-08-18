import VillageLayout from '../components/VillageLayout'
import { SALES_HISTORY } from '../data/villageData'
import { formatNumber } from '../utils/format'

function SalesHistoryPage() {
  return (
    <VillageLayout title="ประวัติการขาย" backTo="/village/market">
      <ul className="flex flex-col gap-2">
        {SALES_HISTORY.map((s) => (
          <li
            key={s.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-[var(--text)]">
                {s.variety}
              </p>
              <p className="shrink-0 text-[16px] font-bold text-[var(--green-strong)]">
                {formatNumber(s.total)} บาท
              </p>
            </div>
            <div className="mt-1 flex items-center justify-between text-[12.5px] text-[var(--muted)]">
              <span>{s.date}</span>
              <span>{formatNumber(s.weightKg)} กก.</span>
            </div>
          </li>
        ))}
      </ul>
    </VillageLayout>
  )
}

export default SalesHistoryPage
