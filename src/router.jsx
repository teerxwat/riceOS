import { useRoutes } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// ทุก feature เป็นเจ้าของ route ของตัวเองในไฟล์ของตัวเอง (โครงเดียวกันหมด)
import { homeRoutes } from './features/home/homeRoutes.jsx'
import { authRoutes } from './features/auth/authRoutes.jsx'
import { roleRoutes } from './features/roles/roleRoutes.jsx'
import { centerRoutes } from './features/center/centerRoutes.jsx'
import { provinceRoutes } from './features/province/provinceRoutes.jsx'
import { technicianRoutes } from './features/technician/technicianRoutes.jsx'
import { countryRoutes } from './features/country/countryRoutes.jsx'
import { villageRoutes } from './features/village/villageRoutes.jsx'

// ไฟล์นี้คือ "hotspot" เดียวที่ทุกคนใช้ร่วม
export default function AppRoutes() {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        ...homeRoutes,
        ...authRoutes,
        ...roleRoutes,
        ...provinceRoutes,
        ...technicianRoutes,
        ...countryRoutes,
        ...villageRoutes,
      ],
    },
    // เต็มจอ ไม่มี Navbar กลาง — แดชบอร์ดศูนย์ข้าวมี sidebar/topbar ของตัวเอง
    ...centerRoutes,
  ])
}
