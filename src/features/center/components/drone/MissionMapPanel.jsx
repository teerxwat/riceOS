import { Compass, Plane } from 'lucide-react'
import { Card } from '../common/Card.jsx'

const STATIONS = [
  { code: 'H1', x: 60, y: 60 },
  { code: 'H2', x: 700, y: 90 },
  { code: 'H3', x: 640, y: 330 },
  { code: 'H4', x: 130, y: 360 },
]

const HOTSPOTS = [
  { x: 610, y: 100 },
  { x: 520, y: 220 },
]

// Static illustrative map — not a real map/GPS layer. Good enough for a mockup
// while keeping the frontend dependency-free (no map SDK).
export function MissionMapPanel() {
  return (
    <Card
      title="แผนที่ควบคุมโดรน (Live Map)"
      style={{ flex: 1, minWidth: 0 }}
      titleAction={
        <span
          className="c-card__header-action"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <Compass size={13} /> Lat 18.985, Lon 98.939
        </span>
      }
    >
      <div className="cdr-map-wrap">
        <svg viewBox="0 0 780 420" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern
              id="fieldGrid"
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <rect width="26" height="26" fill="#12241a" />
              <path
                d="M26 0 L0 0 0 26"
                fill="none"
                stroke="#1c3327"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="780" height="420" fill="url(#fieldGrid)" />

          <path
            d="M0 250 C 150 220, 250 280, 400 240 S 650 200, 780 230"
            stroke="#1f4e63"
            strokeWidth="14"
            fill="none"
            opacity="0.7"
          />

          <polygon
            points="220,90 470,70 520,230 300,300 200,230"
            fill="#1f9450"
            fillOpacity="0.18"
            stroke="#34b866"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <polygon
            points="120,230 300,240 280,360 90,360"
            fill="#1f9450"
            fillOpacity="0.12"
            stroke="#26333f"
            strokeWidth="1.5"
          />

          <polyline
            points="230,100 260,120 300,110 340,140 380,120 420,150 460,130 500,160"
            fill="none"
            stroke="#6ad392"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {HOTSPOTS.map((h, i) => (
            <g key={i}>
              <circle
                cx={h.x}
                cy={h.y}
                r={34}
                fill="#f87171"
                fillOpacity="0.12"
                stroke="#f87171"
                strokeWidth="1.5"
              />
              <circle cx={h.x} cy={h.y} r={4} fill="#f87171" />
            </g>
          ))}

          {STATIONS.map((s) => (
            <g key={s.code}>
              <circle
                cx={s.x}
                cy={s.y}
                r={11}
                fill="#0a3d24"
                stroke="#34b866"
                strokeWidth="1.5"
              />
              <text
                x={s.x}
                y={s.y + 4}
                fontSize="9"
                textAnchor="middle"
                fill="#6ad392"
              >
                {s.code}
              </text>
            </g>
          ))}

          <g transform="translate(300,120)">
            <circle r="10" fill="#34b866" fillOpacity="0.25" />
          </g>
          <g transform="translate(230,260)">
            <circle r="10" fill="#34b866" fillOpacity="0.25" />
          </g>
        </svg>

        <div
          className="cdr-map-drone-icon"
          style={{
            left: '36%',
            top: '24%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Plane size={16} />
        </div>
        <div
          className="cdr-map-drone-icon"
          style={{
            left: '29%',
            top: '60%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
          }}
        >
          <Plane size={16} />
        </div>

        <div className="cdr-map-scale">500 ม.</div>
        <div className="cdr-map-legend">
          <span>
            <span className="cdr-map-legend__dot" /> โดรนออนไลน์
          </span>
          <span>
            <span className="cdr-map-legend__ring" /> เขตห้ามบิน/แจ้งเตือน
          </span>
        </div>
      </div>
    </Card>
  )
}
