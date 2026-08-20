// เจ้าของไฟล์: คนที่ 4 (feature technician)
// แผนที่งานซ่อม 2 โหมด:
// - โหมดจังหวัด: โซนเชียงใหม่ + หมุดใบงาน สีตามระดับความเร่งด่วน
// - โหมดทั้งประเทศ (ช่างใหญ่): ขอบเขต 77 จังหวัด + ป้ายตัวเลขงานค้างรายจังหวัด
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import boundary from '../../province/chiangmai.geo.json'
import districts from '../../province/chiangmai-districts.geo.json'
import thailand from '../thailand-provinces.geo.json'
import {
  WO_PRIORITY,
  WO_STATUS,
  MACHINE_STATUS,
  NATIONAL_SUMMARY,
  STATIONS,
  machineOf,
  centerOf,
  fmt,
} from '../technicianData.js'

// สีจุดสถานีที่ปกติ (แค่บอกตำแหน่ง ไม่ต้องเด่น)
const STATION_OK_COLOR = '#4aa8e0'
// ซูมถึงระดับนี้ขึ้นไป = สลับจากป้ายเลขจังหวัดเป็นจุดรายสถานี
// (7.5 = ระดับที่ fitBounds จังหวัดใหญ่อย่างเชียงใหม่ไปถึงพอดี)
const DETAIL_ZOOM = 7.5

export default function TechMap({
  workOrders,
  selectedId,
  onSelect,
  visiblePriorities,
  height = 420,
  national = false, // ช่างใหญ่: แผนที่ทั้งประเทศ
  onSelectProvince,
}) {
  const boxRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const onSelectRef = useRef(onSelect)
  const onSelectProvinceRef = useRef(onSelectProvince)
  useEffect(() => {
    onSelectRef.current = onSelect
    onSelectProvinceRef.current = onSelectProvince
  }, [onSelect, onSelectProvince])

  // สร้างแผนที่ (สร้างใหม่เมื่อสลับโหมดจังหวัด/ทั้งประเทศ)
  useEffect(() => {
    const map = L.map(boxRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      zoomSnap: 0.5,
    })
    mapRef.current = map

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
      }
    ).addTo(map)

    let fitLayer
    if (national) {
      // ขอบเขตทุกจังหวัดทั่วประเทศ
      const summaryOf = (name) =>
        NATIONAL_SUMMARY.find((p) => p.province === name)
      const layerByProvince = {} // ชื่อจังหวัด -> layer (ไว้หา bounds ตอนซูมเข้า)
      // คลิกจังหวัด = เลือก + ซูมบินเข้าไปอัตโนมัติ (ชั้นรายสถานีจะสลับเอง)
      const zoomToProvince = (name) => {
        const layer = layerByProvince[name]
        if (!layer) return
        map.flyToBounds(layer.getBounds(), {
          padding: [20, 20],
          duration: 0.9,
        })
      }
      fitLayer = L.geoJSON(thailand, {
        style: (f) => ({
          color: '#e8e4cf',
          weight: 0.8,
          opacity: 0.55,
          fillColor: summaryOf(f.properties.name) ? '#3fae57' : '#ffffff',
          fillOpacity: summaryOf(f.properties.name) ? 0.18 : 0.02,
        }),
        onEachFeature: (f, layer) => {
          layerByProvince[f.properties.name] = layer
          const s = summaryOf(f.properties.name)
          layer.bindTooltip(
            s
              ? `<b>จ.${s.province}</b><br/>เครื่องจักร ${fmt(s.machines)} เครื่อง · งานค้าง ${s.backlog}<br/>วิกฤต ${s.critical} · ออนไลน์ ${s.online}%<br/>คลิกเพื่อซูมเข้าดูรายสถานี`
              : `<b>จ.${f.properties.name}</b><br/>ยังไม่อยู่ในโครงการ`,
            { direction: 'top', sticky: true }
          )
          layer.on('mouseover', () => layer.setStyle({ weight: 2, opacity: 1 }))
          layer.on('mouseout', () =>
            layer.setStyle({ weight: 0.8, opacity: 0.55 })
          )
          if (s) {
            layer.on('click', () => {
              onSelectProvinceRef.current?.(s.id)
              zoomToProvince(f.properties.name)
            })
          }
        },
      }).addTo(map)

      // ปุ่มซูมกลับมาดูทั้งประเทศ
      const ResetControl = L.Control.extend({
        onAdd() {
          const btn = L.DomUtil.create('button', 'tc-map-reset')
          btn.type = 'button'
          btn.innerHTML = 'ดูทั้งประเทศ'
          L.DomEvent.on(btn, 'click', (e) => {
            L.DomEvent.stop(e)
            map.flyToBounds(fitLayer.getBounds(), {
              padding: [8, 8],
              duration: 0.9,
            })
          })
          return btn
        },
      })
      new ResetControl({ position: 'topright' }).addTo(map)

      // ชั้นที่ 1 (ซูมไกล): ป้ายตัวเลขงานค้างรายจังหวัด (คลิกเพื่อเลือกจังหวัด)
      const badgeLayer = L.layerGroup()
      NATIONAL_SUMMARY.forEach((p) => {
        L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: '',
            html: `<div class="tc-map-badge${p.critical > 0 ? ' crit' : ''}">${p.backlog}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
          keyboard: false,
        })
          .bindTooltip(
            `<b>จ.${p.province}</b><br/>งานค้าง ${p.backlog} งาน · วิกฤต ${p.critical}<br/>คลิกเพื่อซูมเข้าดูรายสถานี`,
            { direction: 'top', offset: [0, -14] }
          )
          .on('click', () => {
            onSelectProvinceRef.current?.(p.id)
            zoomToProvince(p.province)
          })
          .addTo(badgeLayer)
      })

      // ชั้นที่ 2 (ซูมใกล้): จุดรายสถานี — สีตามสถานะเฉพาะจุดที่มีแนวโน้มปัญหา
      // สถานีปกติ = จุดฟ้าเล็ก บอกตำแหน่งเฉย ๆ (ข้อมูลตัวอย่างมีเฉพาะเชียงใหม่)
      const stationLayer = L.layerGroup()
      STATIONS.forEach((st) => {
        if (st.lat == null) return
        const isOk = st.worst === 'ok'
        const color = isOk ? STATION_OK_COLOR : MACHINE_STATUS[st.worst].color
        const problems = st.machines.filter((m) => m.status !== 'ok')
        L.circleMarker([st.lat, st.lng], {
          radius: isOk ? 4.5 : 8,
          color: '#ffffff',
          weight: isOk ? 1.5 : 2,
          fillColor: color,
          fillOpacity: isOk ? 0.9 : 1,
        })
          .bindTooltip(
            isOk
              ? `<b>${st.name}</b><br/>อ.${st.district} · จุดสถานี (ปกติ)`
              : `<b>${st.name}</b><br/>อ.${st.district} · <b>${MACHINE_STATUS[st.worst].label}</b><br/>` +
                  problems
                    .map((m) => `${m.name}: ${MACHINE_STATUS[m.status].label}`)
                    .join('<br/>'),
            { direction: 'top', offset: [0, -8] }
          )
          .addTo(stationLayer)
      })

      // สลับชั้นตามระดับซูม
      const syncLayers = () => {
        const detail = map.getZoom() >= DETAIL_ZOOM
        if (detail) {
          if (map.hasLayer(badgeLayer)) map.removeLayer(badgeLayer)
          if (!map.hasLayer(stationLayer)) stationLayer.addTo(map)
        } else {
          if (map.hasLayer(stationLayer)) map.removeLayer(stationLayer)
          if (!map.hasLayer(badgeLayer)) badgeLayer.addTo(map)
        }
      }
      badgeLayer.addTo(map)
      map.on('zoomend', syncLayers)
    } else {
      // โหมดจังหวัด: เส้นแบ่งอำเภอ + ขอบจังหวัด (ตัวอย่างเชียงใหม่)
      L.geoJSON(districts, {
        style: {
          color: '#e8e4cf',
          weight: 1,
          opacity: 0.6,
          fillColor: '#ffffff',
          fillOpacity: 0.02,
        },
      }).addTo(map)

      fitLayer = L.geoJSON(boundary, {
        style: { color: '#f5f1dc', weight: 2.5, opacity: 0.9, fill: false },
        interactive: false,
      }).addTo(map)
    }

    // fit เมื่อ container มีขนาดจริง — หยุด refit เมื่อผู้ใช้เลื่อน/ซูมเอง
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
      map.fitBounds(fitLayer.getBounds(), { padding: [8, 8] })
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
  }, [national])

  // หมุดใบงาน (เฉพาะโหมดจังหวัด และงานที่ยังไม่เสร็จ)
  useEffect(() => {
    const map = mapRef.current
    if (!map || national) return

    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    workOrders.forEach((wo) => {
      if (wo.status === 'done') return
      if (visiblePriorities && !visiblePriorities.includes(wo.priority)) return
      const c = centerOf(wo)
      if (!c) return
      const active = wo.id === selectedId
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: active ? 10 : 7,
        color: '#ffffff',
        weight: 2,
        fillColor: WO_PRIORITY[wo.priority].color,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(
          `<b>${wo.id}</b> · ${WO_PRIORITY[wo.priority].label}<br/>` +
            `${machineOf(wo)?.name ?? ''}<br/>${c.name} · ` +
            `${WO_STATUS[wo.status].label}`,
          { direction: 'top', offset: [0, -8] }
        )
        .on('click', () => onSelectRef.current?.(active ? null : wo.id))
      markersRef.current[wo.id] = marker
    })
  }, [workOrders, selectedId, visiblePriorities, national])

  return (
    <div
      ref={boxRef}
      className="pv-leaflet"
      style={{ height }}
      role="application"
      aria-label={
        national ? 'แผนที่งานซ่อมทั้งประเทศ' : 'แผนที่งานซ่อมในจังหวัด'
      }
    />
  )
}

// legend โหมดทั้งประเทศ: สถานะสถานีตอนซูมเข้า + จุดสถานีปกติสีฟ้า
export function NationalLegend() {
  const items = [
    ['down', MACHINE_STATUS.down.color, 'มีปัญหา'],
    ['repair', MACHINE_STATUS.repair.color, 'กำลังซ่อม'],
    ['watch', MACHINE_STATUS.watch.color, 'เฝ้าระวัง'],
    ['offline', MACHINE_STATUS.offline.color, 'ออฟไลน์'],
    ['ok', STATION_OK_COLOR, 'จุดสถานี (ปกติ)'],
  ]
  return (
    <div className="pv-map-legend">
      {items.map(([key, color, label]) => (
        <span key={key} className="pv-legend-item">
          <i className="pv-chip-dot" style={{ background: color }} />
          {label}
        </span>
      ))}
      <span className="pv-legend-item">
        ซูมออก = ยอดรวมรายจังหวัด · ซูมเข้า = รายสถานี
      </span>
    </div>
  )
}

export function TechMapLegend({ counts }) {
  return (
    <div className="pv-map-legend">
      {Object.entries(WO_PRIORITY).map(([key, p]) => (
        <span key={key} className="pv-legend-item">
          <i className="pv-chip-dot" style={{ background: p.color }} />
          {p.label}
          {counts ? ` (${counts[key] ?? 0})` : ''}
        </span>
      ))}
    </div>
  )
}
