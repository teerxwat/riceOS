import { delay } from './delay'

let mockFarmerIdCounter = 1001

// Mockup only — does not call a real backend or store anything. Simulates
// network latency and returns a fake member id, same shape a real
// POST /api/farmers response would have, so swapping in the real call later
// (see backend/routes/farmers/add.js) won't require changing the caller.
export async function createFarmer() {
  await delay(600)
  const farmerId = mockFarmerIdCounter
  mockFarmerIdCounter += 1
  return { success: true, farmerId }
}
