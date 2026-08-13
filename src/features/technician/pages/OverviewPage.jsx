// เจ้าของไฟล์: คนที่ 4 (feature technician)
// ภาพรวมช่าง: KPI + แผนที่งานซ่อม + ใบงานค้าง + สถานะเครื่องจักร + อะไหล่ต่ำ
import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  ArrowRight,
  Wrench,
  OctagonAlert,
  Cog,
  TriangleAlert,
  CheckCircle2,
  Package,
} from 'lucide-react'
import {
  MACHINES,
  MACHINE_STATUS,
  MACHINE_TYPES,
  WO_PRIORITY,
  WO_STATUS,
  NATIONAL_SUMMARY,
  machineOf,
  fmt,
} from '../technicianData.js'
import { useWorkOrders, useParts } from '../techStore.js'
import { setProvinceId } from '../../province/provinceStore.js'
import { Donut } from '../../province/components/ui.jsx'
import TechMap, {
  TechMapLegend,
  NationalLegend,
} from '../components/TechMap.jsx'

export default function OverviewPage() {
  const { isChief } = useOutletContext()
  const workOrders = useWorkOrders()
  const parts = useParts()
  const [selectedId, setSelectedId] = useState(null)

  const open = workOrders.filter((w) => w.status !== 'done')
  const critical = open.filter((w) => w.priority === 'critical')
  const doneToday = workOrders.filter((w) => w.status === 'done').length
  const risky = MACHINES.filter((m) =>
    ['watch', 'repair', 'down'].includes(m.status)
  )
  const lowParts = parts.filter((p) => p.stock < p.min)
  const selected = workOrders.find((w) => w.id === selectedId)

  const prioCounts = {}
  for (const w of open)
    prioCounts[w.priority] = (prioCounts[w.priority] ?? 0) + 1

  const kpis = [
    {
      label: 'งานซ่อมค้าง',
      value: open.length,
      unit: 'งาน',
      Icon: Wrench,
      tone: 'gold',
    },
    {
      label: 'งานวิกฤต',
      value: critical.length,
      unit: 'งาน',
      Icon: OctagonAlert,
      tone: 'red',
    },
    {
      label: 'เครื่องจักรทั้งหมด',
      value: MACHINES.length,
      unit: 'เครื่อง',
      Icon: Cog,
      tone: 'teal',
    },
    {
      label: 'เครื่องเสี่ยงเสีย',
      value: risky.length,
      unit: 'เครื่อง',
      Icon: TriangleAlert,
      tone: 'gold',
    },
    {
      label: 'งานเสร็จวันนี้',
      value: doneToday,
      unit: 'งาน',
      Icon: CheckCircle2,
      tone: 'green',
    },
    {
      label: 'อะไหล่ใกล้หมด',
      value: lowParts.length,
      unit: 'รายการ',
      Icon: Package,
      tone: 'red',
    },
  ]

  const statusCounts = {}
  for (const m of MACHINES)
    statusCounts[m.status] = (statusCounts[m.status] ?? 0) + 1
  const okPercent = ((statusCounts.ok ?? 0) / MACHINES.length) * 100

  return (
    <div className="pv-stack">
      <section className="pv-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className={`pv-kpi tc-kpi--${k.tone}`}>
            <div className="pv-kpi-icon">
              <k.Icon size={20} />
            </div>
            <div className="pv-kpi-body">
              <span className="pv-kpi-label">{k.label}</span>
              <span className="pv-kpi-value">
                {fmt(k.value)}
                <small> {k.unit}</small>
              </span>
            </div>
          </div>
        ))}
      </section>

      <div className="pv-cols pv-cols--overview">
        {/* แผนที่งานซ่อม: ช่างใหญ่เห็นทั้งประเทศ / ช่างจังหวัดเห็นจังหวัดตัวเอง */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>
              {isChief
                ? 'แผนที่งานซ่อมทั้งประเทศ'
                : 'แผนที่งานซ่อมแบบเรียลไทม์'}
            </h2>
            <Link to="map" className="pv-link">
              ดูแผนที่เต็ม <ArrowRight size={14} />
            </Link>
          </div>
          {isChief ? <NationalLegend /> : <TechMapLegend counts={prioCounts} />}
          <TechMap
            national={isChief}
            workOrders={workOrders}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onSelectProvince={setProvinceId}
            height={520}
          />
          {selected ? (
            <div className="pv-map-info">
              <div>
                <b>{selected.id}</b>
                <span className="pv-muted">
                  {' '}
                  · {machineOf(selected)?.name} · อ.
                  {machineOf(selected)?.district}
                </span>
                <p className="pv-issue-text">{selected.issue}</p>
              </div>
              <span
                className="pv-chip"
                style={{
                  color: WO_PRIORITY[selected.priority].color,
                  background: `color-mix(in srgb, ${WO_PRIORITY[selected.priority].color} 16%, transparent)`,
                }}
              >
                {WO_PRIORITY[selected.priority].label}
              </span>
            </div>
          ) : (
            <p className="pv-muted pv-map-hint">
              {isChief
                ? 'ตัวเลข = งานค้างรายจังหวัด · ซูมเข้าไปในจังหวัดเพื่อเห็นจุดสถานีและสถานะรายอำเภอ'
                : 'คลิกหมุดเพื่อดูใบงาน · สีหมุดตามระดับความเร่งด่วน'}
            </p>
          )}
        </section>

        {/* ใบงานค้าง */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>งานซ่อมค้างที่ต้องดำเนินการ</h2>
            <Link to="workorders" className="pv-link">
              ดูทั้งหมด <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="tc-wo-list">
            {open.slice(0, 6).map((wo) => {
              const m = machineOf(wo)
              return (
                <li key={wo.id}>
                  <div className="tc-wo-main">
                    <b>{wo.id}</b>
                    <span className="pv-muted">
                      {m?.name} · {m?.center}
                    </span>
                    <p className="pv-muted">{wo.issue}</p>
                  </div>
                  <div className="tc-wo-side">
                    <span
                      className="pv-chip"
                      style={{
                        color: WO_PRIORITY[wo.priority].color,
                        background: `color-mix(in srgb, ${WO_PRIORITY[wo.priority].color} 16%, transparent)`,
                      }}
                    >
                      {WO_PRIORITY[wo.priority].label}
                    </span>
                    <small
                      className="tc-wo-status"
                      style={{ color: WO_STATUS[wo.status].color }}
                    >
                      {WO_STATUS[wo.status].label}
                    </small>
                    <small className="pv-muted">SLA {wo.sla}</small>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* คอลัมน์ขวา: สถานะเครื่องจักร + อะไหล่ต่ำ */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>สถานะเครื่องจักร</h2>
            <Link to="machines" className="pv-link">
              ดูทั้งหมด <ArrowRight size={14} />
            </Link>
          </div>
          <div className="tc-machine-donut">
            <Donut percent={okPercent} color="#3fae57" size={104} />
            <div className="tc-machine-legend">
              {Object.entries(MACHINE_STATUS).map(([key, s]) => (
                <span key={key} className="pv-legend-item">
                  <i className="pv-chip-dot" style={{ background: s.color }} />
                  {s.label} ({statusCounts[key] ?? 0})
                </span>
              ))}
            </div>
          </div>
          <div className="tc-type-row">
            {Object.entries(MACHINE_TYPES).map(([key, label]) => (
              <div key={key} className="tc-type-cell">
                <b>{MACHINES.filter((m) => m.type === key).length}</b>
                <small>{label}</small>
              </div>
            ))}
          </div>

          <div className="pv-card-head" style={{ marginTop: '1.1rem' }}>
            <h2>อะไหล่ใกล้หมดสต๊อก</h2>
            <Link to="parts" className="pv-link">
              คลังอะไหล่ <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="tc-part-list">
            {lowParts.map((p) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <b className="tc-low">
                  {p.stock}/{p.min} {p.unit}
                </b>
              </li>
            ))}
            {lowParts.length === 0 && (
              <li className="pv-muted">สต๊อกเพียงพอทุกรายการ</li>
            )}
          </ul>
        </section>
      </div>

      {/* ช่างใหญ่: ภาพรวมรายจังหวัดทั้งประเทศ */}
      {isChief && (
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>ภาพรวมรายจังหวัดทั้งประเทศ</h2>
            <span className="pv-muted">
              เลือกจังหวัดจากแถบด้านบนเพื่อเจาะดูรายจังหวัด
            </span>
          </div>
          <div className="pv-table-wrap">
            <table className="pv-table">
              <thead>
                <tr>
                  <th>จังหวัด</th>
                  <th className="num">เครื่องจักร</th>
                  <th className="num">งานค้าง</th>
                  <th className="num">งานวิกฤต</th>
                  <th className="num">ออนไลน์ (%)</th>
                </tr>
              </thead>
              <tbody>
                {NATIONAL_SUMMARY.map((r) => (
                  <tr key={r.province}>
                    <td>
                      <b>{r.province}</b>
                    </td>
                    <td className="num">{fmt(r.machines)}</td>
                    <td className="num">{r.backlog}</td>
                    <td className="num">
                      {r.critical > 0 ? (
                        <span className="pv-issue-count">{r.critical}</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="num">{r.online}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
