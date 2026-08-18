import { formatNumber } from '../utils/format'

// กราฟเส้น SVG มือเขียนเอง (ไม่พึ่ง chart library) — เบาและคุมสไตล์ได้เต็มที่
// เพราะกราฟนี้มีจุดประสงค์เดียวชัดเจน: เทียบ ผลจริง vs คาดการณ์ vs เป้าหมาย
const WIDTH = 600
const HEIGHT = 220
const PAD_LEFT = 8
const PAD_RIGHT = 8
const PAD_TOP = 16
const PAD_BOTTOM = 28
const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM

function buildPath(values, months, maxVal) {
  const points = values
    .map((v, i) => (v == null ? null : [i, v]))
    .filter(Boolean)
  if (points.length === 0) return { d: '', points: [] }

  const coords = points.map(([i, v]) => [
    PAD_LEFT + (i / (months.length - 1)) * PLOT_W,
    PAD_TOP + (1 - v / maxVal) * PLOT_H,
  ])
  const d = coords
    .map(
      ([x, y], idx) =>
        `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    )
    .join(' ')
  return { d, coords }
}

function TrendChart({
  months,
  actual,
  forecast,
  target,
  unit = 'ล้านตัน',
  ariaLabel = 'แนวโน้มผลผลิตข้าว ผลจริงเทียบคาดการณ์และเป้าหมาย',
}) {
  const maxVal = Math.max(target, ...forecast) * 1.08
  const actualPath = buildPath(actual, months, maxVal)
  const forecastPath = buildPath(forecast, months, maxVal)
  const targetY = PAD_TOP + (1 - target / maxVal) * PLOT_H
  const lastActual = actualPath.coords[actualPath.coords.length - 1]

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
    >
      {/* เส้นเป้าหมาย */}
      <line
        x1={PAD_LEFT}
        y1={targetY}
        x2={WIDTH - PAD_RIGHT}
        y2={targetY}
        className="stroke-db-amber"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <text
        x={WIDTH - PAD_RIGHT}
        y={targetY - 6}
        textAnchor="end"
        className="fill-db-amber text-caption font-medium"
      >
        เป้าหมาย {formatNumber(target, { decimals: 2 })} {unit}
      </text>

      {/* เส้นคาดการณ์ */}
      <path
        d={forecastPath.d}
        fill="none"
        className="stroke-db-text-muted"
        strokeWidth={2}
        strokeDasharray="5 4"
      />

      {/* เส้นผลจริง */}
      <path
        d={actualPath.d}
        fill="none"
        className="stroke-db-green"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {actualPath.coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} className="fill-db-green" />
      ))}
      {lastActual && (
        <circle
          cx={lastActual[0]}
          cy={lastActual[1]}
          r={5.5}
          className="fill-db-bg stroke-db-green"
          strokeWidth={2.5}
        />
      )}

      {/* label เดือน */}
      {months.map((m, i) => {
        if (i % 2 !== 0) return null
        const x = PAD_LEFT + (i / (months.length - 1)) * PLOT_W
        return (
          <text
            key={m}
            x={x}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-db-text-dim text-caption"
          >
            {m}
          </text>
        )
      })}
    </svg>
  )
}

export default TrendChart
