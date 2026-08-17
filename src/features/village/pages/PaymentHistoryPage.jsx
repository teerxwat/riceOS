import { CheckCircle2 } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PAYMENT_HISTORY } from '../data/villageData'
import { formatNumber } from '../utils/format'

function PaymentHistoryPage() {
  return (
    <VillageLayout title="ประวัติการรับเงิน" backTo="/village/market">
      <ul className="flex flex-col gap-2">
        {PAYMENT_HISTORY.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
              <CheckCircle2 size={19} strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-medium text-[var(--text)]">
                {p.method}
              </span>
              <span className="block text-[12.5px] text-[var(--muted)]">
                {p.date} · {p.ref}
              </span>
            </span>
            <span className="shrink-0 text-[16px] font-bold text-[var(--green-strong)]">
              {formatNumber(p.amount)} บาท
            </span>
          </li>
        ))}
      </ul>
    </VillageLayout>
  )
}

export default PaymentHistoryPage
