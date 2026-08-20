const EARTH_RADIUS_M = 6371000

export function haversineMeters([lat1, lng1], [lat2, lng2]) {
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(a))
}

// Flat-earth (equirectangular) projection centered on the polygon's own
// latitude — accurate enough for parcels a few hundred meters across.
function toLocalXY([lat, lng], refLat) {
  const toRad = (d) => (d * Math.PI) / 180
  const x = toRad(lng) * EARTH_RADIUS_M * Math.cos(toRad(refLat))
  const y = toRad(lat) * EARTH_RADIUS_M
  return [x, y]
}

export function polygonAreaSqm(points) {
  if (points.length < 3) return 0
  const refLat = points.reduce((sum, p) => sum + p[0], 0) / points.length
  const xy = points.map((p) => toLocalXY(p, refLat))
  let area = 0
  for (let i = 0; i < xy.length; i += 1) {
    const [x1, y1] = xy[i]
    const [x2, y2] = xy[(i + 1) % xy.length]
    area += x1 * y2 - x2 * y1
  }
  return Math.abs(area) / 2
}

export function sqmToRai(sqm) {
  return sqm / 1600
}

export function polygonCentroid(points) {
  if (points.length === 0) return null
  const lat = points.reduce((sum, p) => sum + p[0], 0) / points.length
  const lng = points.reduce((sum, p) => sum + p[1], 0) / points.length
  return [lat, lng]
}

export function edgeMidpoints(points) {
  return points.map((p, i) => {
    const next = points[(i + 1) % points.length]
    return {
      position: [(p[0] + next[0]) / 2, (p[1] + next[1]) / 2],
      distanceM: haversineMeters(p, next),
    }
  })
}
