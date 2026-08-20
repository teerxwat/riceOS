// เจ้าของไฟล์: คนที่ 2 (feature province)
// ความคืบหน้าโครงการ: ภาพรวม 5 ด้าน + เจาะรายอำเภอ
import { useState } from 'react'
import { PROGRESS_TRACKS, DISTRICT_PROGRESS, fmt } from '../provinceData.js'
import { Donut, ProgressBar } from '../components/ui.jsx'

export default function ProgressPage() {
  const [track, setTrack] = useState(PROGRESS_TRACKS[0])

  const rows = [...DISTRICT_PROGRESS].sort((a, b) => b[track.id] - a[track.id])

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ความคืบหน้าโครงการทั้งจังหวัด</h2>
        </div>
        <div className="pv-donut-row">
          {PROGRESS_TRACKS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`pv-donut-cell pv-donut-cell--btn${
                track.id === t.id ? ' active' : ''
              }`}
              onClick={() => setTrack(t)}
            >
              <Donut
                percent={(t.done / t.target) * 100}
                color={t.color}
                label={t.label}
              />
              <span className="pv-muted">
                {fmt(t.done)} / {fmt(t.target)} {t.unit}
              </span>
            </button>
          ))}
        </div>
        <p className="pv-muted pv-hint">
          คลิกที่การ์ดเพื่อดูความคืบหน้าด้านนั้นแยกรายอำเภอ
        </p>
      </section>

      <section className="pv-card">
        <div className="pv-card-head">
          <h2>
            {track.label} — รายอำเภอ
            <span
              className="pv-chip"
              style={{
                marginLeft: '0.6rem',
                color: track.color,
                background: `color-mix(in srgb, ${track.color} 15%, transparent)`,
              }}
            >
              เฉลี่ยจังหวัด{' '}
              {Math.round(
                rows.reduce((s, r) => s + r[track.id], 0) / rows.length
              )}
              %
            </span>
          </h2>
        </div>
        <div className="pv-progress-list">
          {rows.map((r) => (
            <div key={r.name} className="pv-progress-row">
              <span className="pv-progress-name">{r.name}</span>
              <ProgressBar percent={r[track.id]} color={track.color} />
              <span
                className={`pv-progress-pct${r[track.id] < 70 ? ' low' : ''}`}
              >
                {r[track.id]}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
