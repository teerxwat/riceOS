import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react'
import { Card } from '../common/Card.jsx'

const ICON = {
  critical: ShieldAlert,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
}

const COLOR = {
  critical: 'var(--c-red)',
  warning: 'var(--c-amber)',
  info: 'var(--c-sky)',
  success: 'var(--c-emerald)',
}

export function AlertsPanel({ alerts }) {
  return (
    <Card title="การแจ้งเตือนและเหตุการณ์">
      <div className="c-flex-col" style={{ gap: '0.625rem' }}>
        {alerts.map((a, i) => {
          const Icon = ICON[a.level]
          return (
            <div key={i} className="cdr-alert">
              <Icon
                size={14}
                color={COLOR[a.level]}
                style={{ marginTop: '0.125rem', flexShrink: 0 }}
              />
              <div>
                <p className="cdr-alert__msg">{a.message}</p>
                <p className="cdr-alert__time">{a.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
