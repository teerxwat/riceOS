import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Tooltip,
  ScaleControl,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Compass } from 'lucide-react'
import { Card } from '../common/Card.jsx'

function divIcon(modifier, size) {
  return L.divIcon({
    className: `c-leaflet-icon cdr-leaflet-icon--${modifier}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

const DRONE_ICON = divIcon('drone', 16)
const STATION_ICON = divIcon('station', 14)
const HOTSPOT_ICON = divIcon('hotspot', 18)

// Real OpenStreetMap tiles via Leaflet — free, no API key required.
export function MissionMapPanel({
  drones,
  stations,
  hotspots,
  fieldBoundary,
  mapCenter,
}) {
  const center = [mapCenter.lat, mapCenter.lng]
  const boundary = fieldBoundary.map((p) => [p[0], p[1]])

  return (
    <Card
      title="แผนที่ควบคุมโดรน (Live Map)"
      style={{ flex: 1, minWidth: 0 }}
      titleAction={
        <span
          className="c-card__header-action"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <Compass size={13} /> Lat {mapCenter.lat.toFixed(3)}, Lon{' '}
          {mapCenter.lng.toFixed(3)}
        </span>
      }
    >
      <div className="cdr-map-wrap">
        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoom
          className="c-leaflet"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polygon
            positions={boundary}
            pathOptions={{
              color: '#34b866',
              weight: 2,
              dashArray: '6 4',
              fillColor: '#1f9450',
              fillOpacity: 0.22,
            }}
          />

          {stations.map((s) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={STATION_ICON}>
              <Tooltip direction="top" offset={[0, -8]}>
                {s.code} · {s.name}
              </Tooltip>
            </Marker>
          ))}

          {drones.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lng]} icon={DRONE_ICON}>
              <Tooltip direction="top" offset={[0, -8]}>
                {d.code} · {d.model} (
                {d.status === 'flying' ? 'กำลังบิน' : 'รอขึ้นบิน'})
              </Tooltip>
            </Marker>
          ))}

          {hotspots.map((h) => (
            <Marker key={h.id} position={[h.lat, h.lng]} icon={HOTSPOT_ICON}>
              <Tooltip direction="top" offset={[0, -8]}>
                {h.label}
              </Tooltip>
            </Marker>
          ))}

          <ScaleControl position="bottomleft" imperial={false} />
        </MapContainer>

        <div className="cdr-map-legend">
          <span>
            <span className="cdr-map-legend__dot" /> โดรน/สถานี
          </span>
          <span>
            <span className="cdr-map-legend__ring" /> จุดแจ้งเตือน
          </span>
        </div>
      </div>
    </Card>
  )
}
