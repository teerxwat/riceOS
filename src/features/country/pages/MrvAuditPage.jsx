import DashboardLayout from '../components/DashboardLayout'
import KpiStrip from '../components/KpiStrip'
import DataTable from '../components/DataTable'
import AttentionFeed from '../components/AttentionFeed'
import { MRV_SUMMARY, MRV_CENTERS, MRV_FLAGS } from '../data/pagesData'

const CENTER_COLUMNS = [
  { key: 'name', label: 'ศูนย์ข้าว' },
  { key: 'province', label: 'จังหวัด' },
  { key: 'plotsEnrolled', label: 'แปลงที่เข้าร่วม', align: 'right' },
  {
    key: 'completePct',
    label: 'ความครบถ้วนหลักฐาน',
    align: 'right',
    render: (row) => (
      <span
        className={
          row.completePct >= 90
            ? 'text-db-green'
            : row.completePct >= 50
              ? 'text-db-amber'
              : 'text-db-red'
        }
      >
        {row.completePct}%
      </span>
    ),
  },
  {
    key: 'auditReady',
    label: 'สถานะ',
    render: (row) => (
      <span
        className={`rounded-full px-2.5 py-1 text-label font-semibold ${
          row.auditReady
            ? 'text-db-green bg-db-green-bg'
            : 'text-db-amber bg-db-amber-bg'
        }`}
      >
        {row.auditReady ? 'พร้อมตรวจสอบ' : 'ยังไม่พร้อม'}
      </span>
    ),
  },
]

// หน้าใหม่: ภาพรวมความพร้อม MRV (Measurement, Reporting, Verification) ระดับ
// ประเทศ — ต่อยอดจากกระเป๋าคาร์บอนของฝั่งชาวบ้าน (เช็คลิสต์หลักฐานต่อแปลง)
// มาเป็นมุมมองผู้บริหารที่ต้องดูภาพรวมความพร้อมตรวจสอบทั้งระบบ ไม่ใช่ทีละแปลง
function MrvAuditPage() {
  return (
    <DashboardLayout
      title="ความพร้อมตรวจสอบ MRV"
      subtitle="ภาพรวมความครบถ้วนของหลักฐาน Measurement, Reporting, Verification รายศูนย์"
    >
      <div className="flex flex-col gap-5">
        <KpiStrip items={MRV_SUMMARY} />

        <AttentionFeed items={MRV_FLAGS} />

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            ความครบถ้วนหลักฐานรายศูนย์
          </h2>
          <div className="mt-4">
            <DataTable
              columns={CENTER_COLUMNS}
              rows={MRV_CENTERS}
              caption="ความครบถ้วนของหลักฐาน MRV รายศูนย์ข้าว"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default MrvAuditPage
