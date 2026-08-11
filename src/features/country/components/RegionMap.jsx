import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import thProvinces from '../data/thProvinces.geojson.json'
import { formatNumber } from '../utils/format'

// แผนที่ประเทศไทยจริงผ่าน Leaflet — วาดเป็นรูปหลายเหลี่ยมขอบเขตจังหวัดจริง
// (ลดความละเอียดเส้นขอบเขตจาก ~28,000 จุดเหลือ ~6,000 จุด ให้ไฟล์เบาพอโหลดได้)
// จังหวัดถูกจัดกลุ่มเป็น 6 ภาคด้วยเกณฑ์ราชบัณฑิตยสถาน (properties.region ในไฟล์ geojson)
// ระบายสีตามสถานะของภาคนั้น คลิกจังหวัดไหนก็ได้ในภาคเพื่อเลือกทั้งภาค
//
// การคลิกบนแผนที่ใช้ mouse ล้วน (ข้อจำกัดของ Leaflet layer ที่ไม่ใช่ DOM element
// ปกติ) เลยมีแถบปุ่มเลือกภาคแบบข้อความคู่ขนานไว้ให้ผู้ใช้ keyboard ด้วย

const STATUS_COLOR = {
  ok: 'var(--color-db-green)',
  watch: 'var(--color-db-amber)',
  risk: 'var(--color-db-red)',
}
const STATUS_LABEL = { ok: 'ปกติ', watch: 'เฝ้าระวัง', risk: 'วิกฤต' }

// กรอบพิกัดประเทศไทยจริง (คำนวณจากไฟล์ geojson) ใช้ fit มุมมองเริ่มต้น
const THAILAND_BOUNDS = [
  [5.6, 97.3],
  [20.6, 105.7],
]
const PAN_LIMIT_BOUNDS = [
  [2, 93],
  [24, 110],
]

function RegionMap({ regions, selectedId, onSelect }) {
  const geoLayerRef = useRef(null)
  const statusByRegion = useMemo(
    () => Object.fromEntries(regions.map((r) => [r.id, r.status])),
    [regions]
  )

  function styleProvince(feature) {
    const regionId = feature.properties.region
    const status = statusByRegion[regionId] ?? 'ok'
    const isSelected = selectedId === regionId
    const dimmed = selectedId && !isSelected

    return {
      color: STATUS_COLOR[status],
      weight: isSelected ? 2 : 1,
      fillColor: STATUS_COLOR[status],
      fillOpacity: dimmed ? 0.12 : isSelected ? 0.75 : 0.45,
      opacity: dimmed ? 0.35 : 1,
    }
  }

  // อัปเดตสีของทุกจังหวัดผ่าน ref แทนการ remount ทั้ง layer (ก่อนหน้านี้ใช้
  // key={selectedId} บังคับ parse geojson ~6,000 จุดใหม่ทุกคลิก — หนักเกินจำเป็น
  useEffect(() => {
    geoLayerRef.current?.eachLayer((layer) => {
      layer.setStyle(styleProvince(layer.feature))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, statusByRegion])

  function onEachProvince(feature, layer) {
    layer.bindTooltip(feature.properties.name, { sticky: true })
    layer.on('click', () => onSelect(feature.properties.region))
  }

  return (
    <div>
      <div
        role="group"
        aria-label="เลือกภาค"
        className="mb-3 flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={!selectedId}
          className={`min-h-11 cursor-pointer rounded-full border px-3 text-label font-medium ${
            !selectedId
              ? 'border-db-green bg-db-green-bg text-db-green'
              : 'border-db-border bg-db-surface text-db-text-muted hover:text-db-text'
          }`}
        >
          ทั้งประเทศ
        </button>
        {regions.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            aria-pressed={selectedId === r.id}
            className={`min-h-11 cursor-pointer rounded-full border px-3 text-label font-medium ${
              selectedId === r.id
                ? 'border-db-green bg-db-green-bg text-db-green'
                : 'border-db-border bg-db-surface text-db-text-muted hover:text-db-text'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-db border border-db-border">
        {selectedId && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="absolute top-2.5 left-1/2 z-[1000] flex min-h-11 -translate-x-1/2 cursor-pointer items-center rounded-full border border-db-border bg-db-surface px-3 text-label font-medium text-db-text shadow-db"
          >
            ← ดูทั้งประเทศ
          </button>
        )}

        <MapContainer
          bounds={THAILAND_BOUNDS}
          boundsOptions={{ padding: [16, 16] }}
          maxBounds={PAN_LIMIT_BOUNDS}
          minZoom={5}
          scrollWheelZoom={false}
          className="h-[420px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            ref={geoLayerRef}
            data={thProvinces}
            style={styleProvince}
            onEachFeature={onEachProvince}
          />
        </MapContainer>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(STATUS_LABEL).map(([key, label]) => (
          <span
            key={key}
            className="flex items-center gap-1.5 text-caption text-db-text-muted"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: STATUS_COLOR[key] }}
            />
            {label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-caption text-db-text-dim">
        ขอบเขตจังหวัดจริง จัดกลุ่มเป็น 6 ภาค —
        คลิกจังหวัดหรือกดปุ่มด้านบนเพื่อเลือกทั้งภาค ·{' '}
        {formatNumber(regions.reduce((sum, r) => sum + r.centers, 0))}{' '}
        ศูนย์ทั่วประเทศ
      </p>
    </div>
  )
}

export default RegionMap
