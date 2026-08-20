// Semi-circular gauge used for health-score / water-level style readouts.
export function Gauge({
  value,
  max = 100,
  size = 96,
  label,
  color = '#34b866',
  trackColor = '#26333f',
}) {
  const radius = size / 2 - 8
  const circumference = Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))
  const dash = circumference * pct

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: size,
      }}
    >
      <svg
        width={size}
        height={size / 2 + 8}
        viewBox={`0 0 ${size} ${size / 2 + 8}`}
      >
        <path
          d={`M 8 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 8} ${size / 2}`}
          fill="none"
          stroke={trackColor}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path
          d={`M 8 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 8} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--c-text)',
          }}
        >
          {value}
        </span>
        {label && (
          <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
