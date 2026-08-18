import { Activity, AlertTriangle, CheckCircle2, Sun } from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { StatCard } from '../components/common/StatCard.jsx'
import { Card } from '../components/common/Card.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { MachineCard } from '../components/machines/MachineCard.jsx'
import { MachineAlerts } from '../components/machines/MachineAlerts.jsx'
import { useApiData } from '../hooks/useApiData'
import { fetchMachinesData } from '../api/machines'
import '../styles/machines.css'

export function MachinesPage() {
  const { data, loading, error } = useApiData(fetchMachinesData)

  return (
    <>
      <Topbar
        title="เครื่องจักรและพลังงาน"
        subtitle="ตรวจสอบกระแสไฟฟ้า แรงดัน และสถานะการทำงานของเครื่องอบ โซล่าเซลล์ และเครื่องปั่นฟาง"
      />
      <div className="c-content">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <div className="c-stack">
            <div className="c-grid c-grid-2 c-grid-md-4">
              <StatCard
                icon={CheckCircle2}
                label="เครื่องทำงานปกติ"
                value={data.summary.machinesNormal}
                unit={`/${data.summary.machinesTotal} เครื่อง`}
              />
              <StatCard
                icon={AlertTriangle}
                label="เครื่องผิดปกติ"
                value={data.summary.machinesAbnormal}
                unit="เครื่อง"
                deltaLabel="ควรตรวจสอบ"
                deltaTone="down"
              />
              <StatCard
                icon={Activity}
                label="กำลังไฟฟ้ารวม"
                value={data.summary.totalLoadKw}
                unit="kW"
                deltaLabel={`อัปเดต ${data.summary.updatedAt}`}
                deltaTone="neutral"
              />
              <StatCard
                icon={Sun}
                label="โซล่าเซลล์ผลิตได้"
                value={data.solar.currentGenKw}
                unit="kW"
                deltaLabel={`วันนี้ ${data.solar.todayEnergyKwh} kWh`}
                deltaTone="up"
              />
            </div>

            <Card title="เครื่องอบข้าว">
              <div className="c-grid c-grid-2 c-grid-md-4">
                {data.dryers.map((d, i) => (
                  <MachineCard
                    key={d.id}
                    kind="dryer"
                    variant={i}
                    name={d.name}
                    model={d.model}
                    status={d.status}
                    readings={[
                      { label: 'กระแสไฟฟ้า', value: d.currentA, unit: 'A' },
                      { label: 'แรงดันไฟฟ้า', value: d.voltageV, unit: 'V' },
                      { label: 'กำลังไฟฟ้า', value: d.powerKw, unit: 'kW' },
                    ]}
                    note={d.note}
                  />
                ))}
              </div>
            </Card>

            <div className="c-grid c-grid-1 c-grid-lg-2">
              <MachineCard
                kind="solar"
                name={data.solar.name}
                model={data.solar.model}
                status={data.solar.status}
                size="large"
                readings={[
                  {
                    label: 'กำลังผลิตปัจจุบัน',
                    value: data.solar.currentGenKw,
                    unit: 'kW',
                  },
                  {
                    label: 'แรงดันไฟฟ้า',
                    value: data.solar.voltageV,
                    unit: 'V',
                  },
                  {
                    label: 'กระแสไฟฟ้า',
                    value: data.solar.currentA,
                    unit: 'A',
                  },
                ]}
                extra={[
                  {
                    label: 'พลังงานสะสมวันนี้',
                    value: `${data.solar.todayEnergyKwh} kWh`,
                  },
                  {
                    label: 'แผงโซล่าปกติ',
                    value: `${data.solar.panelsTotal - data.solar.panelsFault}/${data.solar.panelsTotal} แผง`,
                  },
                ]}
                note={data.solar.note}
              />
              <MachineCard
                kind="shredder"
                name={data.strawShredder.name}
                model={data.strawShredder.model}
                status={data.strawShredder.status}
                size="large"
                readings={[
                  {
                    label: 'กระแสไฟฟ้า',
                    value: data.strawShredder.currentA,
                    unit: 'A',
                  },
                  {
                    label: 'แรงดันไฟฟ้า',
                    value: data.strawShredder.voltageV,
                    unit: 'V',
                  },
                  {
                    label: 'กำลังไฟฟ้า',
                    value: data.strawShredder.powerKw,
                    unit: 'kW',
                  },
                ]}
                extra={[
                  {
                    label: 'ปั่นฟางวันนี้',
                    value: `${data.strawShredder.strawKgToday.toLocaleString('th-TH')} กก.`,
                  },
                ]}
                note={data.strawShredder.note}
              />
            </div>

            <MachineAlerts alerts={data.alerts} />
          </div>
        )}
      </div>
    </>
  )
}
