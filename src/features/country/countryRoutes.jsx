// เจ้าของไฟล์: คนที่ 3
// route ทั้งหมดของ country อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
//
// ไฟล์นี้ export config array (countryRoutes) ไม่ใช่ component เดี่ยวๆ
// ผสมกับ local const ที่มาจาก lazy() ซึ่งหน้าตาเหมือน component — ทำให้กฎ
// fast-refresh ของ ESLint ไม่พอใจ (เป็น pattern ปกติของไฟล์ route manifest
// ไม่กระทบความถูกต้อง แค่กระทบ dev HMR เล็กน้อยเวลาแก้ไฟล์นี้ตรงๆ)
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import PageLoading from './components/PageLoading.jsx'

// โหลดแบบ lazy ทุกหน้า — หน้าเหล่านี้ดึง leaflet + geojson ขอบเขตจังหวัด
// (~250KB) เข้ามาด้วย ถ้า import ตรงๆ ทุกหน้าในแอป (login, home, province)
// จะโดนบังคับโหลดสิ่งเหล่านี้ไปด้วยทั้งที่ไม่ได้ใช้
const CountryOverviewPage = lazy(
  () => import('./pages/CountryOverviewPage.jsx')
)
const CentersPage = lazy(() => import('./pages/CentersPage.jsx'))
const MapPage = lazy(() => import('./pages/MapPage.jsx'))
const PerformancePage = lazy(() => import('./pages/PerformancePage.jsx'))
const CarbonPage = lazy(() => import('./pages/CarbonPage.jsx'))
const IncomePage = lazy(() => import('./pages/IncomePage.jsx'))
const NoBurningPage = lazy(() => import('./pages/NoBurningPage.jsx'))
const ForecastPage = lazy(() => import('./pages/ForecastPage.jsx'))
const ReportsPage = lazy(() => import('./pages/ReportsPage.jsx'))
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'))

const PAGES = [
  { path: 'country', Page: CountryOverviewPage },
  { path: 'country/centers', Page: CentersPage },
  { path: 'country/map', Page: MapPage },
  { path: 'country/performance', Page: PerformancePage },
  { path: 'country/carbon', Page: CarbonPage },
  { path: 'country/income', Page: IncomePage },
  { path: 'country/no-burning', Page: NoBurningPage },
  { path: 'country/forecast', Page: ForecastPage },
  { path: 'country/reports', Page: ReportsPage },
  { path: 'country/settings', Page: SettingsPage },
]

export const countryRoutes = PAGES.map(({ path, Page }) => ({
  path,
  element: (
    <ProtectedRoute>
      <Suspense fallback={<PageLoading />}>
        <Page />
      </Suspense>
    </ProtectedRoute>
  ),
}))
