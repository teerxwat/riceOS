// เจ้าของไฟล์: คนที่ 4
// route ทั้งหมดของ technician อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import TechnicianLayout from './TechnicianLayout.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import MapPage from './pages/MapPage.jsx'
import MachinesPage from './pages/MachinesPage.jsx'
import WorkOrdersPage from './pages/WorkOrdersPage.jsx'
import PartsPage from './pages/PartsPage.jsx'

// แดชบอร์ดช่าง: /technician + เมนูย่อยทั้งหมด (ต้องล็อกอินก่อน)
export const technicianRoutes = [
  {
    path: 'technician',
    element: (
      <ProtectedRoute>
        <TechnicianLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'machines', element: <MachinesPage /> },
      { path: 'workorders', element: <WorkOrdersPage /> },
      { path: 'parts', element: <PartsPage /> },
    ],
  },
]
