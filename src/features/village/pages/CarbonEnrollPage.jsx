import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Sprout } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, CARBON_PROGRAM_INFO } from '../data/villageData'

// mutate PLOTS ในฟังก์ชันนอกคอมโพเนนต์ — สมัครแล้วปรับสถานะแปลงตรงๆ
// (module-level array) เหมือนแนวทางเดียวกับ AddPlotPage/SellRicePage ไม่มี
// backend เก็บถาวรจริงในสาธิตนี้
function enrollPlots(plotIds) {
  for (const plot of PLOTS) {
    if (plotIds.includes(plot.id)) {
      plot.carbonEnrolled = true
      plot.awdStatus = 'เปิดน้ำ'
      plot.waterLevelCm = 0
    }
  }
}

function CarbonEnrollPage() {
  const unenrolled = PLOTS.filter((p) => !p.carbonEnrolled)
  const [selected, setSelected] = useState(() => unenrolled.map((p) => p.id))
  const [agreed, setAgreed] = useState(false)
  const [done, setDone] = useState(false)

  if (unenrolled.length === 0 && !done) {
    return (
      <VillageLayout title="สมัครโครงการคาร์บอน" backTo="/village/carbon">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ทุกแปลงของคุณเข้าร่วมโครงการคาร์บอนแล้ว
        </p>
      </VillageLayout>
    )
  }

  function toggle(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!agreed || selected.length === 0) return
    enrollPlots(selected)
    setDone(true)
  }

  if (done) {
    return (
      <VillageLayout title="สมัครโครงการคาร์บอน" backTo="/village/carbon">
        <div className="flex flex-col items-center pt-10 text-center">
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            className="text-[var(--green-strong)]"
          />
          <p className="mt-4 text-[17px] font-bold text-[var(--text)]">
            สมัครเข้าร่วมโครงการสำเร็จ
          </p>
          <p className="mt-1 max-w-xs text-[13.5px] text-[var(--muted)]">
            เริ่มบันทึกน้ำตามรอบ AWD ที่แปลงของคุณเพื่อสะสมคาร์บอนเครดิตได้เลย
          </p>
          <Link
            to="/village/carbon"
            className="mt-6 flex min-h-12 w-full max-w-[220px] cursor-pointer items-center justify-center rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            ไปกระเป๋าคาร์บอน
          </Link>
        </div>
      </VillageLayout>
    )
  }

  return (
    <VillageLayout title="สมัครโครงการคาร์บอน" backTo="/village/carbon">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[14px] font-bold text-[var(--text)]">
            มาตรฐาน {CARBON_PROGRAM_INFO.standard}
          </p>
          <p className="mt-1 text-[13px] text-[var(--muted)]">
            เพิ่มรายได้เสริมเฉลี่ย {CARBON_PROGRAM_INFO.benefitPct} จากการทำนา
            AWD
          </p>
        </section>

        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            เลือกแปลงที่ต้องการสมัคร
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {unenrolled.map((p) => (
              <li
                key={p.id}
                className="border-b border-[var(--border)] last:border-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={selected.includes(p.id)}
                  className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                    <Sprout size={19} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-medium text-[var(--text)]">
                      {p.name}
                    </span>
                    <span className="block text-[12.5px] text-[var(--muted)]">
                      {p.variety}
                    </span>
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                      selected.includes(p.id)
                        ? 'border-[var(--green-strong)] bg-[var(--green-strong)] text-white'
                        : 'border-[var(--border)] text-transparent'
                    }`}
                  >
                    <CheckCircle2 size={16} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[13.5px] font-semibold text-[var(--text)]">
            เงื่อนไขการเข้าร่วม
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {CARBON_PROGRAM_INFO.terms.map((term) => (
              <li
                key={term}
                className="flex items-start gap-1.5 text-[13px] text-[var(--muted)]"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                {term}
              </li>
            ))}
          </ul>
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-[13.5px] text-[var(--text)]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-5 w-5 accent-[var(--green-strong)]"
            />
            ยอมรับเงื่อนไขการเข้าร่วมโครงการ
          </label>
        </section>

        <button
          type="submit"
          disabled={!agreed || selected.length === 0}
          className="min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99] disabled:opacity-40"
        >
          ยืนยันสมัคร ({selected.length} แปลง)
        </button>
      </form>
    </VillageLayout>
  )
}

export default CarbonEnrollPage
