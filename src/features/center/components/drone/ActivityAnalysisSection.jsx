import {
  Image as ImageIcon,
  Route,
  Camera,
  HardDrive,
  Timer,
  Plane,
} from 'lucide-react'
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
          <div key={l.key}>
            <div className="cdr-analysis-thumb">
              <ImageIcon size={22} />
            </div>
            <p className="cdr-analysis-label">{l.label}</p>
          </div>
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
