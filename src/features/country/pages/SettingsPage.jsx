import DashboardLayout from '../components/DashboardLayout'
import { usePersistedState } from '../hooks/usePersistedState'

const NOTIFY_CHANNELS = [
  {
    key: 'line',
    label: 'LINE Notify',
    desc: 'แจ้งเตือนวิกฤต/เฝ้าระวังผ่าน LINE',
  },
  { key: 'email', label: 'Email', desc: 'สรุปรายวันส่งเข้าอีเมล' },
  { key: 'sms', label: 'SMS', desc: 'แจ้งเตือนเฉพาะระดับวิกฤต' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? 'bg-db-green' : 'bg-db-border'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SettingsPage() {
  const [channels, setChannels] = usePersistedState(
    'riceos_country_notify_channels',
    { line: true, email: true, sms: false }
  )

  return (
    <DashboardLayout
      title="ตั้งค่า"
      subtitle="ตั้งค่าบัญชีและช่องทางการแจ้งเตือน"
    >
      <div className="flex flex-col gap-5">
        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            ข้อมูลบัญชี
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src="https://i.pravatar.cc/64?img=12"
              alt=""
            />
            <div>
              <p className="text-heading-sm font-semibold text-db-text">
                สมชาย ใจดี
              </p>
              <p className="text-label text-db-text-muted">
                อธิบดีกรมการข้าว · role: country
              </p>
            </div>
          </div>
          <p className="mt-4 text-label text-db-text-dim">
            โหมดสว่าง/มืดสลับได้จากปุ่มมุมขวาบนของ Navbar (ใช้ร่วมกันทั้งแอป)
          </p>
        </section>

        <section className="rounded-db border border-db-border bg-db-surface p-5">
          <h2 className="font-display text-heading font-bold text-db-text">
            ช่องทางการแจ้งเตือน
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {NOTIFY_CHANNELS.map((c) => (
              <div key={c.key} className="flex items-center gap-3">
                <Toggle
                  checked={channels[c.key]}
                  onChange={(v) => setChannels((s) => ({ ...s, [c.key]: v }))}
                />
                <div>
                  <p className="text-body font-medium text-db-text">
                    {c.label}
                  </p>
                  <p className="text-label text-db-text-muted">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
