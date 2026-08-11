import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { TextInput } from '../common/FormField.jsx'

function numOrEmpty(value) {
  if (value === '') return ''
  const n = Number(value)
  return Number.isNaN(n) ? '' : n
}

export function StepPlotLocation({ plots, plotLocations, onChange }) {
  const [activePlotId, setActivePlotId] = useState(plots[0]?.localId ?? '')
  const active =
    plotLocations.find((p) => p.plotLocalId === activePlotId) ??
    plotLocations[0]
  const activePlotIndex = plots.findIndex(
    (p) => p.localId === (active?.plotLocalId ?? activePlotId)
  )

  function update(patch) {
    if (!active) return
    onChange(
      plotLocations.map((p) =>
        p.plotLocalId === active.plotLocalId ? { ...p, ...patch } : p
      )
    )
  }

  if (!active) return null

  return (
    <Card title="3. กำหนดตำแหน่งแปลงนา">
      {plots.length > 1 && (
        <div className="cf-plot-tabs">
          {plots.map((p, i) => (
            <button
              key={p.localId}
              type="button"
              onClick={() => setActivePlotId(p.localId)}
              className={`cf-plot-tab ${p.localId === active.plotLocalId ? 'is-active' : ''}`}
            >
              แปลงที่ {i + 1} {p.location ? `(${p.location})` : ''}
            </button>
          ))}
        </div>
      )}

      <div className="cf-location-grid">
        <div className="cf-location-fields">
          <TextInput
            label="เลขโฉนด/นส.4 จ."
            value={active.deedNo}
            onChange={(e) => update({ deedNo: e.target.value })}
          />
          <TextInput
            label="หน้าสำรวจ"
            value={active.surveyNo}
            onChange={(e) => update({ surveyNo: e.target.value })}
          />
          <TextInput
            label="เลขที่ดิน"
            value={active.landNo}
            onChange={(e) => update({ landNo: e.target.value })}
          />
          <TextInput
            label="เนื้อที่ (ไร่)"
            type="number"
            value={active.areaRai}
            onChange={(e) => update({ areaRai: numOrEmpty(e.target.value) })}
          />
          <TextInput
            label="ตำบล"
            value={active.subDistrict}
            onChange={(e) => update({ subDistrict: e.target.value })}
          />
          <TextInput
            label="อำเภอ"
            value={active.district}
            onChange={(e) => update({ district: e.target.value })}
          />
          <TextInput
            label="จังหวัด"
            value={active.province}
            onChange={(e) => update({ province: e.target.value })}
            className="cf-span-2"
          />
          <TextInput
            label="ละติจูด"
            value={active.latitude}
            onChange={(e) => update({ latitude: e.target.value })}
            placeholder="18.985432"
          />
          <TextInput
            label="ลองจิจูด"
            value={active.longitude}
            onChange={(e) => update({ longitude: e.target.value })}
            placeholder="98.938765"
          />
        </div>

        <div>
          <p className="cf-map-caption">
            ภาพประกอบตำแหน่งแปลง (ตัวอย่าง — ไม่ใช่แผนที่ใช้งานจริง)
          </p>
          <div className="cf-map-preview">
            <svg viewBox="0 0 300 200">
              <defs>
                <pattern
                  id="plotGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="20" height="20" fill="#12241a" />
                  <path
                    d="M20 0 L0 0 0 20"
                    fill="none"
                    stroke="#1c3327"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="300" height="200" fill="url(#plotGrid)" />
              <polygon
                points="90,50 210,40 230,120 130,150 80,110"
                fill="#1f9450"
                fillOpacity="0.2"
                stroke="#34b866"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
            </svg>
            <MapPin size={22} className="cf-map-preview__pin" />
          </div>
          <p className="cf-map-area-note">
            แปลงที่ {activePlotIndex + 1} · พื้นที่โดยประมาณ{' '}
            {active.areaRai || '-'} ไร่
          </p>
        </div>
      </div>
    </Card>
  )
}
