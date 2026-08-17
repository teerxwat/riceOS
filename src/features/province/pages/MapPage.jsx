// เจ้าของไฟล์: คนที่ 2 (feature province)
// แผนที่จังหวัดเต็มจอ: เปิด/ปิดชั้นสถานะ + คลิกหมุดดูข้อมูลศูนย์
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, Flame, TriangleAlert, ArrowRight } from 'lucide-react'
import { CENTERS, STATUS, fmt } from '../provinceData.js'
import { StatusChip } from '../components/ui.jsx'
import ProvinceMap from '../components/ProvinceMap.jsx'

export default function MapPage() {
  const [visible, setVisible] = useState(Object.keys(STATUS))
  const [selectedId, setSelectedId] = useState(null)
  const selected = CENTERS.find((c) => c.id === selectedId)

  const counts = useMemo(() => {
    const c = {}
    for (const ct of CENTERS) c[ct.status] = (c[ct.status] ?? 0) + 1
    return c
  }, [])

  const toggle = (key) =>
    setVisible((v) =>
      v.includes(key) ? v.filter((k) => k !== key) : [...v, key]
    )

  return (
    <div className="pv-cols pv-cols--map">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>แผนที่ศูนย์ข้าวในจังหวัด</h2>
          <span className="pv-muted">
            แสดง {CENTERS.filter((c) => visible.includes(c.status)).length} จาก{' '}
            {CENTERS.length} ศูนย์
          </span>
        </div>
        <ProvinceMap
          centers={CENTERS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          visibleStatuses={visible}
          height={640}
        />
        <div className="pv-map-footnotes">
          <span>
            <Flame size={14} className="pv-hot" /> จุดความร้อนวันนี้ 18 จุด
          </span>
          <span>
            <TriangleAlert size={14} className="pv-warn" /> จุดเสี่ยงการเผา 7
            พื้นที่
          </span>
        </div>
      </section>

      <div className="pv-stack">
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>
              <Layers size={17} /> ชั้นข้อมูลแผนที่
            </h2>
          </div>
          <ul className="pv-layer-list">
            {Object.entries(STATUS).map(([key, s]) => (
              <li key={key}>
                <label className="pv-check">
                  <input
                    type="checkbox"
                    checked={visible.includes(key)}
                    onChange={() => toggle(key)}
                  />
                  <i className="pv-chip-dot" style={{ background: s.color }} />
                  {s.label}
                  <span className="pv-muted">({counts[key] ?? 0} ศูนย์)</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="pv-card">
          <div className="pv-card-head">
            <h2>ข้อมูลศูนย์ที่เลือก</h2>
          </div>
          {selected ? (
            <div className="pv-map-selected">
              <b>{selected.name}</b>
              <span className="pv-muted">
                {selected.id} · อ.{selected.district}
              </span>
              <StatusChip status={selected.status} />
              <dl className="pv-mini-dl">
                <div>
                  <dt>สมาชิก</dt>
                  <dd>{fmt(selected.members)} ราย</dd>
                </div>
                <div>
                  <dt>ข้าวอบวันนี้</dt>
                  <dd>{fmt(selected.rice, 1)} ตัน</dd>
                </div>
                <div>
                  <dt>พื้นที่ AWD</dt>
                  <dd>{fmt(selected.awd)} ไร่</dd>
                </div>
                <div>
                  <dt>ซิงก์ล่าสุด</dt>
                  <dd>{selected.sync}</dd>
                </div>
              </dl>
              {selected.issue && (
                <p className="pv-issue-text">{selected.issue}</p>
              )}
              <Link to="../centers" className="pv-link">
                ดูในตารางศูนย์ <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <p className="pv-muted">คลิกหมุดบนแผนที่เพื่อดูรายละเอียดศูนย์</p>
          )}
        </section>
      </div>
    </div>
  )
}
