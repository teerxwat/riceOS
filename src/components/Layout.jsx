import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'

// โครงหน้าเว็บที่ใช้ร่วมกันทุกหน้า (มี Navbar + เนื้อหาที่เปลี่ยนตาม route)
//
// ยกเว้น /village/* — หน้าฝั่งชาวบ้านตั้งใจทำให้รู้สึกเหมือนแอปมือถือจริง
// (bottom nav ของตัวเอง, header กระชับของตัวเอง) การมี Navbar เว็บทั่วไป
// ลอยอยู่ด้านบนซ้อนอีกชั้นจะทำให้ยังรู้สึกเหมือน "เว็บที่มีแอปอยู่ข้างใน"
// แทนที่จะเป็นแอป — ฟีเจอร์ที่ Navbar ให้ (ออกจากระบบ/สลับธีม) ย้ายไปอยู่ใน
// เมนูของ village เอง (ดู src/features/village/pages/MenuPage.jsx)
export default function Layout() {
  const { pathname } = useLocation()
  const isAppShell = pathname.startsWith('/village')

  return (
    <div className={`app-layout${isAppShell ? ' app-layout-shell' : ''}`}>
      {!isAppShell && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
