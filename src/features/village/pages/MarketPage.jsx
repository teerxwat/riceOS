import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import {
  MARKET_PRICES,
  CURRENT_SALE_LISTING,
  INCOME_SUMMARY,
} from '../data/villageData'
import { formatNumber } from '../utils/format'

function MarketPage() {
  return (
    <VillageLayout title="ตลาดข้าว" subtitle="ราคาข้าววันนี้และรายได้ของคุณ">
      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[15px] font-bold text-[var(--text)]">
            ราคาข้าววันนี้
          </p>
          <ul className="mt-1 flex flex-col divide-y divide-[var(--border)]">
            {MARKET_PRICES.map((item) => {
              const isUp = item.change >= 0
              return (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-2 py-3"
                >
                  <span className="min-w-0 flex-1 truncate text-[14.5px] text-[var(--text)]">
                    {item.name}
                  </span>
                  <span className="flex shrink-0 flex-col items-end">
                    <span className="text-[15px] font-semibold text-[var(--text)]">
                      {formatNumber(item.price)}
                    </span>
                    <span
                      className={`flex items-center gap-0.5 text-[12px] font-medium ${
                        isUp ? 'text-[var(--green-strong)]' : 'text-[#e5484d]'
                      }`}
                    >
                      {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {formatNumber(Math.abs(item.change))} บาท/ตัน
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[var(--text)]">
              ขายข้าวของฉัน
            </p>
            <Link
              to="/village/market/history"
              className="flex min-h-11 shrink-0 cursor-pointer items-center px-1 text-[14px] font-semibold text-[var(--green-strong)]"
            >
              ประวัติการขาย
            </Link>
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-medium text-[var(--text)]">
                {CURRENT_SALE_LISTING.variety}
              </p>
              <p className="truncate text-[13px] text-[var(--muted)]">
                น้ำหนัก {formatNumber(CURRENT_SALE_LISTING.weightKg)} กก.
              </p>
            </div>
            <p className="shrink-0 text-[19px] font-bold text-[var(--green-strong)]">
              {formatNumber(CURRENT_SALE_LISTING.total)} บาท
            </p>
          </div>
          <Link
            to="/village/market/sell"
            className="mt-3 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            ขายข้าวใหม่
          </Link>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[15px] font-bold text-[var(--text)]">
            รายได้ของฉัน (ปี {INCOME_SUMMARY.year})
          </p>
          <div className="mt-1 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[17px] font-bold text-[var(--text)]">
                {formatNumber(INCOME_SUMMARY.totalBaht)}
              </p>
              <p className="text-[12px] text-[var(--muted)]">รายได้รวม (บาท)</p>
            </div>
            <div>
              <p className="text-[17px] font-bold text-[var(--text)]">
                {formatNumber(INCOME_SUMMARY.soldKg)}
              </p>
              <p className="text-[12px] text-[var(--muted)]">ขายแล้ว (กก.)</p>
            </div>
            <div>
              <p className="text-[17px] font-bold text-[var(--text)]">
                {formatNumber(INCOME_SUMMARY.remainingKg)}
              </p>
              <p className="text-[12px] text-[var(--muted)]">คงเหลือ (กก.)</p>
            </div>
          </div>
          <Link
            to="/village/market/payments"
            className="mt-3 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[14.5px] font-semibold text-[var(--text)]"
          >
            ดูประวัติการรับเงิน
          </Link>
        </section>
      </div>
    </VillageLayout>
  )
}

export default MarketPage
