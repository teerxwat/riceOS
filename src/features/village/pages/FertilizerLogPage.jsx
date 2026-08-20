import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import {
  PLOTS,
  FERTILIZER_TYPES,
  FERTILIZER_LOG_HISTORY,
  N2O_FACTOR_PER_KG,
} from '../data/villageData'
import { formatNumber } from '../utils/format'

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'
const labelClass = 'mb-1.5 block text-[13.5px] font-medium text-[var(--text)]'

function nextLogId() {
  const all = Object.values(FERTILIZER_LOG_HISTORY).flat()
  return all.reduce((max, l) => Math.max(max, l.id), 0) + 1
}

// mutate FERTILIZER_LOG_HISTORY ในฟังก์ชันนอกคอมโพเนนต์ — ไม่มี backend จริง
// แก้ array ใน memory ตรงๆ เหมือนจุดอื่นของ feature นี้
function logFertilizer(plotId, entry) {
  if (!FERTILIZER_LOG_HISTORY[plotId]) FERTILIZER_LOG_HISTORY[plotId] = []
  FERTILIZER_LOG_HISTORY[plotId].unshift({ id: nextLogId(), ...entry })
}

function FertilizerLogPage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)

  const [formula, setFormula] = useState(FERTILIZER_TYPES[0].formula)
  const [amountKg, setAmountKg] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState(
    plot ? (FERTILIZER_LOG_HISTORY[plot.id] ?? []) : []
  )

  if (!plot) {
    return (
      <VillageLayout title="ไม่พบแปลงนา" backTo="/village/plots">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ไม่พบข้อมูลแปลงนี้ อาจถูกลบไปแล้ว
        </p>
      </VillageLayout>
    )
  }

  const n2oPreview = amountKg
    ? Math.round(Number(amountKg) * N2O_FACTOR_PER_KG * 1000) / 1000
    : 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!amountKg || Number(amountKg) <= 0) {
      setError('กรอกปริมาณปุ๋ย (กก.) ก่อนบันทึก')
      return
    }
    logFertilizer(plot.id, {
      date: 'วันนี้',
      formula,
      amountKg: Number(amountKg),
      areaRai: plot.area,
    })
    setHistory(FERTILIZER_LOG_HISTORY[plot.id])
    setAmountKg('')
    setError('')
  }

  return (
    <VillageLayout
      title={`บันทึกปุ๋ย · ${plot.name}`}
      backTo={`/village/plots/${plot.id}`}
    >
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="fert-formula">
              สูตรปุ๋ย
            </label>
            <select
              id="fert-formula"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className={inputClass}
            >
              {FERTILIZER_TYPES.map((f) => (
                <option key={f.formula} value={f.formula}>
                  {f.formula} · {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="fert-amount">
              ปริมาณ (กก.)
            </label>
            <input
              id="fert-amount"
              type="number"
              min="0"
              inputMode="numeric"
              value={amountKg}
              onChange={(e) => setAmountKg(e.target.value)}
              placeholder="เช่น 25"
              className={inputClass}
            />
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-[13.5px] text-[var(--muted)]">
              AI คำนวณ N2O Emission
            </p>
            <p className="mt-1 text-[20px] font-bold text-[var(--text)] tabular-nums">
              {n2oPreview}{' '}
              <span className="text-[13px] font-normal text-[var(--muted)]">
                kg N2O
              </span>
            </p>
          </div>

          {error && <p className="text-[13px] text-[#e5484d]">{error}</p>}

          <button
            type="submit"
            className="mt-1 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            บันทึกการใส่ปุ๋ย
          </button>
        </form>

        {history.length > 0 && (
          <section>
            <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
              ประวัติการใส่ปุ๋ย
            </p>
            <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              {history.map((h) => (
                <li
                  key={h.id}
                  className="flex min-h-14 items-center gap-3 border-b border-[var(--border)] px-4 last:border-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                    <Sprout size={17} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] text-[var(--text)]">
                      {h.formula}
                    </span>
                    <span className="block text-[12px] text-[var(--muted)]">
                      {h.date} · {formatNumber(h.amountKg)} กก.
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </VillageLayout>
  )
}

export default FertilizerLogPage
