import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, RICE_VARIETIES } from '../data/villageData'

const inputClass =
  'h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[15px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30'
const labelClass = 'mb-1.5 block text-[13.5px] font-medium text-[var(--text)]'

function nextPlotId() {
  return PLOTS.reduce((max, p) => Math.max(max, p.id), 0) + 1
}

// เพิ่มแปลงเข้า PLOTS ตรงๆ (module-level array) — ไม่มี backend จริง วิธีนี้
// ทำให้แปลงใหม่โผล่ในหน้า "แปลงของฉัน"/หน้าแรกได้ทันทีในเซสชันนี้ โดยไม่ต้อง
// เพิ่ม state management ข้ามหน้า — reload หน้าเว็บแล้วข้อมูลจะรีเซ็ตเหมือน
// mock data ส่วนอื่นๆ ของ feature นี้ (บันทึกไว้ใน TEST_CASES.md แล้ว)
function AddPlotPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    variety: RICE_VARIETIES[0],
    area: '',
    plantedDate: '',
    harvestDate: '',
  })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.area || Number(form.area) <= 0) {
      setError('กรอกชื่อแปลงและพื้นที่ (ไร่) ให้ครบก่อนบันทึก')
      return
    }
    PLOTS.push({
      id: nextPlotId(),
      name: form.name.trim(),
      variety: form.variety,
      area: Number(form.area),
      plantedDate: form.plantedDate.trim() || 'ยังไม่ระบุ',
      harvestDate: form.harvestDate.trim() || 'ยังไม่ระบุ',
      status: 'กำลังปลูก',
      progressPct: 0,
    })
    navigate('/village/plots')
  }

  return (
    <VillageLayout title="เพิ่มแปลงใหม่" backTo="/village/plots">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass} htmlFor="plot-name">
            ชื่อแปลง
          </label>
          <input
            id="plot-name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="เช่น นาแปลงหลังบ้าน"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="plot-variety">
            พันธุ์ข้าว
          </label>
          <select
            id="plot-variety"
            value={form.variety}
            onChange={(e) => update('variety', e.target.value)}
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
          <label className={labelClass} htmlFor="plot-area">
            พื้นที่ (ไร่)
          </label>
          <input
            id="plot-area"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            value={form.area}
            onChange={(e) => update('area', e.target.value)}
            placeholder="เช่น 12.5"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="plot-planted">
            วันปลูก (ถ้ามี)
          </label>
          <input
            id="plot-planted"
            value={form.plantedDate}
            onChange={(e) => update('plantedDate', e.target.value)}
            placeholder="เช่น 5 เม.ย. 2567"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="plot-harvest">
            คาดเก็บเกี่ยว (ถ้ามี)
          </label>
          <input
            id="plot-harvest"
            value={form.harvestDate}
            onChange={(e) => update('harvestDate', e.target.value)}
            placeholder="เช่น 10 ก.ย. 2567"
            className={inputClass}
          />
        </div>

        {error && <p className="text-[13px] text-[#e5484d]">{error}</p>}

        <button
          type="submit"
          className="mt-1 min-h-12 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[15px] font-bold text-white active:scale-[0.99]"
        >
          บันทึกแปลงนา
        </button>
      </form>
    </VillageLayout>
  )
}

export default AddPlotPage
