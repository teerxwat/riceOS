import { AlertOctagon, Clock, HeartPulse, Wrench } from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { StatCard } from '../components/common/StatCard.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { CenterStatusBar } from '../components/dashboard/CenterStatusBar.jsx'
import { DryerStatusGrid } from '../components/dashboard/DryerStatusGrid.jsx'
import { ServiceQueuePanel } from '../components/dashboard/ServiceQueuePanel.jsx'
import { WaterSensorPanel } from '../components/dashboard/WaterSensorPanel.jsx'
import { WatchedMachinePanel } from '../components/dashboard/WatchedMachinePanel.jsx'
import { PerformanceSummary } from '../components/dashboard/PerformanceSummary.jsx'
import { BottomInfoRow } from '../components/dashboard/BottomInfoRow.jsx'
import { useApiData } from '../hooks/useApiData'
import { fetchDashboardData } from '../api/dashboard'
import '../styles/dashboard.css'

export function DashboardPage() {
  const { data, loading, error } = useApiData(fetchDashboardData)

  return (
    <>
      <Topbar
        title="หน้าหลัก"
        subtitle="ภาพรวมศูนย์ข้าวชุมชนและสถานะเครื่องจักรแบบเรียลไทม์"
        verified
      />
      <div className="c-content">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <div className="c-stack">
            <CenterStatusBar info={data.centerInfo} />

            <div className="cd-announcement">
              <AlertOctagon size={18} color="var(--c-red)" />
              <div>
                <p className="cd-announcement__title">
                  {data.urgentAnnouncement.title}
                </p>
                <p className="cd-announcement__msg">
                  {data.urgentAnnouncement.message}
                </p>
              </div>
            </div>

            <div className="c-grid c-grid-2 c-grid-md-4">
              <StatCard
                icon={HeartPulse}
                label="Asset Health Score"
                value={data.kpis.assetHealthScore}
                unit="/100"
              />
              <StatCard
                icon={Clock}
                label="Remaining Useful Life"
                value={data.kpis.remainingUsefulLifeDays}
                unit={`วัน (≈${data.kpis.remainingUsefulLifeHours.toLocaleString('th-TH')} ชม.)`}
              />
              <StatCard
                icon={AlertOctagon}
                label="เครื่องจักรเสี่ยงสูง"
                value={data.kpis.highRiskMachines}
                unit="เครื่อง"
                deltaLabel="ต้องตรวจสอบ"
                deltaTone="down"
              />
              <StatCard
                icon={Wrench}
                label="งานซ่อมเร่งด่วน"
                value={data.kpis.urgentRepairJobs}
                unit="งาน"
                deltaLabel={`ภายใน ${data.kpis.urgentRepairWithinHours} ชั่วโมง`}
                deltaTone="down"
              />
            </div>

            <DryerStatusGrid dryers={data.dryers} />

            <div className="c-grid c-grid-1 c-grid-lg-3">
              <div className="c-col-span-2">
                <ServiceQueuePanel
                  queue={data.serviceQueue}
                  currentlyServing={data.currentlyServing}
                />
              </div>
              <WaterSensorPanel water={data.water} />
            </div>

            <WatchedMachinePanel machine={data.watchedMachine} />

            <PerformanceSummary performance={data.performance} />

            <BottomInfoRow
              ricePrices={data.ricePrices}
              announcement={data.centralAnnouncement}
              contact={data.contact}
            />
          </div>
        )}
      </div>
    </>
  )
}
