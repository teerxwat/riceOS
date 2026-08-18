import { Link } from 'react-router-dom'
import { Leaf, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { CARBON_WALLET, CARBON_TRANSACTIONS, PLOTS } from '../data/villageData'
import { formatNumber } from '../utils/format'

const BREAKDOWN_COLOR = {
  forecast: 'bg-[var(--gold)]',
  pending: 'bg-[#3b82f6]',
  verified: 'bg-[var(--green-strong)]',
  sold: 'bg-[var(--muted)]',
}

function CarbonWalletPage() {
  const valueBaht = Math.round(
    CARBON_WALLET.totalTco2e * CARBON_WALLET.pricePerTon
  )
  const unenrolledCount = PLOTS.filter((p) => !p.carbonEnrolled).length

  return (
    <VillageLayout title="กระเป๋าคาร์บอน" backTo="/village">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--badge-bg)] text-[var(--green-strong)]">
              <Leaf size={24} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[13px] text-[var(--muted)]">
                คาร์บอนเครดิตสะสม
              </p>
              <p className="text-[24px] leading-none font-bold text-[var(--text)] tabular-nums">
                {formatNumber(CARBON_WALLET.totalTco2e, { decimals: 2 })}{' '}
                <span className="text-[14px] font-normal text-[var(--muted)]">
                  tCO2e
                </span>
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-[var(--badge-bg)] p-3">
            <p className="text-[12px] text-[var(--green-strong)]">
              มูลค่าปัจจุบัน (~{formatNumber(CARBON_WALLET.pricePerTon)}{' '}
              บาท/tCO2e)
            </p>
            <p className="text-[20px] font-bold text-[var(--green-strong)] tabular-nums">
              {formatNumber(valueBaht)} บาท
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[15px] font-bold text-[var(--text)]">
            สถานะคาร์บอนเครดิต
          </p>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
            {CARBON_WALLET.breakdown.map((b) => (
              <div
                key={b.key}
                className={BREAKDOWN_COLOR[b.key]}
                style={{
                  width: `${(b.tco2e / CARBON_WALLET.totalTco2e) * 100}%`,
                }}
              />
            ))}
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {CARBON_WALLET.breakdown.map((b) => (
              <li key={b.key} className="flex items-center gap-2 text-[13px]">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${BREAKDOWN_COLOR[b.key]}`}
                />
                <span className="min-w-0 flex-1 truncate text-[var(--muted)]">
                  {b.label}
                </span>
                <span className="shrink-0 font-semibold text-[var(--text)] tabular-nums">
                  {formatNumber(b.tco2e, { decimals: 2 })}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {unenrolledCount > 0 && (
          <Link
            to="/village/carbon/enroll"
            className="rounded-2xl border border-dashed border-[var(--border)] p-4 text-center active:bg-[var(--surface-2)]"
          >
            <p className="text-[14px] font-medium text-[var(--green-strong)]">
              มี {unenrolledCount} แปลงยังไม่เข้าร่วมโครงการคาร์บอน
            </p>
            <p className="mt-0.5 text-[12.5px] text-[var(--muted)]">
              แตะเพื่อสมัครเพิ่มรายได้เสริม 15–30%
            </p>
          </Link>
        )}

        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            ประวัติรายการ
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {CARBON_TRANSACTIONS.map((t) => {
              const isPositive = t.amount >= 0
              return (
                <li
                  key={t.id}
                  className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 last:border-0"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isPositive
                        ? 'bg-[var(--badge-bg)] text-[var(--green-strong)]'
                        : 'bg-[var(--surface-2)] text-[var(--muted)]'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] text-[var(--text)]">
                      {t.type}
                    </span>
                    <span className="block text-[12px] text-[var(--muted)]">
                      {t.date} · {t.status}
                      {t.priceBaht && ` · ${formatNumber(t.priceBaht)} บาท`}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[14px] font-semibold tabular-nums ${
                      isPositive
                        ? 'text-[var(--green-strong)]'
                        : 'text-[var(--muted)]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {formatNumber(t.amount, { decimals: 2 })}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </VillageLayout>
  )
}

export default CarbonWalletPage
