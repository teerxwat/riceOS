import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Circle, Camera } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, MRV_EVIDENCE_TYPES } from '../data/villageData'

// mutate PLOTS ในฟังก์ชันนอกคอมโพเนนต์ (ไม่ใช่ตัวแปร `plot` ที่ผูกกับ render)
// — จำลองว่า "ถ่ายรูปแล้ว" ของจริงจะเป็น input file/camera เหมือน AI
// Assistant แต่หน้านี้เน้นโชว์เช็คลิสต์หลักฐาน เลยแค่ toggle ให้เห็นผล
function markPhotoCollected(plotId) {
  const plot = PLOTS.find((p) => p.id === plotId)
  if (!plot) return null
  plot.mrv = { ...plot.mrv, photo: true }
  return plot.mrv
}

function MrvEvidencePage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)
  const [mrv, setMrv] = useState(plot?.mrv ?? null)

  if (!plot) {
    return (
      <VillageLayout title="ไม่พบแปลงนา" backTo="/village/plots">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ไม่พบข้อมูลแปลงนี้ อาจถูกลบไปแล้ว
        </p>
      </VillageLayout>
    )
  }

  if (!plot.carbonEnrolled) {
    return (
      <VillageLayout title="หลักฐาน MRV" backTo={`/village/plots/${plot.id}`}>
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          แปลงนี้ยังไม่ได้เข้าร่วมโครงการคาร์บอน จึงยังไม่มีการเก็บหลักฐาน
        </p>
        <Link
          to="/village/carbon/enroll"
          className="mx-auto mt-4 flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-xl bg-[var(--green-strong)] px-5 text-[13.5px] font-semibold text-white"
        >
          สมัครเข้าร่วมโครงการ
        </Link>
      </VillageLayout>
    )
  }

  const doneCount = MRV_EVIDENCE_TYPES.filter((t) => mrv[t.key]).length
  const completePct = Math.round((doneCount / MRV_EVIDENCE_TYPES.length) * 100)

  function handleMarkPhoto() {
    const updated = markPhotoCollected(plot.id)
    if (updated) setMrv(updated)
  }

  return (
    <VillageLayout
      title={`หลักฐาน MRV · ${plot.name}`}
      backTo={`/village/plots/${plot.id}`}
    >
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-[var(--muted)]">
              ความครบถ้วนของหลักฐาน
            </p>
            <p className="text-[17px] font-bold text-[var(--green-strong)] tabular-nums">
              {completePct}%
            </p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div
              className="h-full rounded-full bg-[var(--green-strong)]"
              style={{ width: `${completePct}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            {completePct === 100
              ? 'พร้อมสำหรับการตรวจสอบ (Audit) แล้ว'
              : 'เก็บหลักฐานให้ครบเพื่อพร้อมรับการตรวจสอบ (Audit)'}
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <ul>
            {MRV_EVIDENCE_TYPES.map((t) => {
              const collected = mrv[t.key]
              return (
                <li
                  key={t.key}
                  className="flex min-h-14 items-center gap-3 border-b border-[var(--border)] px-4 last:border-0"
                >
                  {collected ? (
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-[var(--green-strong)]"
                    />
                  ) : (
                    <Circle
                      size={20}
                      className="shrink-0 text-[var(--muted)]"
                    />
                  )}
                  <span
                    className={`min-w-0 flex-1 text-[14px] ${
                      collected ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    {t.label}
                  </span>
                  {!collected && t.key === 'photo' && (
                    <button
                      type="button"
                      onClick={handleMarkPhoto}
                      className="flex min-h-9 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-[var(--border)] px-3 text-[12.5px] font-medium text-[var(--green-strong)] active:bg-[var(--surface-2)]"
                    >
                      <Camera size={14} />
                      ถ่ายรูป
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </VillageLayout>
  )
}

export default MrvEvidencePage
