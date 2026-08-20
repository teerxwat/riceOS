import { Sprout } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { APP_INFO } from '../data/villageData'

function AboutPage() {
  return (
    <VillageLayout title="เกี่ยวกับแอป" backTo="/village/menu">
      <div className="flex flex-col items-center pt-4 pb-2 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--badge-bg)] text-[var(--green-strong)]">
          <Sprout size={32} strokeWidth={1.8} />
        </span>
        <p className="mt-3 text-[19px] font-bold text-[var(--text)]">
          {APP_INFO.name}
        </p>
        <p className="mt-0.5 text-[13px] text-[var(--muted)]">
          เวอร์ชัน {APP_INFO.version}
        </p>
        <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[var(--text)]">
          {APP_INFO.description}
        </p>
      </div>
    </VillageLayout>
  )
}

export default AboutPage
