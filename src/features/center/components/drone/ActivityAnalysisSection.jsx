import { Route, Camera, HardDrive, Timer, Plane } from 'lucide-react'
import { Card } from '../common/Card.jsx'

export function ActivityTypeButtons({ types }) {
  return (
    <Card title="ประเภทกิจกรรม (เลือกสร้างใหม่)">
      <div className="c-grid c-grid-2 c-grid-md-3 c-grid-lg-6">
        {types.map((t) => {
          const [line1, line2] = t.label.split('\n')
          return (
            <button key={t.key} type="button" className="cdr-activity-btn">
              <span className="cdr-activity-btn__title">{line1}</span>
              {line2 && <span className="cdr-activity-btn__sub">{line2}</span>}
            </button>
          )
        })}
      </div>
    </Card>
  )
}

const FIELD_SHAPE = 'M15,55 L45,20 L85,25 L90,60 L60,85 L20,80 Z'

// Small mockup "results" per analysis kind — generated inline as SVG so the
// grid isn't just empty icon boxes, without depending on real drone imagery.
function AnalysisThumb({ kind }) {
  switch (kind) {
    case 'rgb':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="100" fill="#12241a" />
          <path d={FIELD_SHAPE} fill="#3f6b2f" />
          <path
            d="M20,80 L45,20 L60,30 L35,85 Z"
            fill="#4d7d3a"
            opacity="0.7"
          />
          <path
            d="M0,60 C 25,55 40,68 55,58 S 85,50 100,55 L100,70 L0,75 Z"
            fill="#1f4e63"
            opacity="0.65"
          />
        </svg>
      )
    case 'ndvi':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ndviGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="#0d1912" />
          <path d={FIELD_SHAPE} fill="url(#ndviGrad)" />
        </svg>
      )
    case 'ndwi':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ndwiGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="45%" stopColor="#ca8a04" />
              <stop offset="75%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="#0d1912" />
          <path d={FIELD_SHAPE} fill="url(#ndwiGrad)" />
        </svg>
      )
    case 'water':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="100" fill="#0d1912" />
          <path
            d={FIELD_SHAPE}
            fill="none"
            stroke="#26333f"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <path
            d="M10,50 C 30,35 45,60 60,45 S 90,35 100,45 L100,65 L10,65 Z"
            fill="#1d4ed8"
            opacity="0.85"
          />
          <ellipse
            cx="30"
            cy="75"
            rx="12"
            ry="7"
            fill="#0891b2"
            opacity="0.8"
          />
        </svg>
      )
    case 'anomaly':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="100" fill="#0d1912" />
          <path
            d={FIELD_SHAPE}
            fill="#16311f"
            stroke="#26333f"
            strokeWidth="1"
          />
          {[
            [30, 40],
            [50, 30],
            [65, 55],
            [40, 65],
            [72, 40],
            [55, 70],
            [25, 60],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 4 : 2.4}
              fill="#f87171"
              opacity="0.9"
            />
          ))}
        </svg>
      )
    case 'timeseries':
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <clipPath id="tsLeft">
              <rect x="0" y="0" width="50" height="100" />
            </clipPath>
            <clipPath id="tsRight">
              <rect x="50" y="0" width="50" height="100" />
            </clipPath>
          </defs>
          <rect width="100" height="100" fill="#0d1912" />
          <g clipPath="url(#tsLeft)">
            <path d={FIELD_SHAPE} fill="#a3752b" opacity="0.85" />
          </g>
          <g clipPath="url(#tsRight)">
            <path d={FIELD_SHAPE} fill="#15803d" />
          </g>
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#f1f5f9"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
        </svg>
      )
    default:
      return <svg viewBox="0 0 100 100" />
  }
}

export function AnalysisGrid({ layers, compareDates }) {
  return (
    <Card
      title="ผลวิเคราะห์ล่าสุด"
      titleAction={
        <span className="c-card__header-action">
          เปรียบเทียบ {compareDates.from} - {compareDates.to}
        </span>
      }
    >
      <div className="c-grid c-grid-2 c-grid-md-3 c-grid-lg-6">
        {layers.map((l) => (
          <button key={l.key} type="button" className="cdr-analysis-item">
            <div className="cdr-analysis-thumb">
              <AnalysisThumb kind={l.kind} />
            </div>
            <p className="cdr-analysis-label">{l.label}</p>
            {l.stat && <p className="cdr-analysis-stat">{l.stat}</p>}
          </button>
        ))}
      </div>
    </Card>
  )
}

export function SummaryFooter({ summary }) {
  const items = [
    {
      icon: Route,
      label: 'พื้นที่สำรวจแล้ว',
      value: `${summary.areaCoveredRai.toLocaleString('th-TH')} ไร่`,
    },
    { icon: Plane, label: 'เที่ยวบิน', value: `${summary.flights} เที่ยว` },
    { icon: Route, label: 'ระยะทางรวม', value: `${summary.distanceKm} กม.` },
    { icon: Timer, label: 'เวลาในการบินรวม', value: summary.flightDuration },
    {
      icon: Camera,
      label: 'ภาพถ่ายที่ได้',
      value: summary.photosCaptured.toLocaleString('th-TH'),
    },
    {
      icon: HardDrive,
      label: 'ข้อมูลที่ได้บิน',
      value: `${summary.dataSizeGb} GB`,
    },
  ]

  return (
    <Card title="สรุปผลกิจกรรมวันนี้">
      <div className="c-grid c-grid-2 c-grid-md-3 c-grid-lg-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="cdr-summary-item">
            <Icon size={16} color="var(--c-brand-400)" />
            <span className="cdr-summary-item__value">{value}</span>
            <span className="cdr-summary-item__label">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
