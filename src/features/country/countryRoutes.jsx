import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import CountryOverviewPage from './CountryOverviewPage.jsx'
import ComingSoonPage from './ComingSoonPage.jsx'

const COMING_SOON_PAGES = [
  { path: 'country/centers', title: 'ศูนย์ข้าวทั้งหมด' },
  { path: 'country/map', title: 'แผนที่ประเทศ' },
  { path: 'country/performance', title: 'ผลการดำเนินงาน' },
  { path: 'country/carbon', title: 'คาร์บอนและสิ่งแวดล้อม' },
  { path: 'country/income', title: 'รายได้เกษตรกร' },
  { path: 'country/no-burning', title: 'การลดการเผา' },
  { path: 'country/forecast', title: 'แนวโน้มและพยากรณ์' },
  { path: 'country/reports', title: 'รายงานผู้บริหาร' },
  { path: 'country/settings', title: 'ตั้งค่า' },
]

export const countryRoutes = [
  {
    path: 'country',
    element: (
      <ProtectedRoute>
        <CountryOverviewPage />
      </ProtectedRoute>
    ),
  },
  ...COMING_SOON_PAGES.map(({ path, title }) => ({
    path,
    element: (
      <ProtectedRoute>
        <ComingSoonPage title={title} />
      </ProtectedRoute>
    ),
  })),
]
