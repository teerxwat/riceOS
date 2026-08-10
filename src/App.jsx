import Preloader from './components/Preloader.jsx'
import AppRoutes from './router.jsx'

// App บางมาก: แสดง preloader ครั้งเดียว แล้วเรียก router
export default function App() {
  return (
    <>
      <Preloader />
      <AppRoutes />
    </>
  )
}
