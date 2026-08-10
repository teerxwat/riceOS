import DashboardLayout from '../components/layout/DashboardLayout'

function CountryOverviewPage() {
  return (
    <DashboardLayout
      activeLabel="ภาพรวมประเทศ"
      title="ภาพรวมประเทศไทย"
      subtitle="โครงการยกระดับศูนย์ข้าวชุมชนสู่การขับเคลื่อนข้าวเปลือกคาร์บอนต่ำ 1,000 ศูนย์"
    >
      <p className="rounded-db border border-dashed border-db-border p-4 text-[13px] text-db-text-muted">
        บทเรียนถัดไป: เติม KPI card, กราฟ, ตาราง และแผนที่เข้ามาในนี้ทีละส่วน
      </p>
    </DashboardLayout>
  )
}

export default CountryOverviewPage
