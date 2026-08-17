import { NavLink } from 'react-router-dom'
import { Home, Sprout, Sparkles, Store, Menu } from 'lucide-react'

const TABS = [
  { label: 'หน้าแรก', icon: Home, to: '/village' },
  { label: 'แปลงของฉัน', icon: Sprout, to: '/village/plots' },
  { label: 'AI ผู้ช่วย', icon: Sparkles, to: '/village/ai' },
  { label: 'ตลาดข้าว', icon: Store, to: '/village/market' },
  { label: 'เมนู', icon: Menu, to: '/village/menu' },
]

// แถบเมนูล่างแบบแอปมือถือ — ชาวบ้านส่วนใหญ่ใช้งานผ่านมือถือ ต่างจาก
// dashboard ของ country ที่เป็นเมนูข้างสำหรับจอกว้าง (ผู้บริหารใช้คอมพิวเตอร์)
//
// จัดกึ่งกลางด้วย inset-x-0 + mx-auto (ไม่ใช้ left-1/2 + -translate-x-1/2)
// เพราะถ้าความกว้างจอเป็นเลขคี่ ตำแหน่งจะตกลงครึ่งพิกเซล พอเป็น transform
// เบราว์เซอร์จะ composite ใหม่ทุกเฟรมตอนเลื่อนจอ เห็นเป็นอาการขยับ 1px
// ไป-มา (กระตุก) ส่วน margin auto คำนวณจบตั้งแต่ตอน layout จึงนิ่งกว่า
function BottomNav() {
  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md border-t border-[var(--border)] bg-[var(--surface)] md:border-x"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/village'}
          className={({ isActive }) =>
            `flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-[12px] active:bg-[var(--surface-2)] ${
              isActive
                ? 'font-semibold text-[var(--green-strong)]'
                : 'text-[var(--muted)]'
            }`
          }
        >
          <Icon size={22} strokeWidth={1.8} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
