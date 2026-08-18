import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, CARBON_WALLET } from '../data/villageData'

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'
const labelClass = 'mb-1.5 block text-[13.5px] font-medium text-[var(--text)]'

// เกณฑ์ประเมินสถานะ AWD จากระดับน้ำ — ล้อกับ mockup (ระดับน้ำต่ำกว่าผิวดิน
// แต่ไม่เกิน -20 ซม. คือช่วงปลอดภัยของ AWD, ต่ำกว่านั้นเสี่ยงแห้งเกินไป,
// สูงกว่า 0 คือน้ำท่วมผิวดิน/กำลังเปิดน้ำอยู่)
function awdStatusFromLevel(cm) {
  if (cm >= 0) return 'เปิดน้ำ'
  if (cm >= -20) return 'เหมาะสม'
  return 'เสี่ยง/ผิดปกติ'
}

// mutate PLOTS/CARBON_WALLET ในฟังก์ชันนอกคอมโพเนนต์ (ไม่ใช่ตัวแปร `plot` ที่
// ผูกกับ render) — บันทึกน้ำแล้วถือเป็นหลักฐาน "บันทึกกิจกรรมของเกษตรกร"
// (MRV) และถ้าสถานะออกมาเหมาะสม (อยู่ในเกณฑ์ AWD) จะได้คาร์บอนเครดิตเพิ่ม
// เล็กน้อย จำลองว่าระบบคำนวณให้อัตโนมัติจากการทำ AWD ถูกวิธี ไม่มี backend
// จริง แก้ array ใน memory ตรงๆ เหมือนจุดอื่นของ feature นี้
function applyWaterLog(plotId, cm) {
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
  return newStatus
}

function WaterLogPage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)

  const [type, setType] = useState('เปิดน้ำ')
  const [levelCm, setLevelCm] = useState('')
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

  function handleSubmit(e) {
    e.preventDefault()
    if (levelCm === '') {
      setError('กรอกระดับน้ำ (ซม.) ก่อนบันทึก')
      return
    }
    const newStatus = applyWaterLog(plot.id, Number(levelCm))
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

        {error && <p className="text-[13px] text-[#e5484d]">{error}</p>}

        <button
          type="submit"
          className="mt-1 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
        >
          บันทึกน้ำ
        </button>
      </form>
    </VillageLayout>
  )
}

export default WaterLogPage
