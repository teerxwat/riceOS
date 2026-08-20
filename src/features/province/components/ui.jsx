// เจ้าของไฟล์: คนที่ 2 (feature province)
// คอมโพเนนต์ UI เล็ก ๆ ที่ใช้ร่วมกันในทุกหน้าของจังหวัด
import {
  Warehouse,
  Wifi,
  Wheat,
  Leaf,
  Coins,
  ClipboardList,
  FileBarChart,
  Droplets,
  Wrench,
} from 'lucide-react'
import { STATUS, fmt } from '../provinceData.js'

const ICONS = {
  Warehouse,
  Wifi,
  Wheat,
  Leaf,
  Coins,
  ClipboardList,
  FileBarChart,
  Droplets,
  Wrench,
}

export function KpiCard({ label, value, unit, sub, icon, tone = 'green' }) {
  const Icon = ICONS[icon] ?? Warehouse
  return (
    <div className={`pv-kpi pv-kpi--${tone}`}>
      <div className="pv-kpi-icon">
        <Icon size={20} />
      </div>
      <div className="pv-kpi-body">
        <span className="pv-kpi-label">{label}</span>
        <span className="pv-kpi-value">
          {typeof value === 'number' ? fmt(value, value % 1 ? 2 : 0) : value}
          <small> {unit}</small>
        </span>
        <span className="pv-kpi-sub">{sub}</span>
      </div>
    </div>
  )
}

export function StatusChip({ status }) {
  const s = STATUS[status]
  if (!s) return null
  return (
    <span
      className="pv-chip"
      style={{
        color: s.color,
        background: `color-mix(in srgb, ${s.color} 16%, transparent)`,
      }}
    >
      <i className="pv-chip-dot" style={{ background: s.color }} />
      {s.label}
    </span>
  )
}

// โดนัทแสดง % (SVG ล้วน ไม่ใช้ไลบรารี)
export function Donut({ percent, color = 'var(--green)', size = 92, label }) {
  const r = (size - 14) / 2
  const c = 2 * Math.PI * r
  const p = Math.max(0, Math.min(100, percent))
  return (
    <div className="pv-donut" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="9"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(p / 100) * c} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="pv-donut-text"
        >
          {Math.round(p)}%
        </text>
      </svg>
      {label && <span className="pv-donut-label">{label}</span>}
    </div>
  )
}

export function ProgressBar({ percent, color = 'var(--green)' }) {
  return (
    <div className="pv-bar-track">
      <div
        className="pv-bar-fill"
        style={{
          width: `${Math.max(0, Math.min(100, percent))}%`,
          background: color,
        }}
      />
    </div>
  )
}

// กราฟแท่งแนวนอนเทียบค่าระหว่างรายการ
export function HBarChart({ items, unit, digits = 0 }) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <div className="pv-hbars">
      {items.map((it) => (
        <div key={it.name} className="pv-hbar-row">
          <span className="pv-hbar-name">{it.name}</span>
          <div className="pv-hbar-track">
            <div
              className="pv-hbar-fill"
              style={{
                width: `${(it.value / max) * 100}%`,
                background: it.color ?? 'var(--green)',
              }}
            />
          </div>
          <span className="pv-hbar-value">
            {fmt(it.value, digits)} {unit}
          </span>
        </div>
      ))}
    </div>
  )
}
