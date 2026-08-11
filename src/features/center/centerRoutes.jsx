import RequireCenterRole from './RequireCenterRole.jsx'
import { CenterShell } from './components/layout/CenterShell.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { SatellitePage } from './pages/SatellitePage.jsx'
import { MarketplacePage } from './pages/MarketplacePage.jsx'
import { AddFarmerPage } from './pages/AddFarmerPage.jsx'

// Rendered as a top-level route in router.jsx (outside the shared <Layout>)
// so the center dashboard keeps its own full-screen sidebar/topbar chrome.
export const centerRoutes = [
  {
    path: 'app/center',
    element: (
      <RequireCenterRole>
        <CenterShell />
      </RequireCenterRole>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'satellite', element: <SatellitePage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'add-farmer', element: <AddFarmerPage /> },
    ],
  },
]
