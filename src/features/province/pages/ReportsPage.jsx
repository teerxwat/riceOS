// เจ้าของไฟล์: คนที่ 2 (feature province)
// รายงาน: ออกรายงานสรุประดับจังหวัด + อนุมัติรายงานจากศูนย์
import { useState } from 'react'
import {
  FileBarChart,
  Leaf,
  Droplets,
  Wrench,
  Download,
  Check,
  Undo2,
  CheckCheck,
} from 'lucide-react'
import { REPORT_TEMPLATES, INITIAL_PENDING_REPORTS } from '../provinceData.js'

const ICONS = { FileBarChart, Leaf, Droplets, Wrench }

export default function ReportsPage() {
  const [tab, setTab] = useState('summary')
  const [pending, setPending] = useState(INITIAL_PENDING_REPORTS)
  const [exported, setExported] = useState({})

  const setStatus = (id, status) =>
    setPending((list) => list.map((r) => (r.id === id ? { ...r, status } : r)))

  const waiting = pending.filter((r) => r.status === 'pending').length

  return (
    <div className="pv-stack">
      <div className="pv-tabs">
        <button
          type="button"
          className={`pv-tab${tab === 'summary' ? ' active' : ''}`}
          onClick={() => setTab('summary')}
        >
          รายงานสรุประดับจังหวัด
        </button>
        <button
          type="button"
          className={`pv-tab${tab === 'approve' ? ' active' : ''}`}
          onClick={() => setTab('approve')}
        >
          รายงานจากศูนย์ รออนุมัติ
          {waiting > 0 && <em className="pv-menu-badge">{waiting}</em>}
        </button>
      </div>

      {tab === 'summary' ? (
        <section className="pv-report-grid">
          {REPORT_TEMPLATES.map((t) => {
            const Icon = ICONS[t.icon] ?? FileBarChart
            const done = exported[t.id]
            return (
              <div key={t.id} className="pv-card pv-report-card">
                <div className="pv-report-icon">
                  <Icon size={22} />
                </div>
                <h3>{t.name}</h3>
                <p className="pv-muted">{t.desc}</p>
                <div className="pv-report-actions">
                  <button
                    type="button"
                    className="pv-btn pv-btn--primary"
                    onClick={() =>
                      setExported((e) => ({ ...e, [t.id]: 'PDF' }))
                    }
                  >
                    <Download size={15} /> PDF
                  </button>
                  <button
                    type="button"
                    className="pv-btn"
                    onClick={() =>
                      setExported((e) => ({ ...e, [t.id]: 'Excel' }))
                    }
                  >
                    <Download size={15} /> Excel
                  </button>
                </div>
                {done && (
                  <p className="pv-report-done">
                    <CheckCheck size={14} /> สร้างไฟล์ {done} แล้ว (ตัวอย่างระบบ
                    — ยังไม่ต่อ backend)
                  </p>
                )}
              </div>
            )
          })}
        </section>
      ) : (
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>รายงานจากศูนย์ที่รอตรวจสอบ ({waiting} ฉบับ)</h2>
          </div>
          <div className="pv-table-wrap">
            <table className="pv-table">
              <thead>
                <tr>
                  <th>ศูนย์ข้าวชุมชน</th>
                  <th>ประเภทรายงาน</th>
                  <th>วันที่ส่ง</th>
                  <th>สถานะ</th>
                  <th className="num">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <b>{r.center}</b>
                    </td>
                    <td>{r.type}</td>
                    <td>{r.sent}</td>
                    <td>
                      {r.status === 'pending' && (
                        <span className="pv-chip pv-chip--pending">
                          รออนุมัติ
                        </span>
                      )}
                      {r.status === 'approved' && (
                        <span className="pv-chip pv-chip--approved">
                          อนุมัติแล้ว
                        </span>
                      )}
                      {r.status === 'returned' && (
                        <span className="pv-chip pv-chip--returned">
                          ตีกลับแก้ไข
                        </span>
                      )}
                    </td>
                    <td className="num">
                      {r.status === 'pending' ? (
                        <span className="pv-row-actions">
                          <button
                            type="button"
                            className="pv-btn pv-btn--sm pv-btn--primary"
                            onClick={() => setStatus(r.id, 'approved')}
                          >
                            <Check size={14} /> อนุมัติ
                          </button>
                          <button
                            type="button"
                            className="pv-btn pv-btn--sm"
                            onClick={() => setStatus(r.id, 'returned')}
                          >
                            <Undo2 size={14} /> ตีกลับ
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="pv-btn pv-btn--sm"
                          onClick={() => setStatus(r.id, 'pending')}
                        >
                          ยกเลิก
                        </button>
                      )}
                    </td>
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
