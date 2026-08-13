import { Bell } from 'lucide-react'
import BottomNav from './BottomNav'
import { PROFILE } from '../data/villageData'

// จำลองหน้าตาแอปมือถือ (คอลัมน์แคบกึ่งกลางจอ) แม้เปิดผ่านเบราว์เซอร์เดสก์ท็อป
// เพราะ role ชาวบ้านใช้งานผ่านมือถือเป็นหลักตาม mockup ต้นแบบ
//
// ไม่มี Navbar เว็บทั่วไปลอยอยู่ด้านบนอีกแล้ว (ซ่อนไว้ที่ Layout.jsx เฉพาะ
// เส้นทาง /village) เพราะงั้นหน้านี้ "เป็น" แอปเต็มตัว ไม่ใช่หน้าเว็บที่มีแอป
// ซ้อนอยู่ข้างใน — เต็มความสูงจอจริง (min-h-svh เฉยๆ ไม่ต้องหักความสูง navbar
// อีกต่อไป) และเว้น safe-area ให้ตัวเองเพราะไม่มี Navbar คอยกันขอบบนให้แล้ว
//
// ตัวอักษรในทั้ง feature นี้ตั้งใจให้ "ใหญ่กว่า" ฝั่ง country (แดชบอร์ดผู้บริหาร
// ที่เน้นความหนาแน่นของข้อมูล) เพราะผู้ใช้จริงเป็นชาวนา/เกษตรกรที่อาจไม่คุ้น
// แอปมือถือ อ่านตัวเล็กๆ ลำบาก จึงเลือกความอ่านง่ายมากกว่าความหนาแน่น
//
// จอกว้าง (md ขึ้นไป, เช่นเปิดจากคอมพิวเตอร์): คอลัมน์ยังแคบเท่าเดิม (ไม่ยืด
// เต็มจอ เพราะจะไม่เหมือนแอปมือถือแล้ว) แต่ใส่กรอบ+เงาให้ดูตั้งใจ ไม่ใช่แค่มี
// พื้นที่ว่างเปล่าซ้าย-ขวา — พื้นหลังไล่สีของหน้าเว็บ (body) จะโชว์เป็นขอบด้าน
// ข้างแทน ให้ความรู้สึกเหมือนดูแอปผ่านกรอบมือถือจำลอง
function VillageLayout({ title, subtitle, hideHeader, children }) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-[var(--bg)] md:border-x md:border-[var(--border)] md:shadow-[var(--card-shadow)]">
      {!hideHeader && (
        <header
          className="flex items-center gap-3 px-4 pb-3"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <img
            src={PROFILE.avatar}
            alt=""
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-[var(--muted)]">
              {title ?? 'สวัสดีครับ'}
            </p>
            <p className="truncate text-[17px] font-bold text-[var(--text)]">
              {subtitle ?? PROFILE.name}
            </p>
          </div>
          <button
            type="button"
            aria-label="การแจ้งเตือน มี 3 รายการที่ยังไม่อ่าน"
            className="relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] active:scale-95"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="absolute top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[11px] leading-none font-bold text-white">
              3
            </span>
          </button>
        </header>
      )}

      <main
        className="flex-1 px-4"
        style={{
          paddingBottom:
            'calc(1.5rem + var(--nav-h) + env(safe-area-inset-bottom))',
        }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  )
}

export default VillageLayout
