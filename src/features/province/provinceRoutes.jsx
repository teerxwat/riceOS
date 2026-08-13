// เจ้าของไฟล์: คนที่ 2
// route ทั้งหมดของ province อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import ProvinceLayout from './ProvinceLayout.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import CentersPage from './pages/CentersPage.jsx'
import MapPage from './pages/MapPage.jsx'
import ComparePage from './pages/ComparePage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import AlertsPage from './pages/AlertsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

// แดชบอร์ดจังหวัด: /province + เมนูย่อยทั้งหมด (ต้องล็อกอินก่อน)
export const provinceRoutes = [
  {
    path: 'province',
    element: (
      <ProtectedRoute>
        <ProvinceLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'centers', element: <CentersPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]
