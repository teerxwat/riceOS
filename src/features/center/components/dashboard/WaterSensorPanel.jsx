import { Card } from '../common/Card.jsx'
import { Gauge } from '../common/Gauge.jsx'

export function WaterSensorPanel({ water }) {
  return (
    <Card
      title="น้ำและเซ็นเซอร์"
      titleAction={
        <span className="c-card__header-action">อัปเดต {water.updatedAt}</span>
      }
    >
      <div className="cd-water-gauge">
        <Gauge value={water.canalLevelM} max={1} label="ม." />
        <p className="cd-water-gauge__label">ระดับน้ำในคลอง</p>
        <p className="cd-water-gauge__status">{water.canalStatus}</p>
      </div>

      <div className="cd-water-stats">
        <div className="cd-water-stat">
          <p className="cd-water-stat__value">
            {water.awdCurrentRound}/{water.awdTotalRounds}
          </p>
          <p className="cd-water-stat__label">รอบ AWD</p>
        </div>
        <div className="cd-water-stat">
          <p className="cd-water-stat__value">{water.sensorsTotal}</p>
          <p className="cd-water-stat__label">เซ็นเซอร์ทั้งหมด</p>
        </div>
      </div>

      <div className="cd-water-flags">
        <div className="cd-water-flag cd-water-flag--ok">
          ปกติ {water.sensorsNormal} ตัว
        </div>
        <div className="cd-water-flag cd-water-flag--bad">
          ขัดข้อง {water.sensorsError} ตัว
        </div>
      </div>
    </Card>
  )
}
