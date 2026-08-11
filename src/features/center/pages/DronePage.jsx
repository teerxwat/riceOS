import { CloudSun, Eye, Wind } from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { DroneListPanel } from '../components/drone/DroneListPanel.jsx'
import { MissionMapPanel } from '../components/drone/MissionMapPanel.jsx'
import { MissionsPanel } from '../components/drone/MissionsPanel.jsx'
import { AlertsPanel } from '../components/drone/AlertsPanel.jsx'
import {
  ActivityTypeButtons,
  AnalysisGrid,
  SummaryFooter,
} from '../components/drone/ActivityAnalysisSection.jsx'
import { useApiData } from '../hooks/useApiData'
import { fetchDroneData } from '../api/drone'
import '../styles/drone.css'

export function DronePage() {
  const { data, loading, error } = useApiData(fetchDroneData)

  return (
    <>
      <Topbar
        title="แผงควบคุมโดรน"
        subtitle="บริหารภารกิจโดรน วิเคราะห์ภาพ และติดตามพื้นที่เกษตรแบบเรียลไทม์"
        extra={
          data && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.6875rem',
                color: 'var(--c-text-muted)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <CloudSun size={13} /> {data.weather.condition}{' '}
                {data.weather.tempC}°C
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Wind size={13} /> {data.weather.windKmh} km/h
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Eye size={13} /> {data.weather.visibilityKm} กม.
              </span>
            </div>
          )
        }
      />
      <div className="c-content">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <div className="c-stack">
            <div className="cdr-top-row">
              <DroneListPanel drones={data.drones} stations={data.stations} />
              <MissionMapPanel />
              <div className="cdr-side" style={{ width: '20rem' }}>
                <MissionsPanel missions={data.missions} />
                <AlertsPanel alerts={data.alerts} />
              </div>
            </div>

            <ActivityTypeButtons types={data.activityTypes} />
            <AnalysisGrid
              layers={data.analysisLayers}
              compareDates={data.compareDates}
            />
            <SummaryFooter summary={data.summary} />
          </div>
        )}
      </div>
    </>
  )
}
