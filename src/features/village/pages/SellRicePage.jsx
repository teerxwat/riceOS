import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import VillageLayout from '../components/VillageLayout'
import {
  MARKET_PRICES,
  SALES_HISTORY,
  RICE_VARIETIES,
} from '../data/villageData'
import { formatNumber } from '../utils/format'

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'
const labelClass = 'mb-1.5 block text-[13.5px] font-medium text-[var(--text)]'

function nextSaleId() {
  return SALES_HISTORY.reduce((max, s) => Math.max(max, s.id), 0) + 1
}

function SellRicePage() {
  const [variety, setVariety] = useState(RICE_VARIETIES[0])
  const [weight, setWeight] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const priceEntry = MARKET_PRICES.find((p) => p.name === variety)
  const pricePerTon = priceEntry?.price ?? MARKET_PRICES[0].price
  const total = weight ? Math.round((Number(weight) / 1000) * pricePerTon) : 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!weight || Number(weight) <= 0) {
      setError('กรอกน้ำหนักข้าว (กก.) ก่อนส่งขาย')
      return
    }
    // เพิ่มเข้า SALES_HISTORY ตรงๆ (module-level array) เหมือนแนวทางเดียวกับ
    // AddPlotPage — ไม่มี backend จริง แต่ทำให้เห็นผลลัพธ์จริงในหน้า
    // "ประวัติการขาย" ทันที ไม่ใช่ปุ่มที่กดแล้วไม่มีอะไรเกิดขึ้น
    SALES_HISTORY.unshift({
      id: nextSaleId(),
      date: 'วันนี้',
      variety,
      weightKg: Number(weight),
      total,
    })
    setDone(true)
  }

  if (done) {
    return (
      <VillageLayout title="ขายข้าวใหม่" backTo="/village/market">
        <div className="flex flex-col items-center pt-10 text-center">
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            className="text-[var(--green-strong)]"
          />
          <p className="mt-4 text-[17px] font-bold text-[var(--text)]">
            ส่งคำขอขายข้าวแล้ว
          </p>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            {variety} · {formatNumber(Number(weight))} กก. ·{' '}
            {formatNumber(total)} บาท
          </p>
          <p className="mt-1 max-w-xs text-[13px] text-[var(--muted)]">
            เจ้าหน้าที่ศูนย์ข้าวจะติดต่อนัดชั่งน้ำหนักและตรวจคุณภาพต่อไป
          </p>
          <Link
            to="/village/market"
            className="mt-6 flex min-h-12 w-full max-w-[220px] cursor-pointer items-center justify-center rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            กลับไปตลาดข้าว
          </Link>
        </div>
      </VillageLayout>
    )
  }

  return (
    <VillageLayout title="ขายข้าวใหม่" backTo="/village/market">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass} htmlFor="sell-variety">
            พันธุ์ข้าว
          </label>
          <select
            id="sell-variety"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className={inputClass}
          >
            {RICE_VARIETIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="sell-weight">
            น้ำหนัก (กก.)
          </label>
          <input
            id="sell-weight"
            type="number"
            min="0"
            inputMode="numeric"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="เช่น 1200"
            className={inputClass}
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between text-[13.5px] text-[var(--muted)]">
            <span>ราคาอ้างอิง</span>
            <span>{formatNumber(pricePerTon)} บาท/ตัน</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[14.5px] font-medium text-[var(--text)]">
              ยอดประเมิน
            </span>
            <span className="text-[19px] font-bold text-[var(--green-strong)]">
              {formatNumber(total)} บาท
            </span>
          </div>
        </div>

        {error && <p className="text-[13px] text-[#e5484d]">{error}</p>}

        <button
          type="submit"
          className="mt-1 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
        >
          ส่งคำขอขาย
        </button>
      </form>
    </VillageLayout>
  )
}

export default SellRicePage
