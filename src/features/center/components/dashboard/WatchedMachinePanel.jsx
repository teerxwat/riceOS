import { AlertTriangle, Gauge as GaugeIcon, Wrench } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { Badge } from '../common/Badge.jsx'
import { Gauge } from '../common/Gauge.jsx'

function ChangeTag({ percent }) {
  const up = percent >= 0
  return (
    <span className={up ? 'cd-watch__change--up' : 'cd-watch__change--down'}>
      {up ? '▲' : '▼'} {Math.abs(percent)}%
    </span>
  )
}

export function WatchedMachinePanel({ machine }) {
  const { aiPrediction: ai } = machine

  return (
    <Card
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={16} color="var(--c-red)" />
          เครื่องจักรที่ต้องเฝ้าระวัง
        </span>
      }
    >
      <div className="c-grid c-grid-lg-5">
        <div className="c-col-span-2">
          <div className="cd-watch__head">
            <div>
              <p className="cd-watch__name">{machine.name}</p>
              <p className="cd-watch__meta">
                {machine.model} | Serial: {machine.serial}
              </p>
            </div>
            <Badge tone="red">{machine.riskLabel}</Badge>
          </div>

          <div className="cd-watch__gauges">
            <div>
              <Gauge
                value={machine.healthScore}
                size={80}
                color="#f87171"
                label="/100"
              />
              <p className="cd-watch__gauge-caption">Health Score</p>
            </div>
            <div className="cd-watch__rul">
              <p className="cd-watch__rul-value">{machine.rulDays}</p>
              <p className="cd-watch__rul-label">
                วัน (RUL)
                <br />≈ {machine.rulHours.toLocaleString('th-TH')} ชั่วโมง
              </p>
            </div>
          </div>

          <div className="cd-watch__readings">
            <div className="cd-watch__reading">
              <p className="cd-watch__reading-label">อุณหภูมิ</p>
              <p className="cd-watch__reading-value">
                {machine.readings.tempC}°C{' '}
                <ChangeTag percent={machine.readings.tempChangePercent} />
              </p>
            </div>
            <div className="cd-watch__reading">
              <p className="cd-watch__reading-label">Vibration</p>
              <p className="cd-watch__reading-value">
                {machine.readings.vibrationMm} mm/s{' '}
                <ChangeTag percent={machine.readings.vibrationChangePercent} />
              </p>
            </div>
            <div className="cd-watch__reading">
              <p className="cd-watch__reading-label">กระแสไฟฟ้า</p>
              <p className="cd-watch__reading-value">
                {machine.readings.currentA} A{' '}
                <ChangeTag percent={machine.readings.currentChangePercent} />
              </p>
            </div>
            <div className="cd-watch__reading">
              <p className="cd-watch__reading-label">พลังงาน</p>
              <p className="cd-watch__reading-value">
                {machine.readings.powerKw} kW{' '}
                <ChangeTag percent={machine.readings.powerChangePercent} />
              </p>
            </div>
          </div>
        </div>

        <div className="c-col-span-3">
          <div className="cd-watch__predict">
            <GaugeIcon size={16} color="var(--c-red)" />
            <p>
              คาดการณ์มีแนวโน้มเกิดความเสียหายภายใน{' '}
              <b>{ai.withinHours} ชั่วโมง</b> (ความเชื่อมั่น{' '}
              {ai.confidencePercent}%)
            </p>
          </div>

          <p className="cd-watch__section-label">
            สาเหตุที่เป็นไปได้ (Root Cause)
          </p>
          <div className="cd-watch__causes">
            {ai.rootCauses.map((cause) => (
              <div key={cause.cause} className="cd-watch__cause">
                <span className="cd-watch__cause-name">{cause.cause}</span>
                <div className="cd-watch__cause-track">
                  <div
                    className="cd-watch__cause-fill"
                    style={{ width: `${cause.probabilityPercent}%` }}
                  />
                </div>
                <span className="cd-watch__cause-pct">
                  {cause.probabilityPercent}%
                </span>
              </div>
            ))}
          </div>

          <div className="cd-watch__window">
            <Wrench size={14} color="var(--c-brand-400)" />
            {ai.recommendedWindow} ({ai.recommendedDateRange})
          </div>

          <p className="cd-watch__section-label">
            อะไหล่แนะนำ (Recommended Parts)
          </p>
          <div className="cd-watch__table-wrap">
            <table className="cd-watch__table">
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>จำนวน</th>
                  <th>ราคา/ชิ้น</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody>
                {ai.parts.map((part) => (
                  <tr key={part.name}>
                    <td>{part.name}</td>
                    <td>{part.qty}</td>
                    <td>{part.unitPrice.toLocaleString('th-TH')}</td>
                    <td>{part.total.toLocaleString('th-TH')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>รวมประมาณการ</td>
                  <td>{ai.totalPartsCost.toLocaleString('th-TH')} บาท</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="cd-watch__impact">
            ผลกระทบหากไม่ซ่อม: หยุดเครื่อง {ai.impactIfNotRepaired.downtimeDays}{' '}
            · ประสิทธิภาพลด {ai.impactIfNotRepaired.efficiencyLossPercent}% ·
            ค่าเสียหายประมาณ{' '}
            {ai.impactIfNotRepaired.estimatedCostBaht.toLocaleString('th-TH')}{' '}
            บาท
          </p>
        </div>
      </div>
    </Card>
  )
}
