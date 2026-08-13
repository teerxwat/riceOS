// เจ้าของไฟล์: คนที่ 2 (feature province)
// ภาพรวมจังหวัด: KPI + แผนที่ + ตารางอำเภอ + AI Insight + ความคืบหน้า
import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { AlertTriangle, Bot, ArrowRight, Flame } from 'lucide-react'
import {
  PROVINCE_KPIS,
  DISTRICTS,
  CENTERS,
  PROGRESS_TRACKS,
  AI_INSIGHTS,
  AI_ACTIONS,
  fmt,
} from '../provinceData.js'
import { KpiCard, StatusChip, Donut } from '../components/ui.jsx'
import ProvinceMap, { MapLegend } from '../components/ProvinceMap.jsx'

export default function OverviewPage() {
  const { alerts } = useOutletContext()
  const [selectedId, setSelectedId] = useState(null)
  const selected = CENTERS.find((c) => c.id === selectedId)

  const counts = useMemo(() => {
    const c = {}
    for (const ct of CENTERS) c[ct.status] = (c[ct.status] ?? 0) + 1
    return c
  }, [])

  const urgent = CENTERS.filter((c) =>
    ['critical', 'issue', 'offline'].includes(c.status)
  )
  const unread = alerts.filter((a) => !a.read).length

  return (
    <div className="pv-stack">
      {/* KPI แถวบน */}
      <section className="pv-kpi-grid">
        {PROVINCE_KPIS.map((k) => (
          <KpiCard key={k.id} {...k} />
        ))}
      </section>

      <div className="pv-cols pv-cols--overview">
        {/* แผนที่ (การ์ดใหญ่ กิน 2 คอลัมน์) */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>แผนที่ศูนย์ข้าวในจังหวัด (แยกรายอำเภอ)</h2>
            <Link to="map" className="pv-link">
              ดูแผนที่เต็ม <ArrowRight size={14} />
            </Link>
          </div>
          <MapLegend counts={counts} />
          <ProvinceMap
            centers={CENTERS}
            selectedId={selectedId}
            onSelect={setSelectedId}
            height={560}
          />
          {selected ? (
            <div className="pv-map-info">
              <div>
                <b>{selected.name}</b>
                <span className="pv-muted">
                  {' '}
                  · {selected.id} · อ.{selected.district}
                </span>
              </div>
              <StatusChip status={selected.status} />
              {selected.issue && (
                <p className="pv-issue-text">{selected.issue}</p>
              )}
            </div>
          ) : (
            <p className="pv-muted pv-map-hint">
              <Flame size={14} /> จุดความร้อนวันนี้ 18 จุด ·
              ชี้พื้นที่อำเภอเพื่อดูผลงาน · คลิกหมุดเพื่อดูรายละเอียดศูนย์
            </p>
          )}
        </section>

        {/* คอลัมน์ AI */}
        <section className="pv-card pv-ai-card">
          <div className="pv-card-head">
            <h2>
              <Bot size={18} /> AI ผู้ช่วยจังหวัด
            </h2>
            <Link to="alerts" className="pv-link">
              แจ้งเตือน ({unread}) <ArrowRight size={14} />
            </Link>
          </div>
          <p className="pv-muted">ประเด็นสำคัญวันนี้</p>
          <ul className="pv-ai-list">
            {AI_INSIGHTS.map((ins) => (
              <li
                key={ins.title}
                className={`pv-ai-item pv-ai-item--${ins.level}`}
              >
                <b>{ins.title}</b>
                <p>{ins.detail}</p>
              </li>
            ))}
          </ul>
          <p className="pv-muted">คำแนะนำการดำเนินการ</p>
          <ol className="pv-ai-actions">
            {AI_ACTIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
          <Link to="reports" className="pv-btn pv-btn--primary">
            จัดทำแผนสนับสนุน <ArrowRight size={15} />
          </Link>
        </section>

        {/* ตารางอำเภอ 5 อันดับ */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>ผลงานรายอำเภอ (5 อันดับแรก)</h2>
            <Link to="compare" className="pv-link">
              เปรียบเทียบทั้งหมด <ArrowRight size={14} />
            </Link>
          </div>
          <table className="pv-table">
            <thead>
              <tr>
                <th>อำเภอ</th>
                <th className="num">ข้าวอบ (ตัน)</th>
                <th className="num">AWD (ไร่)</th>
                <th className="num">รายได้ (ลบ.)</th>
                <th className="num">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICTS.slice(0, 5).map((d, i) => (
                <tr key={d.name}>
                  <td>
                    <span className="pv-rank">{i + 1}</span> {d.name}
                  </td>
                  <td className="num">{fmt(d.rice, 1)}</td>
                  <td className="num">{fmt(d.awd)}</td>
                  <td className="num">{fmt(d.income, 2)}</td>
                  <td className="num">
                    <b className="pv-score">{fmt(d.score, 1)}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ศูนย์เร่งด่วน */}
        <section className="pv-card">
          <div className="pv-card-head">
            <h2>ศูนย์ที่ต้องการการสนับสนุนเร่งด่วน</h2>
            <Link to="centers" className="pv-link">
              ดูทุกศูนย์ <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="pv-urgent-list">
            {urgent.slice(0, 4).map((c) => (
              <li key={c.id}>
                <AlertTriangle size={16} className="pv-urgent-icon" />
                <div>
                  <b>{c.name}</b>
                  <span className="pv-muted"> · อ.{c.district}</span>
                  <p className="pv-muted">{c.issue ?? 'ต้องติดตามสถานะ'}</p>
                </div>
                <StatusChip status={c.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ความคืบหน้าโครงการ */}
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ความคืบหน้าการดำเนินงานรายจังหวัด</h2>
          <Link to="progress" className="pv-link">
            ดูรายละเอียด <ArrowRight size={14} />
          </Link>
        </div>
        <div className="pv-donut-row">
          {PROGRESS_TRACKS.map((t) => (
            <div key={t.id} className="pv-donut-cell">
              <Donut
                percent={(t.done / t.target) * 100}
                color={t.color}
                label={t.label}
              />
              <span className="pv-muted">
                {fmt(t.done)} / {fmt(t.target)} {t.unit}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
