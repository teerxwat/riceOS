import { formatNumber } from '../utils/format'

// แผนภาพ "radial command map" แทนแผนที่ประเทศไทยจริง — เป็นแผนภาพเชิงสัญลักษณ์
// (hub = ทั้งประเทศ, แฉกรอบวง = แต่ละภาค) เลือกใช้แบบนี้แทนแผนที่ province-level
// จริงเพราะไม่ต้องพึ่งข้อมูล geo/แผนที่ ภายนอก แต่ยังให้ความรู้สึก "War Room"
// และคลิกเลือกภาคเพื่อกรองข้อมูลได้เหมือนกัน (idea: แผนที่เป็นพระเอกของหน้า)

const STATUS_FILL = {
  ok: 'fill-db-green',
  watch: 'fill-db-amber',
  risk: 'fill-db-red',
}
const STATUS_STROKE = {
  ok: 'stroke-db-green',
  watch: 'stroke-db-amber',
  risk: 'stroke-db-red',
}
const STATUS_LABEL = { ok: 'ปกติ', watch: 'เฝ้าระวัง', risk: 'วิกฤต' }

const SIZE = 360
const CENTER = SIZE / 2
const ORBIT = 110
const HUB_R = 46

function RegionMap({ regions, total, selectedId, onSelect }) {
  const centers = regions.map((r) => r.centers)
  const min = Math.min(...centers)
  const max = Math.max(...centers)

  const nodes = regions.map((region, i) => {
    const angle = (-90 + i * (360 / regions.length)) * (Math.PI / 180)
    const cx = CENTER + ORBIT * Math.cos(angle)
    const cy = CENTER + ORBIT * Math.sin(angle)
    const r = 22 + ((region.centers - min) / Math.max(max - min, 1)) * 14
    return { ...region, cx, cy, r }
  })

  return (
    <div>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full max-w-[420px]"
        role="img"
        aria-label="แผนภาพสรุปตามภาค คลิกเพื่อกรองข้อมูล"
      >
        {nodes.map((n) => (
          <line
            key={`line-${n.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={n.cx}
            y2={n.cy}
            className="stroke-db-border"
            strokeWidth={1.5}
          />
        ))}

        <g
          onClick={() => onSelect(null)}
          className="cursor-pointer"
          tabIndex={0}
          role="button"
          aria-pressed={!selectedId}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(null)}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={HUB_R}
            className={`fill-db-surface-alt stroke-db-border ${!selectedId ? 'stroke-2' : 'stroke-1'}`}
          />
          <text
            x={CENTER}
            y={CENTER - 5}
            textAnchor="middle"
            className="font-display fill-db-text text-[13px] font-bold"
          >
            ทั้งประเทศ
          </text>
          <text
            x={CENTER}
            y={CENTER + 13}
            textAnchor="middle"
            className="fill-db-text-muted text-[10px]"
          >
            {formatNumber(total.centers)} ศูนย์
          </text>
        </g>

        {nodes.map((n) => {
          const isSelected = selectedId === n.id
          const labelY = n.cy + n.r + 15
          return (
            <g
              key={n.id}
              onClick={() => onSelect(n.id)}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(n.id)}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r + 8}
                className={`${STATUS_FILL[n.status]} opacity-10`}
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                className={`${STATUS_FILL[n.status]} transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60'}`}
              />
              {isSelected && (
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={n.r + 5}
                  fill="none"
                  className={STATUS_STROKE[n.status]}
                  strokeWidth={2}
                />
              )}
              <text
                x={n.cx}
                y={labelY}
                textAnchor="middle"
                className={`fill-db-text text-[11px] ${isSelected ? 'font-bold' : 'font-medium'}`}
              >
                {n.name}
              </text>
              <text
                x={n.cx}
                y={labelY + 13}
                textAnchor="middle"
                className="fill-db-text-muted text-[9.5px]"
              >
                {formatNumber(n.centers)} ศูนย์
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(STATUS_LABEL).map(([key, label]) => (
          <span
            key={key}
            className="flex items-center gap-1.5 text-[11px] text-db-text-muted"
          >
            <span className={`h-2 w-2 rounded-full ${STATUS_FILL[key]}`} />
            {label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-[10.5px] text-db-text-dim">
        แผนภาพเชิงสัญลักษณ์สรุปตามภาค ไม่ใช่ตำแหน่งทางภูมิศาสตร์จริง —
        คลิกที่ภาคเพื่อกรองข้อมูลด้านขวา
      </p>
    </div>
  )
}

export default RegionMap
