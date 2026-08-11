import mockDashboard from '../data/dashboard.json'
import { delay } from './delay'

// Mock implementation — reads local JSON instead of the network.
// Swap the body for `api.get('/center/dashboard')` (see services/apiClient.js)
// once a real backend endpoint exists; call sites won't need to change.
export async function fetchDashboardData() {
  await delay()
  return mockDashboard
}
