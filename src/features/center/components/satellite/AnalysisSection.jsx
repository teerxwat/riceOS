import {
  Layers,
  Ruler,
  CloudFog,
  HardDrive,
  MapPinned,
  CalendarClock,
} from 'lucide-react'
import { Card } from '../common/Card.jsx'

const FIELD_SHAPE = 'M15,55 L45,20 L85,25 L90,60 L60,85 L20,80 Z'

// Small mockup "results" per analysis kind — generated inline as SVG so the
// grid isn't just empty icon boxes, without depending on real imagery.
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
            d="M8,42 H46 V78 H8 Z"
            fill="#38bdf8"
            fillOpacity="0.55"
            stroke="#0ea5e9"
            strokeWidth="1.5"
          />
          <path
            d="M8,8 H46 V38 H8 Z"
            fill="#38bdf8"
            fillOpacity="0.55"
            stroke="#0ea5e9"
            strokeWidth="1.5"
          />
          <path
            d="M50,8 H92 V38 H50 Z"
            fill="#f87171"
            fillOpacity="0.4"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <path
            d="M50,42 H92 V78 H50 Z"
            fill="#fbbf24"
            fillOpacity="0.4"
            stroke="#f59e0b"
            strokeWidth="1.5"
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
            [65, 55],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={6} fill="#f87171" opacity="0.9" />
          ))}
          {[
            [50, 30],
            [40, 65],
            [72, 40],
            [55, 70],
            [25, 60],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={2.4}
              fill="#fbbf24"
              opacity="0.85"
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
            <path d={FIELD_SHAPE} fill="#38bdf8" fillOpacity="0.7" />
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
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={16} color="var(--c-brand-400)" />
          ผลวิเคราะห์ภาพถ่ายดาวเทียมล่าสุด
        </span>
      }
      titleAction={
        <span className="c-card__header-action">
          เปรียบเทียบ {compareDates.from} - {compareDates.to}
        </span>
      }
    >
      <div className="c-grid c-grid-2 c-grid-md-3 c-grid-lg-6">
        {layers.map((l) => (
          <button key={l.key} type="button" className="cs-analysis-item">
            <div className="cs-analysis-thumb">
              <AnalysisThumb kind={l.kind} />
            </div>
            <p className="cs-analysis-label">{l.label}</p>
            {l.stat && <p className="cs-analysis-stat">{l.stat}</p>}
          </button>
        ))}
      </div>
    </Card>
  )
}

export function SummaryFooter({ summary }) {
  const items = [
    {
      icon: MapPinned,
      label: 'พื้นที่วิเคราะห์รวม',
      value: `${summary.areaCoveredRai.toLocaleString('th-TH')} ไร่`,
    },
    {
      icon: Layers,
      label: 'แปลงที่ตรวจสอบ',
      value: `${summary.fieldsAnalyzed} แปลง`,
    },
    {
      icon: Ruler,
      label: 'ความละเอียดภาพ',
      value: `${summary.resolutionM} ม./พิกเซล`,
    },
    {
      icon: CloudFog,
      label: 'เมฆปกคลุม',
      value: `${summary.cloudCoverPercent}%`,
    },
    {
      icon: HardDrive,
      label: 'ขนาดข้อมูลภาพ',
      value: `${summary.dataSizeGb} GB`,
    },
    {
      icon: CalendarClock,
      label: 'รอบถ่ายภาพถัดไป',
      value: summary.nextPassDate,
    },
  ]

  return (
    <Card title="สรุปข้อมูลภาพถ่ายดาวเทียมวันนี้">
      <div className="c-grid c-grid-2 c-grid-md-3 c-grid-lg-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="cs-summary-item">
            <Icon size={16} color="var(--c-brand-400)" />
            <span className="cs-summary-item__value">{value}</span>
            <span className="cs-summary-item__label">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
