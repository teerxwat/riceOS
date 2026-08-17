import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { FAQ_ITEMS } from '../data/villageData'

function ManualPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <VillageLayout title="คู่มือการใช้งาน" backTo="/village/menu">
      <p className="pb-3 text-[13.5px] text-[var(--muted)]">
        คำถามที่พบบ่อยเกี่ยวกับการใช้งานแอป
      </p>
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <ul>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <li
                key={item.q}
                className="border-b border-[var(--border)] last:border-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-14 w-full cursor-pointer items-center gap-2 px-4 py-3 text-left active:bg-[var(--surface-2)]"
                >
                  <span className="min-w-0 flex-1 text-[14.5px] font-medium text-[var(--text)]">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-4 pb-4 text-[13.5px] leading-relaxed text-[var(--muted)]">
                    {item.a}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </VillageLayout>
  )
}

export default ManualPage
