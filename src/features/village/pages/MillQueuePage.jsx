import { useState } from 'react'
import { Warehouse, CheckCircle2 } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { MILLS, LOGISTICS_STEPS } from '../data/villageData'

const STATUS_TONE = {
  ว่าง: 'text-[var(--green-strong)] bg-[var(--badge-bg)]',
  ใกล้เต็ม:
    'text-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_15%,transparent)]',
  เต็ม: 'text-[#e5484d] bg-[color-mix(in_srgb,#e5484d_12%,transparent)]',
}

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'

function MillQueuePage() {
  const [selectedMill, setSelectedMill] = useState(null)
  const [weightTon, setWeightTon] = useState('')
  const [booking, setBooking] = useState(null)

  function handleBook(e) {
    e.preventDefault()
    if (!selectedMill || !weightTon) return
    setBooking({
      mill: selectedMill,
      weightTon,
      queueNo: selectedMill.queueCount + 1,
    })
  }

  if (booking) {
    return (
      <VillageLayout title="คิวโรงอบ/โรงสี" backTo="/village/menu">
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <CheckCircle2
              size={40}
              strokeWidth={1.5}
              className="mx-auto text-[var(--green-strong)]"
            />
            <p className="mt-2 text-[16px] font-bold text-[var(--text)]">
              จองคิวสำเร็จ
            </p>
            <p className="mt-1 text-[13.5px] text-[var(--muted)]">
              {booking.mill.name} · {booking.weightTon} ตัน · คิวที่{' '}
              {booking.queueNo}
            </p>
          </section>

          <section>
            <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
              ติดตามโลจิสติกส์
            </p>
            <div className="flex items-center">
              {LOGISTICS_STEPS.map((step, i) => (
                <div key={step} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    <div
                      className={`h-1 flex-1 ${i === 0 ? 'invisible' : 'bg-[var(--border)]'}`}
                    />
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                        i === 0
                          ? 'border-[var(--green-strong)] bg-[var(--green-strong)]'
                          : 'border-[var(--border)] bg-[var(--surface)]'
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 ${i === LOGISTICS_STEPS.length - 1 ? 'invisible' : 'bg-[var(--border)]'}`}
                    />
                  </div>
                  <span
                    className={`mt-1.5 text-center text-[11px] ${
                      i === 0
                        ? 'font-bold text-[var(--green-strong)]'
                        : 'text-[var(--muted)]'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[12.5px] text-[var(--muted)]">
              สถานะ: รอรถมารับสินค้าจากแปลงนา
            </p>
          </section>

          <button
            type="button"
            onClick={() => setBooking(null)}
            className="min-h-11 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[13.5px] font-semibold text-[var(--text)]"
          >
            จองคิวใหม่
          </button>
        </div>
      </VillageLayout>
    )
  }

  return (
    <VillageLayout title="คิวโรงอบ/โรงสี" backTo="/village/menu">
      <div className="flex flex-col gap-4">
        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            เลือกโรงอบ/โรงสี
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {MILLS.map((m) => (
              <li
                key={m.id}
                className="border-b border-[var(--border)] last:border-0"
              >
                <button
                  type="button"
                  disabled={m.status === 'เต็ม'}
                  onClick={() => setSelectedMill(m)}
                  aria-pressed={selectedMill?.id === m.id}
                  className={`flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-50 ${
                    selectedMill?.id === m.id ? 'bg-[var(--badge-bg)]' : ''
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                    <Warehouse size={18} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-medium text-[var(--text)]">
                      {m.name}
                    </span>
                    <span className="block text-[12.5px] text-[var(--muted)]">
                      {m.type} · คิวรอ {m.queueCount} คิว
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_TONE[m.status]}`}
                  >
                    {m.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {selectedMill && (
          <form
            onSubmit={handleBook}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <label
              className="mb-1.5 block text-[13.5px] font-medium text-[var(--text)]"
              htmlFor="mill-weight"
            >
              น้ำหนักข้าว (ตัน)
            </label>
            <input
              id="mill-weight"
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              value={weightTon}
              onChange={(e) => setWeightTon(e.target.value)}
              placeholder="เช่น 12"
              className={inputClass}
            />
            <button
              type="submit"
              className="mt-3 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
            >
              จองคิว {selectedMill.name}
            </button>
          </form>
        )}
      </div>
    </VillageLayout>
  )
}

export default MillQueuePage
