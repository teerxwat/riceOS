import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Tooltip,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Satellite } from 'lucide-react'
import { Card } from '../common/Card.jsx'

const STATUS_STYLE = {
  flooded: { color: '#0ea5e9', fillColor: '#38bdf8', fillOpacity: 0.45 },
  low: { color: '#f59e0b', fillColor: '#fbbf24', fillOpacity: 0.4 },
  dry: { color: '#ef4444', fillColor: '#f87171', fillOpacity: 0.35 },
}

const STATUS_LABEL = { flooded: 'มีน้ำ', low: 'น้ำน้อย', dry: 'ไม่มีน้ำ' }

const SENSOR_ICON = L.divIcon({
  className: 'c-leaflet-icon c-leaflet-icon--sensor',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

// Free real satellite imagery (Esri World Imagery, no API key) as the basemap
// — the mockup part is the per-field water-status overlay drawn on top of it.
export function SatelliteMapPanel({ fields, waterSensors, mapCenter }) {
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

          {fields.map((f) => (
            <Polygon
              key={f.id}
              positions={f.boundary}
              pathOptions={{ weight: 2, ...STATUS_STYLE[f.waterStatus] }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                {f.name} · {STATUS_LABEL[f.waterStatus]} (
                {f.waterCoveragePercent}%)
              </Tooltip>
            </Polygon>
          ))}

          {waterSensors.map((s) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={SENSOR_ICON}>
              <Tooltip direction="top" offset={[0, -6]}>
                {s.label} · ระดับน้ำ {s.levelM} ม.
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>

        <div className="cs-map-legend">
          <span className="cs-map-legend__item">
            <span className="cs-map-legend__swatch cs-map-legend__swatch--flooded" />{' '}
            มีน้ำ
          </span>
          <span className="cs-map-legend__item">
            <span className="cs-map-legend__swatch cs-map-legend__swatch--low" />{' '}
            น้ำน้อย
          </span>
          <span className="cs-map-legend__item">
            <span className="cs-map-legend__swatch cs-map-legend__swatch--dry" />{' '}
            ไม่มีน้ำ
          </span>
        </div>
      </div>
    </Card>
  )
}
