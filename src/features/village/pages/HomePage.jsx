import { Link } from 'react-router-dom'
import {
  CloudSun,
  Droplets,
  Wind,
  ChevronRight,
  ListChecks,
  Award,
  Wallet,
  ShieldCheck,
} from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import PlotCard from '../components/PlotCard'
import { WEATHER_TODAY, TODAY_STATS, PLOTS, NEWS } from '../data/villageData'

const NEWS_TONE = {
  warning:
    'text-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_15%,transparent)]',
  good: 'text-[var(--green-strong)] bg-[var(--badge-bg)]',
}

const STAT_ICON = {
  tasks: ListChecks,
  points: Award,
  income: Wallet,
  status: ShieldCheck,
}

// ปุ่ม "ดูทั้งหมด" ใช้ซ้ำหลายจุดในหน้านี้ — ทำ min-h-11 ให้แตะง่ายบนมือถือ
// (ของเดิมเป็นแค่ตัวหนังสือ+ลูกศร บรรทัดเดียว เล็กเกินไปสำหรับแตะด้วยนิ้ว)
function SectionLink({ to, onClick, children }) {
  const className =
    'flex min-h-11 shrink-0 cursor-pointer items-center gap-0.5 px-1 text-[14px] font-semibold text-[var(--green-strong)]'
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
        <ChevronRight size={16} />
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
      <ChevronRight size={16} />
    </button>
  )
}

function HomePage() {
  return (
    <VillageLayout>
      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[var(--text)]">
              สภาพอากาศวันนี้
            </p>
            <SectionLink>ดูพยากรณ์ 7 วัน</SectionLink>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <CloudSun size={40} className="shrink-0 text-[var(--gold)]" />
            <div>
              <p className="text-[32px] leading-none font-bold text-[var(--text)]">
                {WEATHER_TODAY.temp}°C
              </p>
              <p className="mt-1 text-[13px] text-[var(--muted)]">
                {WEATHER_TODAY.condition}
              </p>
            </div>
            <div className="ml-auto grid min-w-0 grid-cols-3 gap-x-2 gap-y-1 text-center text-[12px] text-[var(--muted)]">
              <div>
                <Droplets size={18} className="mx-auto text-[var(--muted)]" />
                <p className="mt-1 text-[14px] font-semibold text-[var(--text)]">
                  {WEATHER_TODAY.rain}%
                </p>
                ฝน
              </div>
              <div>
                <Droplets size={18} className="mx-auto text-[var(--muted)]" />
                <p className="mt-1 text-[14px] font-semibold text-[var(--text)]">
                  {WEATHER_TODAY.humidity}%
                </p>
                ความชื้น
              </div>
              <div>
                <Wind size={18} className="mx-auto text-[var(--muted)]" />
                <p className="mt-1 text-[14px] font-semibold text-[var(--text)]">
                  {WEATHER_TODAY.windKph}
                </p>
                กม./ชม.
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[var(--text)]">
              แปลงของฉัน {PLOTS.length} แปลง
            </p>
            <SectionLink to="/village/plots">ดูทั้งหมด</SectionLink>
          </div>
          <PlotCard plot={PLOTS[0]} />
        </section>

        <section className="grid grid-cols-2 gap-3">
          {TODAY_STATS.map((stat) => {
            const Icon = STAT_ICON[stat.key]
            return (
              <div
                key={stat.key}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className={
                    stat.tone === 'good'
                      ? 'text-[var(--green-strong)]'
                      : 'text-[var(--muted)]'
                  }
                />
                <p
                  className={`mt-2 text-[20px] leading-tight font-bold ${
                    stat.tone === 'good'
                      ? 'text-[var(--green-strong)]'
                      : 'text-[var(--text)]'
                  }`}
                >
                  {stat.value}
                  {stat.unit && (
                    <span className="ml-1 text-[12px] font-normal text-[var(--muted)]">
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[13px] text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[var(--text)]">
              ข่าวสารแนะนำสำหรับคุณ
            </p>
            <SectionLink>ดูทั้งหมด</SectionLink>
          </div>
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
        </section>
      </div>
    </VillageLayout>
  )
}

export default HomePage
