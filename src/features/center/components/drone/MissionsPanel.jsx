import { Card } from '../common/Card.jsx'
import { Badge } from '../common/Badge.jsx'

const STATUS_LABEL = {
  in_progress: 'กำลังดำเนินการ',
  completed: 'เสร็จสิ้น',
  pending: 'รอเริ่ม',
}

const STATUS_TONE = {
  in_progress: 'blue',
  completed: 'green',
  pending: 'amber',
}

export function MissionsPanel({ missions }) {
  return (
    <Card title="ภารกิจปัจจุบัน">
      <div className="c-flex-col" style={{ gap: '0.75rem' }}>
        {missions.map((m) => (
          <div key={m.id} className="cdr-mission">
            <div className="cdr-mission__head">
              <span className="cdr-mission__title">{m.title}</span>
              <Badge tone={STATUS_TONE[m.status]}>
                {STATUS_LABEL[m.status]}
              </Badge>
            </div>
            <p className="cdr-mission__meta">พื้นที่เป้าหมาย: {m.targetArea}</p>
            <p className="cdr-mission__meta">
              พื้นที่ทั้งหมด: {m.totalAreaRai.toLocaleString('th-TH')} ไร่
            </p>

            {m.progressPercent !== null && (
              <div className="cdr-mission__progress">
                <div className="cdr-mission__progress-row">
                  <span>ความคืบหน้า</span>
                  <span>{m.progressPercent}%</span>
                </div>
                <div className="cdr-mission__progress-track">
                  <div
                    className="cdr-mission__progress-fill"
                    style={{ width: `${m.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <p className="cdr-mission__meta" style={{ marginTop: '0.5rem' }}>
              {m.status === 'completed' ? 'เสร็จสิ้น' : 'เริ่มต้น'}:{' '}
              {m.startedAt} · โดรน {m.drone}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
