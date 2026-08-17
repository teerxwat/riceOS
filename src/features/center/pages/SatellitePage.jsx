import {
  CloudFog,
  Droplets,
  Ruler,
  Satellite as SatelliteIcon,
} from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { StatCard } from '../components/common/StatCard.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { SatelliteMapPanel } from '../components/satellite/SatelliteMapPanel.jsx'
import { AlertsPanel } from '../components/satellite/AlertsPanel.jsx'
import {
  AnalysisGrid,
  SummaryFooter,
} from '../components/satellite/AnalysisSection.jsx'
import { useApiData } from '../hooks/useApiData'
import { fetchSatelliteData } from '../api/satellite'
import '../styles/satellite.css'

export function SatellitePage() {
  const { data, loading, error } = useApiData(fetchSatelliteData)

  const avgLevelM = data?.waterSensors.length
    ? (
        data.waterSensors.reduce((sum, s) => sum + s.levelM, 0) /
        data.waterSensors.length
      ).toFixed(2)
    : 0

  return (
    <>
      <Topbar
        title="ภาพถ่ายดาวเทียม"
        subtitle="ภาพถ่ายดาวเทียมของพื้นที่ศูนย์ พร้อมข้อมูลเซ็นเซอร์วัดระดับน้ำ"
        extra={
          data && (
            <div className="cs-capture-badge">
              <span>
                <SatelliteIcon size={13} /> {data.captureInfo.satellite}
              </span>
              <span>
                <CloudFog size={13} /> เมฆ {data.captureInfo.cloudCoverPercent}%
              </span>
              <span>ถ่ายภาพล่าสุด {data.captureInfo.capturedAt}</span>
            </div>
          )
        }
      />
      <div className="c-content">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <div className="c-stack">
            <div className="c-grid c-grid-2 c-grid-md-4">
              <StatCard
                icon={Droplets}
                label="เซ็นเซอร์วัดระดับน้ำ"
                value={data.waterSensors.length}
                unit="จุด"
              />
              <StatCard
                icon={Droplets}
                label="ระดับน้ำเฉลี่ย"
                value={avgLevelM}
                unit="ม."
                deltaLabel="จากเซ็นเซอร์ทั้งหมด"
                deltaTone="neutral"
              />
              <StatCard
                icon={Ruler}
                label="ความละเอียดภาพ"
                value={data.captureInfo.resolutionM}
                unit="ม./พิกเซล"
              />
              <StatCard
                icon={CloudFog}
                label="เมฆปกคลุม"
                value={data.captureInfo.cloudCoverPercent}
                unit="%"
                deltaLabel={`รอบถัดไป ${data.summary.nextPassDate}`}
                deltaTone="neutral"
              />
            </div>

            <div className="cs-top-row">
              <SatelliteMapPanel
                waterSensors={data.waterSensors}
                mapCenter={data.mapCenter}
              />
              <div className="cs-side" style={{ width: '20rem' }}>
                <AlertsPanel alerts={data.alerts} />
              </div>
            </div>

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
