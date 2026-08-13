// เจ้าของไฟล์: คนที่ 2 (feature province)
// เปรียบเทียบอำเภอ: เลือกตัวชี้วัด -> กราฟแท่ง + ตารางจัดอันดับ
import { useMemo, useState } from 'react'
import { DISTRICTS, fmt } from '../provinceData.js'
import { HBarChart } from '../components/ui.jsx'

const METRICS = [
  {
    key: 'rice',
    label: 'ข้าวอบวันนี้',
    unit: 'ตัน',
    digits: 1,
    color: '#3fae57',
  },
  {
    key: 'awd',
    label: 'พื้นที่ AWD',
    unit: 'ไร่',
    digits: 0,
    color: '#8ec36b',
  },
  {
    key: 'income',
    label: 'รายได้',
    unit: 'ล้านบาท',
    digits: 2,
    color: '#e8b84b',
  },
  {
    key: 'complete',
    label: 'ข้อมูลครบ',
    unit: '%',
    digits: 0,
    color: '#4aa8e0',
  },
  {
    key: 'score',
    label: 'คะแนนประสิทธิภาพ',
    unit: 'คะแนน',
    digits: 1,
    color: '#7c6cf0',
  },
]

const scoreTone = (s) => (s >= 85 ? 'good' : s >= 70 ? 'ok' : 'bad')

export default function ComparePage() {
  const [metric, setMetric] = useState(METRICS[0])

  const sorted = useMemo(
    () => [...DISTRICTS].sort((a, b) => b[metric.key] - a[metric.key]),
    [metric]
  )

  return (
    <div className="pv-stack">
      <section className="pv-card">
        <div className="pv-card-head">
          <h2>เปรียบเทียบรายอำเภอ ({DISTRICTS.length} อำเภอ)</h2>
          <div className="pv-filter-chips">
            {METRICS.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`pv-filter-chip${metric.key === m.key ? ' active' : ''}`}
                onClick={() => setMetric(m)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <HBarChart
          items={sorted.map((d) => ({
            name: d.name,
            value: d[metric.key],
            color: metric.color,
          }))}
          unit={metric.unit}
          digits={metric.digits}
        />
      </section>

      <section className="pv-card">
        <div className="pv-card-head">
          <h2>ตารางจัดอันดับ (เรียงตาม{metric.label})</h2>
        </div>
        <div className="pv-table-wrap">
          <table className="pv-table">
            <thead>
              <tr>
                <th>อันดับ</th>
                <th>อำเภอ</th>
                <th className="num">ข้าวอบ (ตัน)</th>
                <th className="num">AWD (ไร่)</th>
                <th className="num">รายได้ (ลบ.)</th>
                <th className="num">ข้อมูลครบ (%)</th>
                <th className="num">ศูนย์มีปัญหา</th>
                <th className="num">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((d, i) => (
                <tr key={d.name}>
                  <td>
                    <span className="pv-rank">{i + 1}</span>
                  </td>
                  <td>
                    <b>{d.name}</b>
                  </td>
                  <td className="num">{fmt(d.rice, 1)}</td>
                  <td className="num">{fmt(d.awd)}</td>
                  <td className="num">{fmt(d.income, 2)}</td>
                  <td className="num">{d.complete}%</td>
                  <td className="num">
                    {d.issues > 0 ? (
                      <span className="pv-issue-count">{d.issues} แห่ง</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="num">
                    <b className={`pv-score pv-score--${scoreTone(d.score)}`}>
                      {fmt(d.score, 1)}
                    </b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
