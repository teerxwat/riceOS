import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar.jsx'
import '../../styles/center.css'

// Full-screen shell for the center-role dashboard — deliberately rendered
// outside the site's shared <Layout> (see router.jsx) so it keeps its own
// dedicated sidebar/topbar instead of stacking under the global Navbar.
export function CenterShell() {
  return (
    <div className="c-app">
      <div className="c-shell">
        <Sidebar />
        <main className="c-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
