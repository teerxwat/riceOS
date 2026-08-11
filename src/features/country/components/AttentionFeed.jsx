import { AlertTriangle, TrendingUp, Info } from 'lucide-react'

// เขียนชื่อ class เต็มๆ ไว้ตรงนี้ (ไม่ต่อ string ตอน render) เพราะ Tailwind
// สแกนหา class จากตัวอักษรที่ปรากฏจริงในไฟล์ ต่อ string แบบ dynamic แล้วมันจะ
// หาไม่เจอและไม่ generate ให้
const SEVERITY_STYLE = {
  critical: {
    icon: AlertTriangle,
    iconWrap: 'bg-db-red/15',
    iconColor: 'text-db-red',
    badge: 'text-db-red bg-db-red-bg',
    label: 'วิกฤต',
  },
  warning: {
    icon: Info,
    iconWrap: 'bg-db-amber/15',
    iconColor: 'text-db-amber',
    badge: 'text-db-amber bg-db-amber-bg',
    label: 'เฝ้าระวัง',
  },
  good: {
    icon: TrendingUp,
    iconWrap: 'bg-db-green/15',
    iconColor: 'text-db-green',
    badge: 'text-db-green bg-db-green-bg',
    label: 'ข่าวดี',
  },
}

// รวม AI insight + จังหวัดเด่น + แจ้งเตือน เป็น feed เดียวเรียงตาม severity
// แทนการแยกเป็นหลายการ์ดที่ตอบคำถามเดียวกันซ้ำกัน: "วันนี้มีอะไรต้องรู้บ้าง"
function AttentionFeed({ items }) {
  return (
    <section className="rounded-db border border-db-border bg-db-surface p-5">
      <h2 className="font-display text-[16px] font-bold text-db-text">
        สิ่งที่ต้องรู้วันนี้
      </h2>

      <ol className="mt-4 flex flex-col">
        {items.map((item, i) => {
          const s = SEVERITY_STYLE[item.severity]
          const Icon = s.icon
          return (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {i !== items.length - 1 && (
                <span className="absolute top-6 left-[11px] h-full w-px bg-db-border" />
              )}
              <span
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${s.iconWrap}`}
              >
                <Icon size={13} className={s.iconColor} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-db-text">
                    {item.title}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.badge}`}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="mt-0.5 text-[12.5px] text-db-text-muted">
                  {item.detail}
                </p>
                <p className="mt-1 text-[11px] text-db-text-dim">{item.time}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default AttentionFeed
