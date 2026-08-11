import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Card } from '../common/Card.jsx'
import { TextInput } from '../common/FormField.jsx'

// Same fictional center used on the drone map — keeps the mockup data consistent.
const DEFAULT_CENTER = { lat: 18.98543, lng: 98.93877 }

const PIN_ICON = L.divIcon({
  className: 'c-leaflet-icon cf-leaflet-icon--pin',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

function numOrEmpty(value) {
  if (value === '') return ''
  const n = Number(value)
  return Number.isNaN(n) ? '' : n
}

function LocationPicker({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
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

  function setPoint(lat, lng) {
    update({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) })
  }

  if (!active) return null

  const hasPoint = active.latitude !== '' && active.longitude !== ''
  const position = hasPoint
    ? [Number(active.latitude), Number(active.longitude)]
    : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]

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
            คลิกบนแผนที่ หรือลากหมุด เพื่อกำหนดตำแหน่งแปลง
          </p>
          <div className="cf-map-wrap">
            <MapContainer
              key={active.plotLocalId}
              center={position}
              zoom={16}
              scrollWheelZoom
              className="c-leaflet"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={position}
                icon={PIN_ICON}
                draggable
                eventHandlers={{
                  dragend: (e) => {
                    const { lat, lng } = e.target.getLatLng()
                    setPoint(lat, lng)
                  },
                }}
              />
              <LocationPicker onPick={setPoint} />
            </MapContainer>
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
