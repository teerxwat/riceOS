// เจ้าของไฟล์: คนที่ 2 (feature province)
// ศูนย์ข้าวชุมชน: ค้นหา + กรองสถานะ + เรียงคอลัมน์ + คลิกดูรายละเอียด
import { useMemo, useState } from 'react'
import { Search, ArrowUpDown, X } from 'lucide-react'
import { CENTERS, STATUS, fmt } from '../provinceData.js'
import { StatusChip, ProgressBar } from '../components/ui.jsx'

const COLUMNS = [
  { key: 'name', label: 'ศูนย์ข้าวชุมชน' },
  { key: 'district', label: 'อำเภอ' },
  { key: 'members', label: 'สมาชิก (ราย)', num: true },
  { key: 'rice', label: 'ข้าวอบวันนี้ (ตัน)', num: true },
  { key: 'awd', label: 'พื้นที่ AWD (ไร่)', num: true },
  { key: 'carbon', label: 'คาร์บอน (tCO₂e)', num: true },
  { key: 'status', label: 'สถานะ' },
]

export default function CentersPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sort, setSort] = useState({ key: 'rice', dir: -1 })
  const [selectedId, setSelectedId] = useState(null)

  const rows = useMemo(() => {
    let list = CENTERS.filter(
      (c) =>
        (statusFilter === 'all' || c.status === statusFilter) &&
        (c.name.includes(query) ||
          c.id.toLowerCase().includes(query.toLowerCase()) ||
          c.district.includes(query))
    )
    list = [...list].sort((a, b) => {
      const va = a[sort.key]
      const vb = b[sort.key]
      if (typeof va === 'number') return (va - vb) * sort.dir
      return String(va).localeCompare(String(vb), 'th') * sort.dir
    })
    return list
  }, [query, statusFilter, sort])

  const selected = CENTERS.find((c) => c.id === selectedId)

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }))

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ศูนย์ข้าวชุมชนในจังหวัด ({rows.length} แห่ง)</h2>
        </div>

        <div className="pv-toolbar">
          <label className="pv-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อศูนย์ / รหัส / อำเภอ..."
            />
          </label>
          <div className="pv-filter-chips">
            <button
              type="button"
              className={`pv-filter-chip${statusFilter === 'all' ? ' active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              ทั้งหมด ({CENTERS.length})
            </button>
            {Object.entries(STATUS).map(([key, s]) => {
              const n = CENTERS.filter((c) => c.status === key).length
              return (
                <button
                  key={key}
                  type="button"
                  className={`pv-filter-chip${statusFilter === key ? ' active' : ''}`}
                  style={{ '--chip-color': s.color }}
                  onClick={() => setStatusFilter(key)}
                >
                  <i className="pv-chip-dot" style={{ background: s.color }} />
                  {s.label} ({n})
                </button>
              )
            })}
          </div>
        </div>

        <div className="pv-table-wrap">
          <table className="pv-table pv-table--hover">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={col.num ? 'num' : ''}
                    onClick={() => toggleSort(col.key)}
                  >
                    <span className="pv-th-sort">
                      {col.label} <ArrowUpDown size={12} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className={c.id === selectedId ? 'selected' : ''}
                  onClick={() =>
                    setSelectedId(c.id === selectedId ? null : c.id)
                  }
                >
                  <td>
                    <b>{c.name}</b>
                    <span className="pv-muted"> · {c.id}</span>
                  </td>
                  <td>{c.district}</td>
                  <td className="num">{fmt(c.members)}</td>
                  <td className="num">{fmt(c.rice, 1)}</td>
                  <td className="num">{fmt(c.awd)}</td>
                  <td className="num">{fmt(c.carbon)}</td>
                  <td>
                    <StatusChip status={c.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length} className="pv-empty">
                    ไม่พบศูนย์ที่ตรงกับเงื่อนไข
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <section className="pv-card pv-detail">
          <div className="pv-card-head">
            <h2>
              {selected.name} <span className="pv-muted">· {selected.id}</span>
            </h2>
            <button
              type="button"
              className="pv-icon-btn"
              onClick={() => setSelectedId(null)}
              aria-label="ปิดรายละเอียด"
            >
              <X size={16} />
            </button>
          </div>
          <div className="pv-detail-grid">
            <div className="pv-detail-item">
              <span className="pv-muted">สถานะ</span>
              <StatusChip status={selected.status} />
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">อำเภอ</span>
              <b>{selected.district}</b>
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">สมาชิก</span>
              <b>{fmt(selected.members)} ราย</b>
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">ข้าวอบวันนี้</span>
              <b>{fmt(selected.rice, 1)} ตัน</b>
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">พื้นที่ AWD</span>
              <b>{fmt(selected.awd)} ไร่</b>
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">คาร์บอนสะสม</span>
              <b>{fmt(selected.carbon)} tCO₂e</b>
            </div>
            <div className="pv-detail-item">
              <span className="pv-muted">ซิงก์ข้อมูลล่าสุด</span>
              <b>{selected.sync}</b>
            </div>
            <div className="pv-detail-item pv-detail-item--wide">
              <span className="pv-muted">
                สัดส่วน AWD เทียบเป้าศูนย์ (2,500 ไร่)
              </span>
              <ProgressBar percent={(selected.awd / 2500) * 100} />
            </div>
            {selected.issue && (
              <div className="pv-detail-item pv-detail-item--wide">
                <span className="pv-muted">ปัญหาที่ต้องติดตาม</span>
                <p className="pv-issue-text">{selected.issue}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
