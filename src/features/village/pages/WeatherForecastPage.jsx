import { CloudSun, CloudRain, Cloud, Sun } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { WEATHER_FORECAST } from '../data/villageData'

function conditionIcon(condition) {
  if (condition.includes('ฝน')) return CloudRain
  if (condition.includes('เมฆ')) return Cloud
  if (condition.includes('จัด')) return Sun
  return CloudSun
}

function WeatherForecastPage() {
  return (
    <VillageLayout title="พยากรณ์อากาศ 7 วัน" backTo="/village">
      <ul className="flex flex-col gap-2">
        {WEATHER_FORECAST.map((d) => {
          const Icon = conditionIcon(d.condition)
          return (
            <li
              key={d.day}
              className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <Icon size={26} className="shrink-0 text-[var(--gold)]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] font-semibold text-[var(--text)]">
                  {d.day}
                </span>
                <span className="block text-[12.5px] text-[var(--muted)]">
                  {d.date} · {d.condition} · ฝน {d.rain}%
                </span>
              </span>
              <span className="shrink-0 text-right text-[14.5px] font-semibold text-[var(--text)] tabular-nums">
                {d.high}°
                <span className="ml-1 font-normal text-[var(--muted)]">
                  {d.low}°
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </VillageLayout>
  )
}

export default WeatherForecastPage
