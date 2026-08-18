import { Warehouse } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { Badge } from '../common/Badge.jsx'
import { MachineCard } from '../machines/MachineCard.jsx'
import '../../styles/machines.css'

const STATUS_LABEL = {
  running: 'กำลังอบ',
  idle: 'ว่าง',
  maintenance: 'ซ่อมบำรุง',
}

const STATUS_TONE = {
  running: 'green',
  idle: 'gray',
  maintenance: 'red',
}

function DryerCard({ dryer }) {
  const ringColor =
    dryer.status === 'running'
      ? '#34b866'
      : dryer.status === 'maintenance'
        ? '#f87171'
        : '#475569'
  const pct = dryer.percent
  const circumference = 2 * Math.PI * 26

  return (
    <div className="cd-dryer-card">
      <div className="cd-dryer-card__head">
        <span className="cd-dryer-card__name">{dryer.name}</span>
        <Badge tone={STATUS_TONE[dryer.status]}>
          {STATUS_LABEL[dryer.status]}
        </Badge>
      </div>

      <div className="cd-dryer-ring">
        <svg width={64} height={64}>
          <circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke="var(--c-border-strong)"
            strokeWidth={5}
          />
          <circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke={ringColor}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
          />
        </svg>
        <Warehouse size={20} className="cd-dryer-ring__icon" />
      </div>
      <p className="cd-dryer-card__pct">
        {dryer.status === 'running' ? `${pct}%` : (dryer.note ?? '—')}
      </p>

      {dryer.status === 'running' ? (
        <div className="cd-dryer-card__details">
          <p>
            รอบที่ {dryer.round}/{dryer.totalRounds}
          </p>
          <p>อุณหภูมิเตา {dryer.tempC}°C</p>
          <p>
            ความชื้นเข้า-ออก {dryer.humidityIn}% → {dryer.humidityOut}%
          </p>
          <p>
            เวลาคงเหลือ {dryer.timeRemaining} น. | {dryer.volumeTon} ตัน
          </p>
        </div>
      ) : (
        <div className="cd-dryer-card__details">&nbsp;</div>
      )}
    </div>
  )
}

export function DryerStatusGrid({ dryers, strawMachines }) {
  return (
    <Card title="สถานะเครื่องอบข้าวและเครื่องจักรฟาง">
      <div className="c-grid c-grid-2 c-grid-md-4">
        {strawMachines?.map((m) => (
          <MachineCard
            key={m.id}
            kind={m.kind}
            name={m.name}
            model={m.model}
            status={m.status}
            readings={[
              { label: 'กระแสไฟฟ้า', value: m.currentA, unit: 'A' },
              { label: 'แรงดันไฟฟ้า', value: m.voltageV, unit: 'V' },
              { label: 'กำลังไฟฟ้า', value: m.powerKw, unit: 'kW' },
            ]}
            extra={m.extra}
            note={m.note}
          />
        ))}
        {dryers.map((d) => (
          <DryerCard key={d.id} dryer={d} />
        ))}
      </div>
    </Card>
  )
}
