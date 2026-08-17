import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  ScaleControl,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Eraser, PenLine, Undo2, Check } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { TextInput } from '../common/FormField.jsx'
import {
  polygonAreaSqm,
  polygonCentroid,
  sqmToRai,
  edgeMidpoints,
} from '../../utils/geo'

// Same real San Pa Tong paddy-field area used on the satellite map — keeps the mockup data consistent.
const DEFAULT_CENTER = { lat: 18.61794, lng: 98.92109 }

const TILE_LAYERS = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}

const DRAFT_POINT_ICON = L.divIcon({
  className: 'c-leaflet-icon cf-leaflet-icon--draft',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
})
const VERTEX_ICON = L.divIcon({
  className: 'c-leaflet-icon cf-leaflet-icon--vertex',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function edgeLabelIcon(text) {
  return L.divIcon({
    className: 'cf-edge-label',
    html: `<span>${text}</span>`,
    iconSize: null,
  })
}

function numOrEmpty(value) {
  if (value === '') return ''
  const n = Number(value)
  return Number.isNaN(n) ? '' : n
}

function DrawClickCatcher({ active, onPoint }) {
  useMapEvents({
    click(e) {
      if (active) onPoint(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function StepPlotLocation({ plots, plotLocations, onChange }) {
  const [activePlotId, setActivePlotId] = useState(plots[0]?.localId ?? '')
  const [isDrawing, setIsDrawing] = useState(false)
  const [draftPoints, setDraftPoints] = useState([])
  const [baseLayer, setBaseLayer] = useState('satellite')

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

  function switchPlot(plotLocalId) {
    setActivePlotId(plotLocalId)
    setIsDrawing(false)
    setDraftPoints([])
  }

  function applyBoundary(points) {
    const areaRai =
      points.length >= 3
        ? Number(sqmToRai(polygonAreaSqm(points)).toFixed(2))
        : active.areaRai
    const centroid = polygonCentroid(points)
    update({
      boundary: points,
      areaRai,
      ...(centroid
        ? {
            latitude: centroid[0].toFixed(6),
            longitude: centroid[1].toFixed(6),
          }
        : {}),
    })
  }

  function startDrawing() {
    setIsDrawing(true)
    setDraftPoints([])
  }

  function addDraftPoint(lat, lng) {
    setDraftPoints((pts) => [...pts, [lat, lng]])
  }

  function undoLastPoint() {
    setDraftPoints((pts) => pts.slice(0, -1))
  }

  function cancelDrawing() {
    setIsDrawing(false)
    setDraftPoints([])
  }

  function finishDrawing() {
    if (draftPoints.length < 3) return
    applyBoundary(draftPoints)
    setIsDrawing(false)
    setDraftPoints([])
  }

  function clearBoundary() {
    applyBoundary([])
  }

  function moveVertex(index, lat, lng) {
    const next = active.boundary.map((p, i) => (i === index ? [lat, lng] : p))
    applyBoundary(next)
  }

  if (!active) return null

  const boundary = active.boundary ?? []
  const hasBoundary = boundary.length >= 3
  const previewPoints = isDrawing ? draftPoints : boundary
  const areaSqm = previewPoints.length >= 3 ? polygonAreaSqm(previewPoints) : 0
  const areaRaiLive = sqmToRai(areaSqm)
  const mapCenter = hasBoundary
    ? polygonCentroid(boundary)
    : active.latitude && active.longitude
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
              onClick={() => switchPlot(p.localId)}
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
          <div className="cf-map-toolbar">
            <div className="cf-map-toolbar__group">
              <button
                type="button"
                onClick={() => setBaseLayer('satellite')}
                className={`cf-map-toolbar__btn ${baseLayer === 'satellite' ? 'is-active' : ''}`}
              >
                ดาวเทียม
              </button>
              <button
                type="button"
                onClick={() => setBaseLayer('street')}
                className={`cf-map-toolbar__btn ${baseLayer === 'street' ? 'is-active' : ''}`}
              >
                แผนที่
              </button>
            </div>

            <div className="cf-map-toolbar__group">
              {!isDrawing ? (
                <button
                  type="button"
                  onClick={startDrawing}
                  className="c-btn c-btn--outline cf-map-toolbar__action"
                >
                  <PenLine size={13} />{' '}
                  {hasBoundary ? 'วาดแนวเขตใหม่' : 'วาดแนวเขตแปลง'}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={undoLastPoint}
                    disabled={draftPoints.length === 0}
                    className="c-btn c-btn--outline cf-map-toolbar__action"
                  >
                    <Undo2 size={13} /> ย้อนจุด
                  </button>
                  <button
                    type="button"
                    onClick={finishDrawing}
                    disabled={draftPoints.length < 3}
                    className="c-btn c-btn--primary cf-map-toolbar__action"
                  >
                    <Check size={13} /> ปิดรูปร่าง
                  </button>
                  <button
                    type="button"
                    onClick={cancelDrawing}
                    className="c-btn c-btn--outline cf-map-toolbar__action"
                  >
                    ยกเลิก
                  </button>
                </>
              )}
              {hasBoundary && !isDrawing && (
                <button
                  type="button"
                  onClick={clearBoundary}
                  className="c-btn c-btn--outline cf-map-toolbar__action"
                >
                  <Eraser size={13} /> ลบแนวเขต
                </button>
              )}
            </div>
          </div>

          <p className="cf-map-caption">
            {isDrawing
              ? 'คลิกบนแผนที่เพื่อปักจุดแนวเขตแปลง แล้วกด "ปิดรูปร่าง" เมื่อครบ (อย่างน้อย 3 จุด)'
              : hasBoundary
                ? 'ลากจุดมุมเพื่อปรับแนวเขต หรือกด "วาดแนวเขตใหม่" เพื่อวาดใหม่ทั้งหมด'
                : 'กด "วาดแนวเขตแปลง" แล้วคลิกบนแผนที่เพื่อปักมุมแปลงนาด้วยตัวเอง'}
          </p>

          <div className="cf-map-wrap">
            <MapContainer
              key={active.plotLocalId}
              center={mapCenter}
              zoom={17}
              scrollWheelZoom
              className="c-leaflet"
            >
              <TileLayer
                attribution={TILE_LAYERS[baseLayer].attribution}
                url={TILE_LAYERS[baseLayer].url}
                maxZoom={19}
              />

              {isDrawing && (
                <>
                  <DrawClickCatcher
                    active={isDrawing}
                    onPoint={addDraftPoint}
                  />
                  {draftPoints.length >= 2 && (
                    <Polyline
                      positions={draftPoints}
                      pathOptions={{
                        color: '#6ad392',
                        weight: 2,
                        dashArray: '5 4',
                      }}
                    />
                  )}
                  {draftPoints.map((pt, i) => (
                    <Marker key={i} position={pt} icon={DRAFT_POINT_ICON} />
                  ))}
                </>
              )}

              {!isDrawing && hasBoundary && (
                <>
                  <Polygon
                    positions={boundary}
                    pathOptions={{
                      color: '#34b866',
                      weight: 2,
                      fillColor: '#1f9450',
                      fillOpacity: 0.28,
                    }}
                  />
                  {boundary.map((pt, i) => (
                    <Marker
                      key={i}
                      position={pt}
                      icon={VERTEX_ICON}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng()
                          moveVertex(i, lat, lng)
                        },
                      }}
                    />
                  ))}
                  {edgeMidpoints(boundary).map((edge, i) => (
                    <Marker
                      key={i}
                      position={edge.position}
                      icon={edgeLabelIcon(`${edge.distanceM.toFixed(1)} ม.`)}
                      interactive={false}
                    />
                  ))}
                </>
              )}

              <ScaleControl position="bottomleft" imperial={false} />
            </MapContainer>

            {previewPoints.length >= 3 && (
              <div className="cf-map-area-overlay">
                <p className="cf-map-area-overlay__label">เนื้อที่รวม</p>
                <p className="cf-map-area-overlay__value">
                  {areaRaiLive.toFixed(2)} ไร่
                </p>
                <p className="cf-map-area-overlay__sub">
                  ({Math.round(areaSqm).toLocaleString('th-TH')} ตร.ม.)
                </p>
              </div>
            )}
          </div>

          <p className="cf-map-area-note">
            แปลงที่ {activePlotIndex + 1} ·{' '}
            {hasBoundary
              ? `วาดแนวเขตแล้ว ${boundary.length} จุด`
              : 'ยังไม่ได้วาดแนวเขต'}
          </p>
        </div>
      </div>
    </Card>
  )
}
