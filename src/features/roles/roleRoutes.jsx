import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import RolePage from './RolePage.jsx'

// หน้าบทบาท (ต้องล็อกอินก่อน)
export const roleRoutes = [
  {
    path: 'app',
    element: (
      <ProtectedRoute>
        <RolePage />
      </ProtectedRoute>
    ),
  },
]
