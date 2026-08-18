import { useState } from 'react'
import { FileText, Truck, FlaskConical, Image as ImageIcon } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { DOCUMENT_CATEGORIES, DOCUMENTS } from '../data/villageData'

const CATEGORY_ICON = {
  receipt: FileText,
  delivery: Truck,
  analysis: FlaskConical,
  photo: ImageIcon,
}

function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const totalCount = DOCUMENT_CATEGORIES.reduce((sum, c) => sum + c.count, 0)
  const shown = activeCategory
    ? DOCUMENTS.filter((d) => d.category === activeCategory)
    : DOCUMENTS

  return (
    <VillageLayout title="คลังเอกสาร" backTo="/village/menu">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[13px] text-[var(--muted)]">เอกสารทั้งหมด</p>
          <p className="text-[22px] font-bold text-[var(--text)] tabular-nums">
            {totalCount} รายการ
          </p>
        </section>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`min-h-9 cursor-pointer rounded-full border px-3.5 text-[13px] font-medium ${
              !activeCategory
                ? 'border-[var(--green-strong)] bg-[var(--badge-bg)] text-[var(--green-strong)]'
                : 'border-[var(--border)] text-[var(--text)]'
            }`}
          >
            ทั้งหมด
          </button>
          {DOCUMENT_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveCategory(c.key)}
              className={`min-h-9 cursor-pointer rounded-full border px-3.5 text-[13px] font-medium ${
                activeCategory === c.key
                  ? 'border-[var(--green-strong)] bg-[var(--badge-bg)] text-[var(--green-strong)]'
                  : 'border-[var(--border)] text-[var(--text)]'
              }`}
            >
              {c.label} ({c.count})
            </button>
          ))}
        </div>

        <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {shown.map((doc) => {
            const Icon = CATEGORY_ICON[doc.category]
            return (
              <li
                key={doc.id}
                className="flex min-h-16 items-center gap-3 border-b border-[var(--border)] px-4 last:border-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] text-[var(--text)]">
                    {doc.name}
                  </span>
                  <span className="block text-[12px] text-[var(--muted)]">
                    {doc.date}
                  </span>
                </span>
              </li>
            )
          })}
          {shown.length === 0 && (
            <li className="px-4 py-6 text-center text-[13.5px] text-[var(--muted)]">
              ไม่มีเอกสารในหมวดนี้
            </li>
          )}
        </ul>
      </div>
    </VillageLayout>
  )
}

export default DocumentsPage
