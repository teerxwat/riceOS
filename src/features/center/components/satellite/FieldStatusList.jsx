import { Droplet, DropletOff, Waves } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { Badge } from '../common/Badge.jsx'

const STATUS_LABEL = {
  flooded: 'มีน้ำ',
  low: 'น้ำน้อย',
  dry: 'ไม่มีน้ำ',
}

const STATUS_TONE = {
  flooded: 'blue',
  low: 'amber',
  dry: 'red',
}

const STATUS_ICON = {
  flooded: Waves,
  low: Droplet,
  dry: DropletOff,
}

export function FieldStatusList({ fields }) {
  const withWater = fields.filter((f) => f.waterStatus !== 'dry').length

  return (
    <Card title={`สถานะน้ำรายแปลง (${withWater}/${fields.length} แปลงมีน้ำ)`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {fields.map((f) => {
          const Icon = STATUS_ICON[f.waterStatus]
          return (
            <div key={f.id} className="cs-field-item">
              <div className="cs-field-item__head">
                <div>
                  <p className="cs-field-item__name">{f.name}</p>
                  <p className="cs-field-item__meta">
                    {f.areaRai} ไร่ · อัปเดต {f.lastUpdated}
                  </p>
                </div>
                <Badge tone={STATUS_TONE[f.waterStatus]}>
                  <Icon size={11} /> {STATUS_LABEL[f.waterStatus]}
                </Badge>
              </div>
              <div className="cs-field-item__bar">
                <div
                  className={`cs-field-item__bar-fill cs-field-item__bar-fill--${f.waterStatus}`}
                  style={{ width: `${f.waterCoveragePercent}%` }}
                />
              </div>
              <p className="cs-field-item__pct">
                พื้นที่มีน้ำ {f.waterCoveragePercent}%
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
