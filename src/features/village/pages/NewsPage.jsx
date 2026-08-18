import VillageLayout from '../components/VillageLayout'
import { NEWS } from '../data/villageData'

const NEWS_TONE = {
  warning:
    'text-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_15%,transparent)]',
  good: 'text-[var(--green-strong)] bg-[var(--badge-bg)]',
}

function NewsPage() {
  return (
    <VillageLayout title="ข่าวสารทั้งหมด" backTo="/village">
      <ul className="flex flex-col gap-2">
        {NEWS.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <span
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${NEWS_TONE[item.tone]}`}
            >
              {item.tag}
            </span>
            <p className="mt-2 text-[14.5px] leading-snug text-[var(--text)]">
              {item.title}
            </p>
            <p className="mt-1.5 text-[12.5px] text-[var(--muted)]">
              {item.date}
            </p>
          </li>
        ))}
      </ul>
    </VillageLayout>
  )
}

export default NewsPage
