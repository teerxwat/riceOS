// เจ้าของไฟล์: คนที่ 2 (feature province)
// แผนที่จริงด้วย Leaflet + OpenStreetMap (ฟรี) + โซนจังหวัด/รายอำเภอจาก OSM
// - ชั้นอำเภอ: ระบายสีตามคะแนนประสิทธิภาพ (choropleth) hover ดูข้อมูลได้
// - หมุดศูนย์ข้าว: circleMarker สีตามสถานะ คลิกเลือกได้
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { STATUS, DISTRICTS, fmt } from '../provinceData.js'
import boundary from '../chiangmai.geo.json'
import districts from '../chiangmai-districts.geo.json'

function districtTooltip(name) {
  const d = DISTRICTS.find((x) => x.name === name)
  if (!d) return `<b>อ.${name}</b><br/>ยังไม่มีศูนย์ข้าวในระบบ`
  return (
    `<b>อ.${name}</b><br/>` +
    `ข้าวอบวันนี้ ${fmt(d.rice, 1)} ตัน · AWD ${fmt(d.awd)} ไร่<br/>` +
    `คะแนนประสิทธิภาพ <b>${fmt(d.score, 1)}</b>` +
    (d.issues ? ` · ศูนย์มีปัญหา ${d.issues} แห่ง` : '')
  )
}

export default function ProvinceMap({
  centers,
  selectedId,
  onSelect,
  visibleStatuses,
  height = 420,
}) {
  const boxRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // สร้างแผนที่ครั้งเดียว
  useEffect(() => {
    const map = L.map(boxRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      zoomSnap: 0.5, // ให้ fitBounds เลือกซูมละเอียดขึ้น จังหวัดเต็มกรอบพอดี
    })
    mapRef.current = map

    // ภาพถ่ายดาวเทียม (Esri World Imagery — ใช้ฟรีพร้อม attribution)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
      }
    ).addTo(map)

    // ชั้นอำเภอ: เส้นแบ่งสีอ่อนบาง ๆ บนภาพดาวเทียม + hover ดูข้อมูล
    const districtLayer = L.geoJSON(districts, {
      style: {
        color: '#e8e4cf',
        weight: 1,
        opacity: 0.75,
        fillColor: '#ffffff',
        fillOpacity: 0.02,
      },
      onEachFeature: (f, layer) => {
        layer.bindTooltip(districtTooltip(f.properties.name), {
          direction: 'top',
          sticky: true,
        })
        layer.on('mouseover', () =>
          layer.setStyle({ weight: 2.5, opacity: 1, fillOpacity: 0.08 })
        )
        layer.on('mouseout', () =>
          layer.setStyle({ weight: 1, opacity: 0.75, fillOpacity: 0.02 })
        )
      },
    }).addTo(map)

    // ป้ายชื่ออำเภอกลางพื้นที่แต่ละอำเภอ
    districtLayer.eachLayer((layer) => {
      L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: 'pv-district-label',
          html: `อ.${layer.feature.properties.name}`,
          iconSize: [120, 16],
          iconAnchor: [60, 8],
        }),
        interactive: false,
        keyboard: false,
      }).addTo(map)
    })

    // ขอบเขตจังหวัด (เส้นหนา ไม่มีพื้น อยู่บนสุดของโซน)
    const zone = L.geoJSON(boundary, {
      style: { color: '#f5f1dc', weight: 2.5, opacity: 0.9, fill: false },
      interactive: false,
    }).addTo(map)

    // fit ขอบเขตจังหวัดใหม่ทุกครั้งที่ container เปลี่ยนขนาด (กัน mount ตอน
    // layout ยังไม่เสร็จแล้วได้ zoom ผิด) — หยุด refit เมื่อผู้ใช้เลื่อน/ซูมเอง
    const el = boxRef.current
    let userMoved = false
    let lastW = 0
    let lastH = 0
    const markMoved = () => {
      userMoved = true
    }
    el.addEventListener('pointerdown', markMoved)
    el.addEventListener('wheel', markMoved)

    const fit = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h || userMoved) return
      if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 4) return
      lastW = w
      lastH = h
      map.invalidateSize()
      map.fitBounds(zone.getBounds(), { padding: [8, 8] })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)

    return () => {
      el.removeEventListener('pointerdown', markMoved)
      el.removeEventListener('wheel', markMoved)
      ro.disconnect()
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [])

  // วาด/อัปเดตหมุดตามข้อมูล + ชั้นสถานะที่เปิดอยู่
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    centers.forEach((c) => {
      if (visibleStatuses && !visibleStatuses.includes(c.status)) return
      const active = c.id === selectedId
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: active ? 10 : 7,
        color: '#ffffff',
        weight: 2,
        fillColor: STATUS[c.status].color,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(
          `<b>${c.name}</b><br/>${c.id} · อ.${c.district} · ${STATUS[c.status].label}`,
          { direction: 'top', offset: [0, -8] }
        )
        .on('click', () => onSelectRef.current?.(active ? null : c.id))
      markersRef.current[c.id] = marker
    })
  }, [centers, selectedId, visibleStatuses])

  return (
    <div
      ref={boxRef}
      className="pv-leaflet"
      style={{ height }}
      role="application"
      aria-label="แผนที่ศูนย์ข้าวในจังหวัด"
    />
  )
}

export function MapLegend({ counts }) {
  return (
    <div className="pv-map-legend">
      {Object.entries(STATUS).map(([key, s]) => (
        <span key={key} className="pv-legend-item">
          <i className="pv-chip-dot" style={{ background: s.color }} />
          {s.label}
          {counts ? ` (${counts[key] ?? 0})` : ''}
        </span>
      ))}
    </div>
  )
}
