// เจ้าของไฟล์: คนที่ 4 (feature technician)
// แผนที่งานซ่อมเต็มจอ:
// - ช่างจังหวัด: เปิด/ปิดชั้นตามระดับความเร่งด่วน + คลิกหมุดดูใบงาน
// - ช่างใหญ่: แผนที่ทั้งประเทศ + แผงเลือกจังหวัดในโครงการ
import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Layers, ArrowRight, MapPinned } from 'lucide-react'
import {
  WO_PRIORITY,
  WO_STATUS,
  NATIONAL_SUMMARY,
  machineOf,
  centerOf,
  fmt,
} from '../technicianData.js'
import { useWorkOrders } from '../techStore.js'
import { useProvinceId, setProvinceId } from '../../province/provinceStore.js'
import TechMap, { NationalLegend } from '../components/TechMap.jsx'

export default function MapPage() {
  const { isChief } = useOutletContext()
  const workOrders = useWorkOrders()
  const provinceId = useProvinceId()
  const [visible, setVisible] = useState(Object.keys(WO_PRIORITY))
  const [selectedId, setSelectedId] = useState(null)
  const selected = workOrders.find((w) => w.id === selectedId)

  const open = workOrders.filter((w) => w.status !== 'done')
  const counts = {}
  for (const w of open) counts[w.priority] = (counts[w.priority] ?? 0) + 1

  const toggle = (key) =>
    setVisible((v) =>
      v.includes(key) ? v.filter((k) => k !== key) : [...v, key]
    )

  // ── โหมดช่างใหญ่: ทั้งประเทศ ──
  if (isChief) {
    const active = NATIONAL_SUMMARY.find((p) => p.id === provinceId)
    return (
      <div className="pv-cols pv-cols--map">
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>แผนที่งานซ่อมทั้งประเทศ</h2>
            <span className="pv-muted">
              จังหวัดในโครงการ {NATIONAL_SUMMARY.length} จังหวัด · งานค้างรวม{' '}
              {NATIONAL_SUMMARY.reduce((s, p) => s + p.backlog, 0)} งาน
            </span>
          </div>
          <NationalLegend />
          <TechMap
            national
            workOrders={workOrders}
            onSelectProvince={setProvinceId}
            height={620}
          />
        </section>

        <div className="pv-stack">
          <section className="pv-card">
            <div className="pv-card-head">
              <h2>
                <MapPinned size={17} /> จังหวัดในโครงการ
              </h2>
            </div>
            <ul className="tc-prov-list">
              {NATIONAL_SUMMARY.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className={`tc-prov-item${p.id === provinceId ? ' active' : ''}`}
                    onClick={() => setProvinceId(p.id)}
                  >
                    <b>จ.{p.province}</b>
                    <span className="pv-muted">
                      เครื่องจักร {fmt(p.machines)} · งานค้าง {p.backlog}
                      {p.critical > 0 && (
                        <em className="tc-low"> · วิกฤต {p.critical}</em>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {active && (
            <section className="pv-card">
              <div className="pv-card-head">
                <h2>จังหวัดที่เลือก: {active.province}</h2>
              </div>
              <dl className="pv-mini-dl">
                <div>
                  <dt>เครื่องจักร</dt>
                  <dd>{fmt(active.machines)} เครื่อง</dd>
                </div>
                <div>
                  <dt>ออนไลน์</dt>
                  <dd>{active.online}%</dd>
                </div>
                <div>
                  <dt>งานค้าง</dt>
                  <dd>{active.backlog} งาน</dd>
                </div>
                <div>
                  <dt>งานวิกฤต</dt>
                  <dd>{active.critical} งาน</dd>
                </div>
              </dl>
              <Link to="../workorders" className="pv-btn pv-btn--primary">
                ดูใบงานของจังหวัดนี้ <ArrowRight size={15} />
              </Link>
            </section>
          )}
        </div>
      </div>
    )
  }

  // ── โหมดช่างจังหวัด ──
  return (
    <div className="pv-cols pv-cols--map">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>แผนที่งานซ่อมในจังหวัด</h2>
          <span className="pv-muted">
            งานค้าง {open.filter((w) => visible.includes(w.priority)).length}{' '}
            จาก {open.length} งาน
          </span>
        </div>
        <TechMap
          workOrders={workOrders}
          selectedId={selectedId}
          onSelect={setSelectedId}
          visiblePriorities={visible}
          height={620}
        />
      </section>

      <div className="pv-stack">
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>
              <Layers size={17} /> ระดับความเร่งด่วน
            </h2>
          </div>
          <ul className="pv-layer-list">
            {Object.entries(WO_PRIORITY).map(([key, p]) => (
              <li key={key}>
                <label className="pv-check">
                  <input
                    type="checkbox"
                    checked={visible.includes(key)}
                    onChange={() => toggle(key)}
                  />
                  <i className="pv-chip-dot" style={{ background: p.color }} />
                  {p.label}
                  <span className="pv-muted">({counts[key] ?? 0} งาน)</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="pv-card">
          <div className="pv-card-head">
            <h2>ใบงานที่เลือก</h2>
          </div>
          {selected ? (
            <div className="pv-map-selected">
              <b>{selected.id}</b>
              <span className="pv-muted">
                {machineOf(selected)?.name} · {centerOf(selected)?.name}
              </span>
              <span
                className="pv-chip"
                style={{
                  color: WO_PRIORITY[selected.priority].color,
                  background: `color-mix(in srgb, ${WO_PRIORITY[selected.priority].color} 16%, transparent)`,
                }}
              >
                {WO_PRIORITY[selected.priority].label} ·{' '}
                {WO_STATUS[selected.status].label}
              </span>
              <dl className="pv-mini-dl">
                <div>
                  <dt>อาการ</dt>
                  <dd>{selected.issue}</dd>
                </div>
                <div>
                  <dt>กำหนดเสร็จ</dt>
                  <dd>{selected.due}</dd>
                </div>
                <div>
                  <dt>SLA เหลือ</dt>
                  <dd>{selected.sla}</dd>
                </div>
                <div>
                  <dt>ผู้รับผิดชอบ</dt>
                  <dd>{selected.assignee ?? 'ยังไม่มอบหมาย'}</dd>
                </div>
              </dl>
              <Link to="../workorders" className="pv-btn pv-btn--primary">
                เปิดใบงาน <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <p className="pv-muted">คลิกหมุดบนแผนที่เพื่อดูรายละเอียดใบงาน</p>
          )}
        </section>
      </div>
    </div>
  )
}
