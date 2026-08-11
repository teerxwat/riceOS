import { Card } from '../common/Card.jsx'

function Metric({ label, value, delta }) {
  return (
    <div className="cd-perf-item">
      <p className="cd-perf-item__label">{label}</p>
      <p className="cd-perf-item__value">{value}%</p>
      <p
        className="cd-perf-item__delta"
        style={{ color: delta >= 0 ? 'var(--c-emerald)' : 'var(--c-red)' }}
      >
        {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
      </p>
    </div>
  )
}

export function PerformanceSummary({ performance }) {
  return (
    <Card title="การวิเคราะห์ประสิทธิภาพ (Performance Summary)">
      <div className="c-grid c-grid-2 c-grid-md-4">
        <Metric
          label="OEE โดยรวม"
          value={performance.oeePercent}
          delta={performance.oeeDeltaPercent}
        />
        <Metric
          label="Availability"
          value={performance.availabilityPercent}
          delta={performance.availabilityDeltaPercent}
        />
        <Metric
          label="Performance"
          value={performance.performancePercent}
          delta={performance.performanceDeltaPercent}
        />
        <Metric
          label="Quality"
          value={performance.qualityPercent}
          delta={performance.qualityDeltaPercent}
        />
      </div>
    </Card>
  )
}
