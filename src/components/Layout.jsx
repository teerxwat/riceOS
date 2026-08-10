import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

// โครงหน้าเว็บที่ใช้ร่วมกันทุกหน้า (มี Navbar + เนื้อหาที่เปลี่ยนตาม route)
export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
