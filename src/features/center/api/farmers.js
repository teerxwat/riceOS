// This is the one write path in the center dashboard that is NOT mocked — it
// submits real multipart form data to the standalone Node/Express backend in
// /backend at the repo root (separate service, its own MySQL database), not
// through the shared services/apiClient.js (which targets a different,
// not-yet-built shared backend for the other features).
const API_BASE_URL =
  import.meta.env.VITE_CENTER_API_URL ?? 'http://localhost:4000'

export async function createFarmer(form) {
  const body = new FormData()
  body.append('member', JSON.stringify(form.member))
  body.append('plots', JSON.stringify(form.plots))
  body.append('plotLocations', JSON.stringify(form.plotLocations))
  body.append('cultivation', JSON.stringify(form.cultivation))

  form.files.forEach((entry) => {
    body.append('documents', entry.file, entry.file.name)
    body.append('documentCategories', entry.category)
  })

  const res = await fetch(`${API_BASE_URL}/api/farmers`, {
    method: 'POST',
    body,
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null)
    throw new Error(
      errorBody?.message ?? `บันทึกข้อมูลไม่สำเร็จ (HTTP ${res.status})`
    )
  }

  return res.json()
}
