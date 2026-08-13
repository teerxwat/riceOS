import { formatNumber } from '../utils/format'

const SIZE = 140
const CENTER = SIZE / 2
const RADIUS = 52
const STROKE = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// โดนัทชาร์ต SVG มือเขียนเอง (วาดเป็นวงแหวนซ้อนกันหลาย segment ด้วย
// stroke-dasharray) — ใช้ซ้ำได้ทุกที่ที่ต้องโชว์สัดส่วน ไม่ต้องพึ่ง chart library
// คำนวณ offset สะสมของแต่ละ segment ล่วงหน้าแบบ pure function (ไม่ mutate
// ตัวแปรระหว่าง render — React Compiler ไม่ยอมให้ reassign ตัวแปรกลาง render)
function withOffsets(data) {
  let cumulative = 0
  return data.map((d) => {
    const offset = -((cumulative / 100) * CIRCUMFERENCE)
    cumulative += d.pct
    return { ...d, offset }
  })
}

function DonutChart({ data, centerLabel, centerValue }) {
  const segments = withOffsets(data)

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-[140px] w-[140px] shrink-0"
        role="img"
        aria-label={centerLabel}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          className="stroke-db-border"
          strokeWidth={STROKE}
        />
        {segments.map((d) => {
          const dash = (d.pct / 100) * CIRCUMFERENCE
          return (
            <circle
              key={d.key}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={d.color}
              strokeWidth={STROKE}
              strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
              strokeDashoffset={d.offset}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          )
        })}
        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          className="font-display fill-db-text text-heading-sm font-bold"
        >
          {centerValue}
        </text>
        <text
          x={CENTER}
          y={CENTER + 14}
          textAnchor="middle"
          className="fill-db-text-muted text-caption"
        >
          {centerLabel}
        </text>
      </svg>

      <ul className="flex min-w-[160px] flex-1 flex-col gap-2">
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-2 text-label">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: d.color }}
            />
            <span className="flex-1 text-db-text-muted">{d.label}</span>
            <span className="font-medium text-db-text tabular-nums">
              {formatNumber(d.pct, { decimals: 1 })}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DonutChart
