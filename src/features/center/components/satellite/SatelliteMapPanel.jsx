import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Satellite } from 'lucide-react'
import { Card } from '../common/Card.jsx'

const SENSOR_ICON = L.divIcon({
  className: 'c-leaflet-icon c-leaflet-icon--sensor',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

// Free real satellite imagery (Esri World Imagery, no API key) as the basemap.
export function SatelliteMapPanel({ waterSensors, mapCenter }) {
  const center = [mapCenter.lat, mapCenter.lng]

  return (
    <Card
      title="ภาพถ่ายดาวเทียม (Live Map)"
      style={{ flex: 1, minWidth: 0 }}
      titleAction={
        <span
          className="c-card__header-action"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <Satellite size={13} /> Lat {mapCenter.lat.toFixed(3)}, Lon{' '}
          {mapCenter.lng.toFixed(3)}
        </span>
      }
    >
      <div className="cs-map-wrap">
        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom
          className="c-leaflet"
        >
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />

          {waterSensors.map((s) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={SENSOR_ICON}>
              <Tooltip direction="top" offset={[0, -6]}>
                {s.label} · ระดับน้ำ {s.levelM} ม.
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  )
}
