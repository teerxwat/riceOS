import {
  ClipboardList,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'
import { StatCard } from '../common/StatCard.jsx'

export function KpiRow({ kpis }) {
  return (
    <div className="c-grid c-grid-2 c-grid-md-3 c-grid-xl-6">
      <StatCard
        icon={DollarSign}
        label="มูลค่าซื้อขายวันนี้"
        value={kpis.todayValueBaht.toLocaleString('th-TH')}
        unit="บาท"
        deltaLabel={`+${kpis.todayChangePercent}% จากเมื่อวาน`}
        deltaTone="up"
      />
      <StatCard
        icon={ShoppingCart}
        label="ประกาศขายทั้งหมด"
        value={kpis.totalListings.toLocaleString('th-TH')}
        unit="รายการ"
        deltaLabel={`+${kpis.listingsChangePercent}%`}
        deltaTone="up"
      />
      <StatCard
        icon={Package}
        label="ปริมาณรวมพร้อมขาย"
        value={kpis.totalVolumeTon.toLocaleString('th-TH')}
        unit="ตัน"
        deltaLabel={`+${kpis.volumeChangePercent}%`}
        deltaTone="up"
      />
      <StatCard
        icon={ClipboardList}
        label="คำสั่งซื้อรอจัดส่ง"
        value={kpis.pendingOrders.toLocaleString('th-TH')}
        unit="รายการ"
        deltaLabel={`+${kpis.pendingOrdersChangeCount} รายการ`}
        deltaTone="up"
      />
      <StatCard
        icon={TrendingUp}
        label="มูลค่าซื้อขายสะสมปีนี้"
        value={kpis.yearToDateValueBaht.toLocaleString('th-TH')}
        unit="บาท"
      />
      <StatCard
        icon={Users}
        label="สมาชิกที่ยืนยันแล้ว"
        value={kpis.activeMembers.toLocaleString('th-TH')}
        unit="ราย"
        deltaLabel={`+${kpis.activeMembersChangeCount} ราย`}
        deltaTone="up"
      />
    </div>
  )
}
