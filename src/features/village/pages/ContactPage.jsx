import { Phone, MapPin, Clock } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { CONTACT_INFO } from '../data/villageData'

function ContactPage() {
  return (
    <VillageLayout title="ศูนย์ข้าวของฉัน" backTo="/village/menu">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[17px] font-bold text-[var(--text)]">
            {CONTACT_INFO.name}
          </p>
          <div className="mt-3 flex flex-col gap-2.5 text-[14px] text-[var(--text)]">
            <p className="flex items-start gap-2">
              <MapPin
                size={17}
                className="mt-0.5 shrink-0 text-[var(--muted)]"
              />
              {CONTACT_INFO.address}
            </p>
            <p className="flex items-start gap-2">
              <Clock
                size={17}
                className="mt-0.5 shrink-0 text-[var(--muted)]"
              />
              {CONTACT_INFO.hours}
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex min-h-11 items-center gap-2 text-[var(--green-strong)]"
            >
              <Phone size={17} className="shrink-0" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </section>

        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            เจ้าหน้าที่ประจำศูนย์
          </p>
          <ul className="flex flex-col gap-2">
            {CONTACT_INFO.staff.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-medium text-[var(--text)]">
                    {s.name}
                  </span>
                  <span className="block truncate text-[12.5px] text-[var(--muted)]">
                    {s.role}
                  </span>
                </span>
                <a
                  href={`tel:${s.phone}`}
                  aria-label={`โทรหา ${s.name}`}
                  className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--green-strong)] active:scale-95"
                >
                  <Phone size={18} strokeWidth={1.8} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </VillageLayout>
  )
}

export default ContactPage
