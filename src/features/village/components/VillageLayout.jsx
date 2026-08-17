import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bell } from 'lucide-react'
import BottomNav from './BottomNav'
import { PROFILE, NOTIFICATIONS } from '../data/villageData'

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
//
// backTo: หน้าย่อย (โปรไฟล์/ตั้งค่า/รายละเอียดแปลง ฯลฯ) ไม่มีอวาตาร์+กระดิ่ง
// เหมือนหน้าแท็บหลัก ใช้หัวข้อ + ปุ่มย้อนกลับแทน (แพทเทิร์นเดียวกับแอปมือถือ
// ทั่วไปที่หน้ารายละเอียดจะมีปุ่มย้อนกลับ ไม่ใช่โลโก้/อวาตาร์)
function VillageLayout({ title, subtitle, hideHeader, backTo, children }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [readIds, setReadIds] = useState(() =>
    NOTIFICATIONS.filter((n) => n.read).map((n) => n.id)
  )
  const unreadCount = NOTIFICATIONS.filter(
    (n) => !readIds.includes(n.id)
  ).length

  function markRead(id) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-[var(--bg)] md:border-x md:border-[var(--border)] md:shadow-[var(--card-shadow)]">
      {!hideHeader &&
        (backTo ? (
          <header
            className="flex items-center gap-2 px-2 pb-3"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <Link
              to={backTo}
              aria-label="ย้อนกลับ"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--text)] active:bg-[var(--surface-2)]"
            >
              <ArrowLeft size={22} strokeWidth={2} />
            </Link>
            <p className="truncate text-[17px] font-bold text-[var(--text)]">
              {title}
            </p>
          </header>
        ) : (
          <header
            className="relative flex items-center gap-3 px-4 pb-3"
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
              onClick={() => setNotifOpen((o) => !o)}
              aria-label={`การแจ้งเตือน มี ${unreadCount} รายการที่ยังไม่อ่าน`}
              aria-expanded={notifOpen}
              className="relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] active:scale-95"
            >
              <Bell size={20} strokeWidth={1.8} />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[11px] leading-none font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                {/* คลิกพื้นหลังนอกกล่องเพื่อปิด — ไม่มี backdrop มองเห็นเอง
                    (โปร่งใส) แค่ดักคลิก */}
                <button
                  type="button"
                  aria-label="ปิดการแจ้งเตือน"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setNotifOpen(false)}
                />
                <div className="absolute top-full right-4 z-50 mt-1 max-h-[70svh] w-[calc(100%-2rem)] max-w-xs overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--card-shadow)]">
                  <p className="border-b border-[var(--border)] px-4 py-3 text-[14px] font-bold text-[var(--text)]">
                    การแจ้งเตือน
                  </p>
                  <ul>
                    {NOTIFICATIONS.map((n) => (
                      <li
                        key={n.id}
                        className="border-b border-[var(--border)] last:border-0"
                      >
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className="flex w-full min-h-16 cursor-pointer items-start gap-2 px-4 py-3 text-left active:bg-[var(--surface-2)]"
                        >
                          {!readIds.includes(n.id) && (
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                n.tone === 'warning'
                                  ? 'bg-[var(--gold)]'
                                  : 'bg-[var(--green-strong)]'
                              }`}
                            />
                          )}
                          <span
                            className={`min-w-0 flex-1 ${readIds.includes(n.id) ? 'opacity-60' : ''}`}
                          >
                            <span className="block text-[13.5px] font-semibold text-[var(--text)]">
                              {n.title}
                            </span>
                            <span className="mt-0.5 block text-[12.5px] text-[var(--muted)]">
                              {n.body}
                            </span>
                            <span className="mt-1 block text-[11px] text-[var(--muted)]">
                              {n.time}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </header>
        ))}

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
