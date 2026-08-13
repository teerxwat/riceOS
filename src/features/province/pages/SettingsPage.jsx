// เจ้าของไฟล์: คนที่ 2 (feature province)
// ตั้งค่า: เกณฑ์แจ้งเตือนและช่องทางรับการแจ้งเตือน (เก็บใน localStorage)
import { useState } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'

const KEY = 'riceos_province_settings'

const DEFAULTS = {
  offlineHours: 24,
  moistureMax: 28,
  waterMin: 20,
  incompleteMax: 15,
  channels: { app: true, line: true, sms: false, email: true },
  digest: 'daily',
}

function load() {
  try {
    const s = localStorage.getItem(KEY)
    return s ? { ...DEFAULTS, ...JSON.parse(s) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

const THRESHOLDS = [
  {
    key: 'offlineHours',
    label: 'แจ้งเตือนเมื่อศูนย์ออฟไลน์เกิน',
    unit: 'ชั่วโมง',
    min: 1,
    max: 72,
  },
  {
    key: 'moistureMax',
    label: 'ความชื้นข้าวเปลือกเกินเกณฑ์',
    unit: '%',
    min: 15,
    max: 40,
  },
  {
    key: 'waterMin',
    label: 'ระดับน้ำในคลองต่ำกว่า',
    unit: '%',
    min: 5,
    max: 60,
  },
  {
    key: 'incompleteMax',
    label: 'ข้อมูลแปลงไม่ครบเกิน',
    unit: '%',
    min: 5,
    max: 50,
  },
]

const CHANNELS = [
  { key: 'app', label: 'แอปพลิเคชัน' },
  { key: 'line', label: 'LINE' },
  { key: 'sms', label: 'SMS' },
  { key: 'email', label: 'อีเมล' },
]

export default function SettingsPage() {
  const [form, setForm] = useState(load)
  const [saved, setSaved] = useState(false)

  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }))
    setSaved(false)
  }

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(form))
    setSaved(true)
  }

  return (
    <div className="pv-stack pv-settings">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>เกณฑ์การแจ้งเตือน</h2>
        </div>
        <div className="pv-form-grid">
          {THRESHOLDS.map((t) => (
            <label key={t.key} className="pv-field">
              <span>{t.label}</span>
              <div className="pv-field-input">
                <input
                  type="number"
                  min={t.min}
                  max={t.max}
                  value={form[t.key]}
                  onChange={(e) => set({ [t.key]: Number(e.target.value) })}
                />
                <em>{t.unit}</em>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ช่องทางรับการแจ้งเตือน</h2>
        </div>
        <div className="pv-check-row">
          {CHANNELS.map((c) => (
            <label key={c.key} className="pv-check">
              <input
                type="checkbox"
                checked={form.channels[c.key]}
                onChange={(e) =>
                  set({
                    channels: { ...form.channels, [c.key]: e.target.checked },
                  })
                }
              />
              {c.label}
            </label>
          ))}
        </div>

        <div className="pv-card-head" style={{ marginTop: '1.2rem' }}>
          <h2>สรุปรายงานอัตโนมัติ</h2>
        </div>
        <div className="pv-radio-row">
          {[
            { v: 'daily', label: 'ทุกวัน 08:00 น.' },
            { v: 'weekly', label: 'ทุกวันจันทร์' },
            { v: 'off', label: 'ปิดการส่งอัตโนมัติ' },
          ].map((o) => (
            <label key={o.v} className="pv-check">
              <input
                type="radio"
                name="digest"
                checked={form.digest === o.v}
                onChange={() => set({ digest: o.v })}
              />
              {o.label}
            </label>
          ))}
        </div>
      </section>

      <div className="pv-settings-footer">
        <button type="button" className="pv-btn pv-btn--primary" onClick={save}>
          <Save size={15} /> บันทึกการตั้งค่า
        </button>
        {saved && (
          <span className="pv-report-done">
            <CheckCircle2 size={15} /> บันทึกแล้ว
          </span>
        )}
      </div>
    </div>
  )
}
