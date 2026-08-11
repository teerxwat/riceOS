import {
  FileCheck2,
  FileText,
  ShieldCheck,
  UserCheck,
  ClipboardList,
} from 'lucide-react'

const BADGES = [
  { icon: UserCheck, label: 'ผู้ขายยืนยันตัวตน', sub: 'KYC Verified' },
  { icon: ShieldCheck, label: 'มาตรฐานสินค้า', sub: 'GAP / GMP' },
  { icon: FileCheck2, label: 'ตรวจสอบย้อนกลับได้', sub: 'Traceability' },
  { icon: ClipboardList, label: 'คุณภาพตรวจสอบแล้ว', sub: 'Quality Checked' },
  { icon: FileText, label: 'สัญญามาตรฐาน', sub: 'Standard Contract' },
]

export function StandardsFooter() {
  return (
    <div className="cm-standards">
      <div className="cm-standards__badges">
        {BADGES.map(({ icon: Icon, label, sub }) => (
          <div key={sub} className="cm-standards__badge">
            <Icon size={18} color="var(--c-brand-600)" />
            <div>
              <p className="cm-standards__badge-title">{label}</p>
              <p className="cm-standards__badge-sub">{sub}</p>
            </div>
          </div>
        ))}
      </div>
      <span className="cm-standards__notice">
        ซื้อขายปลอดภัย มั่นใจได้ ทุกธุรกรรมมีการกำกับของศูนย์และตรวจสอบแล้ว
      </span>
    </div>
  )
}
