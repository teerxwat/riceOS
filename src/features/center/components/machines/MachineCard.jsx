import { AlertTriangle, CheckCircle2, PowerOff } from 'lucide-react'
import { Badge } from '../common/Badge.jsx'
import { MachineIllustration } from './MachineIllustration.jsx'

const STATUS_LABEL = {
  normal: 'ทำงานปกติ',
  abnormal: 'ผิดปกติ',
  off: 'ปิดเครื่อง',
}

const STATUS_TONE = {
  normal: 'green',
  abnormal: 'red',
  off: 'gray',
}

const STATUS_ICON = {
  normal: CheckCircle2,
  abnormal: AlertTriangle,
  off: PowerOff,
}

export function MachineCard({
  kind,
  name,
  model,
  status,
  readings,
  extra,
  note,
  size = 'compact',
}) {
  const StatusIcon = STATUS_ICON[status]

  return (
    <div className={`cm-card cm-card--${status} cm-card--${size}`}>
      <div className="cm-card__illustration">
        <MachineIllustration kind={kind} />
      </div>

      <div className="cm-card__head">
        <div>
          <p className="cm-card__name">{name}</p>
          {model && <p className="cm-card__model">{model}</p>}
        </div>
        <Badge tone={STATUS_TONE[status]}>
          <StatusIcon size={11} /> {STATUS_LABEL[status]}
        </Badge>
      </div>

      <div className="cm-card__readings">
        {readings.map((r) => (
          <div key={r.label} className="cm-reading">
            <span className="cm-reading__label">{r.label}</span>
            <span className="cm-reading__value">
              {r.value}
              <span className="cm-reading__unit">{r.unit}</span>
            </span>
          </div>
        ))}
      </div>

      {extra && extra.length > 0 && (
        <div className="cm-card__extra">
          {extra.map((e) => (
            <span key={e.label}>
              {e.label}: <strong>{e.value}</strong>
            </span>
          ))}
        </div>
      )}

      {note && <p className="cm-card__note">{note}</p>}
    </div>
  )
}
