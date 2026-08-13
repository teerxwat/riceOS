import Preloader from './components/Preloader.jsx'
import AppRoutes from './router.jsx'

// App บางมาก: แสดง preloader ครั้งเดียว แล้วเรียก router
// (หน้า Country อยู่ใน src/Country/ — รอเชื่อมเข้า routes)
export default function App() {
  return (
    <>
      <Preloader />
      <AppRoutes />
    </>
  )
}
