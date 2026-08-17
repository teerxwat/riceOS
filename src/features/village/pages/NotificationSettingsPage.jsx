import { useState } from 'react'
import VillageLayout from '../components/VillageLayout'

const STORAGE_KEY = 'village_notif_settings'

const OPTIONS = [
  {
    key: 'weather',
    label: 'แจ้งเตือนสภาพอากาศ',
    desc: 'พายุ ฝนตกหนัก อากาศแปรปรวน',
  },
  {
    key: 'price',
    label: 'แจ้งเตือนราคาข้าว',
    desc: 'ราคาขึ้น-ลงในตลาดที่ติดตาม',
  },
  {
    key: 'tasks',
    label: 'แจ้งเตือนภารกิจ/แปลงนา',
    desc: 'ถึงกำหนดใส่ปุ๋ย พ่นยา เก็บเกี่ยว',
  },
  { key: 'news', label: 'ข่าวสารทั่วไป', desc: 'ประกาศจากศูนย์ข้าวชุมชน' },
]

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && typeof saved === 'object') return saved
  } catch {
    // ค่าที่เก็บไว้เสีย ใช้ค่าเริ่มต้นแทน
  }
  return Object.fromEntries(OPTIONS.map((o) => [o.key, true]))
}

function NotificationSettingsPage() {
  const [settings, setSettings] = useState(loadSettings)

  function toggle(key) {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <VillageLayout title="ตั้งค่าการแจ้งเตือน" backTo="/village/menu">
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <ul>
          {OPTIONS.map(({ key, label, desc }) => (
            <li
              key={key}
              className="border-b border-[var(--border)] last:border-0"
            >
              <button
                type="button"
                onClick={() => toggle(key)}
                aria-pressed={settings[key]}
                className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-medium text-[var(--text)]">
                    {label}
                  </span>
                  <span className="block text-[12.5px] text-[var(--muted)]">
                    {desc}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                    settings[key]
                      ? 'bg-[var(--green-strong)]'
                      : 'bg-[var(--border)]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                      settings[key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </VillageLayout>
  )
}

export default NotificationSettingsPage
