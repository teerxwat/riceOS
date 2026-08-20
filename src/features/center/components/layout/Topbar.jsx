import {
  BadgeCheck,
  Bell,
  ChevronDown,
  MapPin,
  MessageSquare,
} from 'lucide-react'
import { useAuth } from '../../../../auth/authContext.js'
import { getRole } from '../../../../features/roles/roles.js'
import { useClock } from '../../hooks/useClock'
import { formatThaiDate, formatTime } from '../../utils/thaiDate'

const CURRENT_LOCATION = {
  name: 'ศูนย์ข้าวชุมชนบ้านหนองหวัด',
  province: 'จ.เชียงใหม่',
}

export function Topbar({ title, subtitle, verified, extra }) {
  const now = useClock()
  const { user } = useAuth()
  const role = user ? getRole(user.role) : null
  const displayName = user?.name || 'ผู้จัดการศูนย์'

  return (
    <header className="c-topbar">
      <div className="c-topbar__title-group">
        <h1>
          {title}
          {verified && <BadgeCheck size={18} color="var(--c-brand-400)" />}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="c-topbar__actions">
        {extra}

        <div className="c-topbar__location">
          <MapPin size={14} color="var(--c-brand-400)" />
          <div>
            <p className="c-topbar__location-name">{CURRENT_LOCATION.name}</p>
            <p className="c-topbar__location-sub">
              {CURRENT_LOCATION.province}
            </p>
          </div>
          <ChevronDown size={14} />
        </div>

        <div className="c-topbar__datetime">
          <p>{formatThaiDate(now)}</p>
          <p className="mono">{formatTime(now)}</p>
        </div>

        <button type="button" aria-label="การแจ้งเตือน" className="c-icon-btn">
          <Bell size={16} />
          <span className="c-icon-btn__badge">12</span>
        </button>

        <button type="button" aria-label="ข้อความ" className="c-icon-btn">
          <MessageSquare size={16} />
          <span className="c-icon-btn__badge c-icon-btn__badge--brand">5</span>
        </button>

        <div className="c-topbar__user">
          <span className="c-topbar__avatar">{displayName.charAt(0)}</span>
          <div>
            <p className="c-topbar__user-name">{displayName}</p>
            <p className="c-topbar__user-role">
              {role?.name ?? 'ผู้จัดการศูนย์'}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
