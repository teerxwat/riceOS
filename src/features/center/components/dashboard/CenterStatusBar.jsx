import { CloudRain, Droplets, Thermometer } from 'lucide-react'

export function CenterStatusBar({ info }) {
  return (
    <div className="cd-statusbar">
      <div>
        <p className="cd-statusbar__name">{info.name}</p>
        <p className="cd-statusbar__meta">
          รหัสศูนย์: {info.code} | {info.subDistrict} {info.district}{' '}
          {info.province}
        </p>
      </div>

      <div className="cd-statusbar__weather">
        <span>
          <Thermometer size={15} color="#fb923c" /> {info.weather.tempC}°C
        </span>
        <span>
          <Droplets size={15} color="#38bdf8" /> {info.weather.humidityPercent}%
        </span>
        <span>
          <CloudRain size={15} color="var(--c-text-faint)" /> ฝนวันนี้{' '}
          {info.weather.rainChancePercent}%
        </span>
        <span className="cd-statusbar__online">
          <span className="cd-statusbar__dot" />
          {info.online ? 'ออนไลน์' : 'ออฟไลน์'}
        </span>
      </div>
    </div>
  )
}
