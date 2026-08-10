// ชั้นกลางเรียก API ใช้ร่วมกันทั้งทีม (base url เดียว, header เดียว)
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.status === 204 ? null : res.json()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
}
