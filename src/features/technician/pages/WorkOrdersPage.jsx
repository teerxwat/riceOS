// เจ้าของไฟล์: คนที่ 4 (feature technician)
// ใบงานซ่อม: กรองสถานะ/ความเร่งด่วน + อัปเดตสถานะงาน + ช่างใหญ่มอบหมายงานได้
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { WO_PRIORITY, WO_STATUS, TEAM, machineOf } from '../technicianData.js'
import { useWorkOrders, updateWorkOrder } from '../techStore.js'

export default function WorkOrdersPage() {
  const { isChief } = useOutletContext()
  const workOrders = useWorkOrders()
  const [statusFilter, setStatusFilter] = useState('all')
  const [prioFilter, setPrioFilter] = useState('all')

  const rows = workOrders.filter(
    (w) =>
      (statusFilter === 'all' || w.status === statusFilter) &&
      (prioFilter === 'all' || w.priority === prioFilter)
  )

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ใบงานซ่อม ({rows.length} รายการ)</h2>
          {isChief && (
            <span className="pv-muted">
              ช่างใหญ่: มอบหมายงานให้ทีมช่างได้จากคอลัมน์ผู้รับผิดชอบ
            </span>
          )}
        </div>

        <div className="pv-toolbar">
          <div className="pv-filter-chips">
            <button
              type="button"
              className={`pv-filter-chip${statusFilter === 'all' ? ' active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              ทุกสถานะ
            </button>
            {Object.entries(WO_STATUS).map(([key, s]) => (
              <button
                key={key}
                type="button"
                className={`pv-filter-chip${statusFilter === key ? ' active' : ''}`}
                onClick={() => setStatusFilter(key)}
              >
                <i className="pv-chip-dot" style={{ background: s.color }} />
                {s.label} ({workOrders.filter((w) => w.status === key).length})
              </button>
            ))}
          </div>
          <div className="pv-filter-chips">
            <button
              type="button"
              className={`pv-filter-chip${prioFilter === 'all' ? ' active' : ''}`}
              onClick={() => setPrioFilter('all')}
            >
              ทุกระดับ
            </button>
            {Object.entries(WO_PRIORITY).map(([key, p]) => (
              <button
                key={key}
                type="button"
                className={`pv-filter-chip${prioFilter === key ? ' active' : ''}`}
                onClick={() => setPrioFilter(key)}
              >
                <i className="pv-chip-dot" style={{ background: p.color }} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pv-table-wrap">
          <table className="pv-table">
            <thead>
              <tr>
                <th>เลขใบงาน</th>
                <th>เครื่องจักร / ศูนย์</th>
                <th>อาการ</th>
                <th>ระดับ</th>
                <th>กำหนดเสร็จ</th>
                <th>ผู้รับผิดชอบ</th>
                <th>สถานะ</th>
                <th className="num">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((wo) => {
                const m = machineOf(wo)
                const st = WO_STATUS[wo.status]
                return (
                  <tr key={wo.id}>
                    <td>
                      <b>{wo.id}</b>
                    </td>
                    <td>
                      {m?.name}
                      <span className="pv-muted"> · {m?.center}</span>
                    </td>
                    <td>{wo.issue}</td>
                    <td>
                      <span
                        className="pv-chip"
                        style={{
                          color: WO_PRIORITY[wo.priority].color,
                          background: `color-mix(in srgb, ${WO_PRIORITY[wo.priority].color} 16%, transparent)`,
                        }}
                      >
                        {WO_PRIORITY[wo.priority].label}
                      </span>
                    </td>
                    <td>{wo.due}</td>
                    <td>
                      {isChief ? (
                        <select
                          className="tc-assign"
                          value={wo.assignee ?? ''}
                          onChange={(e) =>
                            updateWorkOrder(wo.id, {
                              assignee: e.target.value || null,
                              status:
                                wo.status === 'waiting' && e.target.value
                                  ? 'accepted'
                                  : wo.status,
                            })
                          }
                        >
                          <option value="">— ยังไม่มอบหมาย —</option>
                          {TEAM.map((t) => (
                            <option key={t.name} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        (wo.assignee ?? (
                          <span className="pv-muted">ยังไม่มอบหมาย</span>
                        ))
                      )}
                    </td>
                    <td>
                      <span
                        className="pv-chip"
                        style={{
                          color: st.color,
                          background: `color-mix(in srgb, ${st.color} 16%, transparent)`,
                        }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="num">
                      {st.next ? (
                        <button
                          type="button"
                          className="pv-btn pv-btn--sm pv-btn--primary"
                          onClick={() =>
                            updateWorkOrder(wo.id, { status: st.next })
                          }
                        >
                          {st.nextLabel}
                        </button>
                      ) : (
                        <span className="pv-muted">ปิดงานแล้ว</span>
                      )}
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="pv-empty">
                    ไม่มีใบงานตามเงื่อนไข
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
