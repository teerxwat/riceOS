import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Droplets } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, CARBON_WALLET, WATER_LOG_HISTORY } from '../data/villageData'

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'
const labelClass = 'mb-1.5 block text-[13.5px] font-medium text-[var(--text)]'

const WATER_SOURCES = ['คลอง', 'บ่อบาดาล', 'น้ำฝน']
const EQUIPMENT_TYPES = ['ปั๊มน้ำ', 'ตามแรงโน้มถ่วง']

// เกณฑ์ประเมินสถานะ AWD จากระดับน้ำ — ล้อกับ mockup (ระดับน้ำต่ำกว่าผิวดิน
// แต่ไม่เกิน -20 ซม. คือช่วงปลอดภัยของ AWD, ต่ำกว่านั้นเสี่ยงแห้งเกินไป,
// สูงกว่า 0 คือน้ำท่วมผิวดิน/กำลังเปิดน้ำอยู่)
function awdStatusFromLevel(cm) {
  if (cm >= 0) return 'เปิดน้ำ'
  if (cm >= -20) return 'เหมาะสม'
  return 'เสี่ยง/ผิดปกติ'
}

// คำแนะนำแบบกฎเกณฑ์ตายตัว (ไม่ใช่ AI จริง) ล้อโทนเดียวกับ "AI วิเคราะห์" ใน
// mockup — "ควรปล่อยน้ำอีก 2 วัน" เมื่อใกล้เกณฑ์เสี่ยงแห้งเกินไป
function tipFromLevel(cm) {
  if (cm >= 0) return 'ระดับน้ำท่วมผิวดิน ปล่อยให้แห้งตามรอบ AWD ต่อไปได้'
  if (cm > -15) return 'อยู่ในช่วงปลอดภัย ยังไม่ต้องปล่อยน้ำเพิ่ม'
  if (cm >= -20) return 'ใกล้เกณฑ์แล้ว ควรเตรียมปล่อยน้ำภายใน 1-2 วัน'
  return 'ต่ำกว่าเกณฑ์ปลอดภัย ควรปล่อยน้ำเข้าแปลงโดยเร็ว'
}

// mutate PLOTS/CARBON_WALLET/WATER_LOG_HISTORY ในฟังก์ชันนอกคอมโพเนนต์
// (ไม่ใช่ตัวแปร `plot` ที่ผูกกับ render) — บันทึกน้ำแล้วถือเป็นหลักฐาน
// "บันทึกกิจกรรมของเกษตรกร" (MRV) และถ้าสถานะออกมาเหมาะสม (อยู่ในเกณฑ์ AWD)
// จะได้คาร์บอนเครดิตเพิ่มเล็กน้อย จำลองว่าระบบคำนวณให้อัตโนมัติจากการทำ AWD
// ถูกวิธี ไม่มี backend จริง แก้ array ใน memory ตรงๆ เหมือนจุดอื่นของ feature นี้
function applyWaterLog(plotId, { type, cm, source, equipment, durationHr }) {
  const plot = PLOTS.find((p) => p.id === plotId)
  if (!plot) return null

  const newStatus = awdStatusFromLevel(cm)
  plot.waterLevelCm = cm
  plot.awdStatus = newStatus
  plot.mrv = { ...plot.mrv, farmerLog: true }
  if (newStatus === 'เหมาะสม') {
    plot.carbonTco2e = Math.round((plot.carbonTco2e + 0.05) * 100) / 100
    CARBON_WALLET.totalTco2e =
      Math.round((CARBON_WALLET.totalTco2e + 0.05) * 100) / 100
    const forecast = CARBON_WALLET.breakdown.find((b) => b.key === 'forecast')
    if (forecast)
      forecast.tco2e = Math.round((forecast.tco2e + 0.05) * 100) / 100
  }

  if (!WATER_LOG_HISTORY[plotId]) WATER_LOG_HISTORY[plotId] = []
  WATER_LOG_HISTORY[plotId].unshift({
    date: 'วันนี้',
    levelCm: cm,
    type,
    source,
    equipment,
    durationHr,
  })

  return newStatus
}

function WaterLogPage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)

  const [type, setType] = useState('เปิดน้ำ')
  const [levelCm, setLevelCm] = useState('')
  const [source, setSource] = useState(WATER_SOURCES[0])
  const [equipment, setEquipment] = useState(EQUIPMENT_TYPES[0])
  const [durationHr, setDurationHr] = useState('')
  const [error, setError] = useState('')
  const [resultStatus, setResultStatus] = useState(null)

  if (!plot) {
    return (
      <VillageLayout title="ไม่พบแปลงนา" backTo="/village/plots">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ไม่พบข้อมูลแปลงนี้ อาจถูกลบไปแล้ว
        </p>
      </VillageLayout>
    )
  }

  const history = WATER_LOG_HISTORY[plot.id] ?? []
  const maxAbsLevel = Math.max(20, ...history.map((h) => Math.abs(h.levelCm)))

  function handleSubmit(e) {
    e.preventDefault()
    if (levelCm === '') {
      setError('กรอกระดับน้ำ (ซม.) ก่อนบันทึก')
      return
    }
    const newStatus = applyWaterLog(plot.id, {
      type,
      cm: Number(levelCm),
      source,
      equipment,
      durationHr: durationHr ? Number(durationHr) : null,
    })
    setResultStatus(newStatus)
  }

  if (resultStatus) {
    return (
      <VillageLayout title="บันทึกน้ำ" backTo={`/village/plots/${plot.id}`}>
        <div className="flex flex-col items-center pt-10 text-center">
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            className="text-[var(--green-strong)]"
          />
          <p className="mt-4 text-[17px] font-bold text-[var(--text)]">
            บันทึกน้ำเรียบร้อย
          </p>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            {type} · {levelCm} ซม. · สถานะ AWD: {resultStatus}
          </p>
          <Link
            to={`/village/plots/${plot.id}`}
            className="mt-6 flex min-h-12 w-full max-w-[220px] cursor-pointer items-center justify-center rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            กลับไปหน้าแปลง
          </Link>
        </div>
      </VillageLayout>
    )
  }

  return (
    <VillageLayout
      title={`บันทึกน้ำ · ${plot.name}`}
      backTo={`/village/plots/${plot.id}`}
    >
      <div className="flex flex-col gap-5">
        {plot.waterLevelCm !== null && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2">
              <Droplets size={17} className="shrink-0 text-[var(--muted)]" />
              <p className="text-[13.5px] font-semibold text-[var(--text)]">
                คำแนะนำจากระดับน้ำล่าสุด
              </p>
            </div>
            <p className="mt-1.5 text-[13.5px] text-[var(--muted)]">
              {tipFromLevel(plot.waterLevelCm)}
            </p>
          </section>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <p className={labelClass}>ประเภทกิจกรรม</p>
            <div className="flex gap-2">
              {['เปิดน้ำ', 'ปิดน้ำ'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`min-h-11 flex-1 cursor-pointer rounded-xl border text-[14px] font-medium ${
                    type === t
                      ? 'border-[var(--green-strong)] bg-[var(--badge-bg)] text-[var(--green-strong)]'
                      : 'border-[var(--border)] text-[var(--text)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="water-level">
              ระดับน้ำ (ซม.) — ติดลบ = ต่ำกว่าผิวดิน
            </label>
            <input
              id="water-level"
              type="number"
              inputMode="numeric"
              value={levelCm}
              onChange={(e) => setLevelCm(e.target.value)}
              placeholder="เช่น -15"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="water-source">
                แหล่งน้ำ
              </label>
              <select
                id="water-source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={inputClass}
              >
                {WATER_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="water-equipment">
                อุปกรณ์
              </label>
              <select
                id="water-equipment"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className={inputClass}
              >
                {EQUIPMENT_TYPES.map((eq) => (
                  <option key={eq} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="water-duration">
              ระยะเวลาให้น้ำ (ชั่วโมง) — ถ้ามี
            </label>
            <input
              id="water-duration"
              type="number"
              min="0"
              inputMode="numeric"
              value={durationHr}
              onChange={(e) => setDurationHr(e.target.value)}
              placeholder="เช่น 6"
              className={inputClass}
            />
          </div>

          {error && <p className="text-[13px] text-[#e5484d]">{error}</p>}

          <button
            type="submit"
            className="mt-1 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
          >
            บันทึกน้ำ
          </button>
        </form>

        {history.length > 0 && (
          <section>
            <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
              ประวัติการบันทึกน้ำ
            </p>
            <div className="flex h-24 items-end gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              {[...history].reverse().map((h, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center justify-end gap-1"
                  title={`${h.date}: ${h.levelCm} ซม.`}
                >
                  <div
                    className={`w-full rounded-t ${h.levelCm >= 0 ? 'bg-[#3b82f6]' : 'bg-[var(--green-strong)]'}`}
                    style={{
                      height: `${(Math.abs(h.levelCm) / maxAbsLevel) * 100}%`,
                      minHeight: '4px',
                    }}
                  />
                </div>
              ))}
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {history.slice(0, 5).map((h, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-[12.5px] text-[var(--muted)]"
                >
                  <span>
                    {h.date} · {h.type}
                  </span>
                  <span className="font-medium text-[var(--text)] tabular-nums">
                    {h.levelCm} ซม.
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

export default WaterLogPage
