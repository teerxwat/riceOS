// เจ้าของไฟล์: คนที่ 4 (feature technician)
// เครื่องจักรทั้งหมด: กรองตามประเภท/สถานะ + สุขภาพเครื่อง + เพิ่มอุปกรณ์ใหม่ (mock)
import { useState } from 'react'
import { Plus, X, CheckCircle2, PackagePlus } from 'lucide-react'
import { MACHINE_STATUS, MACHINE_TYPES, fmt } from '../technicianData.js'
import { CENTERS } from '../../province/provinceData.js'
import { useMachines, addMachine } from '../techStore.js'
import { ProgressBar } from '../../province/components/ui.jsx'

const healthColor = (h) =>
  h >= 80 ? '#3fae57' : h >= 50 ? '#e8b84b' : '#e5484d'

const EMPTY_FORM = {
  name: '',
  type: 'dryer',
  serial: '',
  centerId: CENTERS[0].id,
  installedAt: '',
  hours: 0,
  status: 'ok',
  note: '',
}

export default function MachinesPage() {
  const machines = useMachines()
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [savedId, setSavedId] = useState(null)

  const rows = machines.filter(
    (m) =>
      (typeFilter === 'all' || m.type === typeFilter) &&
      (statusFilter === 'all' || m.status === statusFilter)
  )

  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }))
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('กรุณากรอกชื่ออุปกรณ์')
      return
    }
    const c = CENTERS.find((x) => x.id === form.centerId)
    const id = addMachine({
      name: form.name.trim(),
      type: form.type,
      serial: form.serial.trim(),
      centerId: form.centerId,
      center: c?.name ?? '-',
      district: c?.district ?? '-',
      status: form.status,
      health: form.status === 'ok' ? 100 : 70,
      hours: Number(form.hours) || 0,
      lastService: form.installedAt || 'วันนี้',
      note: form.note.trim(),
    })
    setSavedId(id)
    setShowForm(false)
    setForm(EMPTY_FORM)
  }

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>เครื่องจักรทั้งหมด ({rows.length} เครื่อง)</h2>
          <div className="pv-row-actions">
            {savedId && (
              <span className="pv-report-done">
                <CheckCircle2 size={15} /> เพิ่มอุปกรณ์ {savedId} แล้ว
              </span>
            )}
            <button
              type="button"
              className="pv-btn pv-btn--primary"
              onClick={() => {
                setSavedId(null)
                setShowForm(true)
              }}
            >
              <Plus size={16} /> เพิ่มอุปกรณ์
            </button>
          </div>
        </div>

        <div className="pv-toolbar">
          <div className="pv-filter-chips">
            <button
              type="button"
              className={`pv-filter-chip${typeFilter === 'all' ? ' active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              ทุกประเภท
            </button>
            {Object.entries(MACHINE_TYPES).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`pv-filter-chip${typeFilter === key ? ' active' : ''}`}
                onClick={() => setTypeFilter(key)}
              >
                {label} ({machines.filter((m) => m.type === key).length})
              </button>
            ))}
          </div>
          <div className="pv-filter-chips">
            <button
              type="button"
              className={`pv-filter-chip${statusFilter === 'all' ? ' active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              ทุกสถานะ
            </button>
            {Object.entries(MACHINE_STATUS).map(([key, s]) => (
              <button
                key={key}
                type="button"
                className={`pv-filter-chip${statusFilter === key ? ' active' : ''}`}
                onClick={() => setStatusFilter(key)}
              >
                <i className="pv-chip-dot" style={{ background: s.color }} />
                {s.label} ({machines.filter((m) => m.status === key).length})
              </button>
            ))}
          </div>
        </div>

        <div className="pv-table-wrap">
          <table className="pv-table">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>เครื่องจักร</th>
                <th>ศูนย์ / อำเภอ</th>
                <th>ประเภท</th>
                <th className="num">ชม.ทำงาน</th>
                <th>สุขภาพเครื่อง</th>
                <th>ซ่อมล่าสุด</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => {
                const s = MACHINE_STATUS[m.status]
                return (
                  <tr
                    key={m.id + m.centerId}
                    className={m.isNew ? 'tc-row-new' : ''}
                  >
                    <td>
                      <b>{m.id}</b>
                      {m.isNew && <span className="tc-new-badge">ใหม่</span>}
                    </td>
                    <td>
                      {m.name}
                      {m.serial && (
                        <span className="pv-muted"> · S/N {m.serial}</span>
                      )}
                    </td>
                    <td>
                      {m.center}
                      <span className="pv-muted"> · อ.{m.district}</span>
                    </td>
                    <td>{MACHINE_TYPES[m.type]}</td>
                    <td className="num">{fmt(m.hours)}</td>
                    <td className="tc-health-cell">
                      <ProgressBar
                        percent={m.health}
                        color={healthColor(m.health)}
                      />
                      <small
                        style={{ color: healthColor(m.health) }}
                      >{`${m.health}%`}</small>
                    </td>
                    <td>{m.lastService}</td>
                    <td>
                      <span
                        className="pv-chip"
                        style={{
                          color: s.color,
                          background: `color-mix(in srgb, ${s.color} 16%, transparent)`,
                        }}
                      >
                        <i
                          className="pv-chip-dot"
                          style={{ background: s.color }}
                        />
                        {s.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal เพิ่มอุปกรณ์ */}
      {showForm && (
        <div className="tc-modal-backdrop" onClick={() => setShowForm(false)}>
          <form
            className="tc-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
          >
            <div className="pv-card-head">
              <h2>
                <PackagePlus size={19} /> เพิ่มอุปกรณ์ใหม่
              </h2>
              <button
                type="button"
                className="pv-icon-btn"
                onClick={() => setShowForm(false)}
                aria-label="ปิด"
              >
                <X size={16} />
              </button>
            </div>

            <div className="tc-form-grid">
              <label className="tc-field tc-field--wide">
                <span>
                  ชื่ออุปกรณ์ / เครื่องจักร <em>*</em>
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                  placeholder="เช่น เครื่องอบข้าว DR-300 #2"
                  autoFocus
                />
              </label>

              <label className="tc-field">
                <span>ประเภทอุปกรณ์</span>
                <select
                  value={form.type}
                  onChange={(e) => set({ type: e.target.value })}
                >
                  {Object.entries(MACHINE_TYPES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="tc-field">
                <span>หมายเลขเครื่อง (S/N)</span>
                <input
                  type="text"
                  value={form.serial}
                  onChange={(e) => set({ serial: e.target.value })}
                  placeholder="เช่น DR300-2567-018"
                />
              </label>

              <label className="tc-field tc-field--wide">
                <span>ศูนย์ข้าวที่ติดตั้ง</span>
                <select
                  value={form.centerId}
                  onChange={(e) => set({ centerId: e.target.value })}
                >
                  {CENTERS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · อ.{c.district}
                    </option>
                  ))}
                </select>
              </label>

              <label className="tc-field">
                <span>วันที่ติดตั้ง</span>
                <input
                  type="date"
                  value={form.installedAt}
                  onChange={(e) => set({ installedAt: e.target.value })}
                />
              </label>

              <label className="tc-field">
                <span>ชั่วโมงทำงานเริ่มต้น</span>
                <input
                  type="number"
                  min={0}
                  value={form.hours}
                  onChange={(e) => set({ hours: e.target.value })}
                />
              </label>

              <label className="tc-field">
                <span>สถานะเริ่มต้น</span>
                <select
                  value={form.status}
                  onChange={(e) => set({ status: e.target.value })}
                >
                  {Object.entries(MACHINE_STATUS).map(([key, s]) => (
                    <option key={key} value={key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="tc-field tc-field--wide">
                <span>หมายเหตุ</span>
                <textarea
                  rows={2}
                  value={form.note}
                  onChange={(e) => set({ note: e.target.value })}
                  placeholder="เช่น ติดตั้งทดแทนเครื่องเดิมที่ปลดระวาง"
                />
              </label>
            </div>

            {error && <p className="tc-form-error">{error}</p>}

            <div className="tc-modal-footer">
              <button
                type="button"
                className="pv-btn"
                onClick={() => setShowForm(false)}
              >
                ยกเลิก
              </button>
              <button type="submit" className="pv-btn pv-btn--primary">
                <Plus size={15} /> บันทึกอุปกรณ์
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
