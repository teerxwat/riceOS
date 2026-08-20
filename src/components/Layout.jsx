import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'

// โครงหน้าเว็บที่ใช้ร่วมกันทุกหน้า (มี Navbar + เนื้อหาที่เปลี่ยนตาม route)
//
// ยกเว้นเส้นทางที่มี "โครงแอปเต็มจอของตัวเอง" อยู่แล้ว (sidebar/topbar เอง)
// — การมี Navbar เว็บทั่วไปลอยซ้อนอีกชั้นด้านบนจะซ้ำกับของที่ฟีเจอร์นั้นมี
// อยู่แล้ว (เช่น วันที่/เวลาขึ้นสองที่ ผู้ใช้งานสับสนว่าอันไหนของจริง)
// - /village: bottom nav + header กระชับของตัวเอง (ดู VillageLayout.jsx)
// - /country: sidebar + Header ของตัวเอง (ดู DashboardLayout.jsx) —
//   ฟีเจอร์ที่ Navbar ให้ (ออกจากระบบ/สลับธีม) ย้ายไปอยู่ท้าย Sidebar แทน
// (center ใช้วิธีแยก route ออกจาก Layout นี้ไปเลยตั้งแต่ router.jsx —
// province/technician ยังไม่ได้ตรวจ อาจมีบั๊กซ้อนแบบเดียวกัน)
const APP_SHELL_PREFIXES = ['/village', '/country']

export default function Layout() {
  const { pathname } = useLocation()
  const isAppShell = APP_SHELL_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <div className={`app-layout${isAppShell ? ' app-layout-shell' : ''}`}>
      {!isAppShell && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
