import { BatteryMedium, MapPin, Plane } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { Badge } from '../common/Badge.jsx'

const STATUS_LABEL = {
  flying: 'กำลังบิน',
  standby: 'รอขึ้นบิน',
  idle: 'ว่าง',
  charging: 'ชาร์จแบต',
}

const STATUS_TONE = {
  flying: 'green',
  standby: 'amber',
  idle: 'gray',
  charging: 'amber',
}

export function DroneListPanel({ drones, stations }) {
  return (
    <div className="cdr-side">
      <Card
        title={`โดรนออนไลน์ ${drones.filter((d) => d.status === 'flying').length} ลำ`}
      >
        <div className="cdr-drone-list">
          {drones.map((d) => (
            <div key={d.id} className="cdr-drone-item">
              <div className="cdr-drone-item__head">
                <span className="cdr-drone-item__code">
                  <Plane size={13} color="var(--c-brand-400)" /> {d.code}
                </span>
                <Badge tone={STATUS_TONE[d.status]}>
                  {STATUS_LABEL[d.status]}
                </Badge>
              </div>
              <p className="cdr-drone-item__model">{d.model}</p>
              <div className="cdr-drone-item__stats">
                <span>
                  <BatteryMedium size={12} /> {d.batteryPercent}%
                </span>
                <span>{d.altitudeM ?? 0} ม.</span>
                <span>{d.speedMs ?? 0} m/s</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="สถานีควบคุม/จุดขึ้นลง">
        <div className="cdr-station-list">
          {stations.map((s) => (
            <div key={s.id} className="cdr-station-row">
              <span className="cdr-station-row__name">
                <MapPin size={12} color="var(--c-brand-400)" /> {s.code}{' '}
                {s.name}
              </span>
              <span
                className={
                  s.ready
                    ? 'cdr-station-row__status--ready'
                    : 'cdr-station-row__status--not-ready'
                }
              >
                {s.ready ? 'พร้อมใช้งาน' : 'ไม่พร้อม'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
