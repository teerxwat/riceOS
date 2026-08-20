import {
  CloudFog,
  Droplets,
  DropletOff,
  Satellite as SatelliteIcon,
} from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { StatCard } from '../components/common/StatCard.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { FieldStatusList } from '../components/satellite/FieldStatusList.jsx'
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

  const withWater =
    data?.fields.filter((f) => f.waterStatus !== 'dry').length ?? 0
  const dryCount =
    data?.fields.filter((f) => f.waterStatus === 'dry').length ?? 0
  const totalArea = data?.fields.reduce((sum, f) => sum + f.areaRai, 0) ?? 0
  const wateredArea =
    data?.fields
      .filter((f) => f.waterStatus !== 'dry')
      .reduce((sum, f) => sum + f.areaRai, 0) ?? 0
  const waterAreaPercent =
    totalArea > 0 ? Math.round((wateredArea / totalArea) * 100) : 0

  return (
    <>
      <Topbar
        title="ภาพถ่ายดาวเทียม"
        subtitle="ตรวจสอบพื้นที่มีน้ำ/ไม่มีน้ำในแปลงนาแต่ละแปลงจากภาพถ่ายดาวเทียม"
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
                icon={SatelliteIcon}
                label="แปลงที่ตรวจสอบ"
                value={data.fields.length}
                unit="แปลง"
              />
              <StatCard
                icon={Droplets}
                label="แปลงที่มีน้ำ"
                value={withWater}
                unit="แปลง"
                deltaLabel={`${waterAreaPercent}% ของพื้นที่รวม`}
                deltaTone="up"
              />
              <StatCard
                icon={DropletOff}
                label="แปลงที่ไม่มีน้ำ"
                value={dryCount}
                unit="แปลง"
                deltaLabel="ควรตรวจสอบชลประทาน"
                deltaTone="down"
              />
              <StatCard
                icon={CloudFog}
                label="ความละเอียดภาพ"
                value={data.captureInfo.resolutionM}
                unit="ม./พิกเซล"
                deltaLabel={`เมฆปกคลุม ${data.captureInfo.cloudCoverPercent}%`}
                deltaTone="neutral"
              />
            </div>

            <div className="cs-top-row">
              <FieldStatusList fields={data.fields} />
              <SatelliteMapPanel
                fields={data.fields}
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
