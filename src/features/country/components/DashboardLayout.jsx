import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import AIAssistantPanel from './AIAssistantPanel'

// min-h-svh เฉยๆ (ไม่หัก var(--nav-h)) — Navbar เว็บกลางถูกซ่อนไว้ที่
// Layout.jsx เฉพาะเส้นทาง /country แล้ว (ซ้ำกับ Header ของแดชบอร์ดนี้เอง)
// เพราะงั้นไม่มี navbar ลอยด้านบนให้ต้องหักความสูงออกอีกต่อไป
function DashboardLayout({ title, subtitle, children }) {
  const [aiOpen, setAiOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-svh bg-db-bg text-body text-db-text">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenAssistant={() => setAiOpen(true)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 pt-6 pb-8 sm:px-7">{children}</main>
      </div>
      <AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  )
}

export default DashboardLayout
