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
const PlotDetailPage = lazy(() => import('./pages/PlotDetailPage.jsx'))
const AddPlotPage = lazy(() => import('./pages/AddPlotPage.jsx'))
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage.jsx'))
const MarketPage = lazy(() => import('./pages/MarketPage.jsx'))
const SellRicePage = lazy(() => import('./pages/SellRicePage.jsx'))
const SalesHistoryPage = lazy(() => import('./pages/SalesHistoryPage.jsx'))
const PaymentHistoryPage = lazy(() => import('./pages/PaymentHistoryPage.jsx'))
const MenuPage = lazy(() => import('./pages/MenuPage.jsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'))
const NotificationSettingsPage = lazy(
  () => import('./pages/NotificationSettingsPage.jsx')
)
const ManualPage = lazy(() => import('./pages/ManualPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const WeatherForecastPage = lazy(
  () => import('./pages/WeatherForecastPage.jsx')
)
const NewsPage = lazy(() => import('./pages/NewsPage.jsx'))
const GamePage = lazy(() => import('./pages/GamePage.jsx'))
const CarbonWalletPage = lazy(() => import('./pages/CarbonWalletPage.jsx'))
const CarbonEnrollPage = lazy(() => import('./pages/CarbonEnrollPage.jsx'))
const WaterLogPage = lazy(() => import('./pages/WaterLogPage.jsx'))
const MrvEvidencePage = lazy(() => import('./pages/MrvEvidencePage.jsx'))

const PAGES = [
  { path: 'village', Page: HomePage },
  { path: 'village/game', Page: GamePage },
  { path: 'village/carbon', Page: CarbonWalletPage },
  { path: 'village/carbon/enroll', Page: CarbonEnrollPage },
  { path: 'village/weather', Page: WeatherForecastPage },
  { path: 'village/news', Page: NewsPage },
  { path: 'village/plots', Page: PlotsPage },
  { path: 'village/plots/new', Page: AddPlotPage },
  { path: 'village/plots/:id', Page: PlotDetailPage },
  { path: 'village/plots/:id/water-log', Page: WaterLogPage },
  { path: 'village/plots/:id/mrv', Page: MrvEvidencePage },
  { path: 'village/ai', Page: AIAssistantPage },
  { path: 'village/market', Page: MarketPage },
  { path: 'village/market/sell', Page: SellRicePage },
  { path: 'village/market/history', Page: SalesHistoryPage },
  { path: 'village/market/payments', Page: PaymentHistoryPage },
  { path: 'village/menu', Page: MenuPage },
  { path: 'village/profile', Page: ProfilePage },
  { path: 'village/notifications', Page: NotificationSettingsPage },
  { path: 'village/manual', Page: ManualPage },
  { path: 'village/contact', Page: ContactPage },
  { path: 'village/about', Page: AboutPage },
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
