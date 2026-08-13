// เจ้าของไฟล์: คนที่ทำ role ชาวบ้าน
// route ทั้งหมดของ village อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
//
// export config array ไม่ใช่ component เดี่ยว ผสมกับ local const จาก lazy()
// เลยต้องปิดกฎ fast-refresh ของ ESLint สำหรับไฟล์นี้ (เหมือน countryRoutes.jsx)
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import PageLoading from './components/PageLoading.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const PlotsPage = lazy(() => import('./pages/PlotsPage.jsx'))
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage.jsx'))
const MarketPage = lazy(() => import('./pages/MarketPage.jsx'))
const MenuPage = lazy(() => import('./pages/MenuPage.jsx'))

const PAGES = [
  { path: 'village', Page: HomePage },
  { path: 'village/plots', Page: PlotsPage },
  { path: 'village/ai', Page: AIAssistantPage },
  { path: 'village/market', Page: MarketPage },
  { path: 'village/menu', Page: MenuPage },
]

export const villageRoutes = PAGES.map(({ path, Page }) => ({
  path,
  element: (
    <ProtectedRoute>
      <Suspense fallback={<PageLoading />}>
        <Page />
      </Suspense>
    </ProtectedRoute>
  ),
}))
