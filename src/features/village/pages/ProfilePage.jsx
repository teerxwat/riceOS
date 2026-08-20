import { Phone, IdCard, Warehouse, MapPin, CalendarCheck } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PROFILE } from '../data/villageData'

const FIELDS = [
  { icon: Phone, label: 'เบอร์โทร', value: PROFILE.phone },
  { icon: IdCard, label: 'รหัสเกษตรกร', value: PROFILE.farmerId },
  { icon: Warehouse, label: 'ศูนย์ข้าว', value: PROFILE.center },
  { icon: MapPin, label: 'ที่อยู่', value: PROFILE.location },
  { icon: CalendarCheck, label: 'สมาชิก', value: PROFILE.memberSince },
]

function ProfilePage() {
  return (
    <VillageLayout title="โปรไฟล์ของฉัน" backTo="/village/menu">
      <div className="flex flex-col items-center pt-2 pb-5">
        <img
          src={PROFILE.avatar}
          alt=""
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-3 text-[19px] font-bold text-[var(--text)]">
          {PROFILE.name}
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <ul>
          {FIELDS.map(({ icon: Icon, label, value }) => (
            <li
              key={label}
              className="flex min-h-16 items-center gap-3 border-b border-[var(--border)] px-4 last:border-0"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)]">
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-[var(--muted)]">
                  {label}
                </span>
                <span className="block truncate text-[14.5px] font-medium text-[var(--text)]">
                  {value}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </VillageLayout>
  )
}

export default ProfilePage
