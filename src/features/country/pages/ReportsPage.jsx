import { FileText, Download } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { REPORTS_LIST } from '../data/pagesData'
import { downloadText } from '../utils/exportCsv'

function handleDownload(report) {
  const content = `${report.name}\n${report.period}\n\n(ไฟล์ตัวอย่าง — ระบบสร้างรายงาน ${report.format} จริงยังอยู่ระหว่างพัฒนา)`
  downloadText(`${report.name}.txt`, content)
}

function ReportsPage() {
  return (
    <DashboardLayout
      title="รายงานผู้บริหาร"
      subtitle="ดาวน์โหลดรายงานสรุปสำหรับผู้บริหารระดับประเทศ"
    >
      <section className="rounded-db border border-db-border bg-db-surface p-2">
        <ul className="flex flex-col">
          {REPORTS_LIST.map((report) => (
            <li
              key={report.id}
              className="flex items-center gap-3 border-b border-db-border p-3.5 last:border-0"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-db-green-bg text-db-green">
                <FileText size={18} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body font-semibold text-db-text">
                  {report.name}
                </p>
                <p className="text-label text-db-text-muted">{report.period}</p>
              </div>
              <span className="rounded-md border border-db-border px-2 py-0.5 text-caption font-medium text-db-text-muted">
                {report.format}
              </span>
              <button
                type="button"
                onClick={() => handleDownload(report)}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-db-border bg-db-surface-alt text-db-text-muted hover:text-db-text"
                aria-label={`ดาวน์โหลด ${report.name}`}
              >
                <Download size={16} strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </DashboardLayout>
  )
}

export default ReportsPage
