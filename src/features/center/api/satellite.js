import mockSatellite from '../data/satellite.json'
import { delay } from './delay'

// Mock implementation — swap for a real API call once a backend endpoint exists.
export async function fetchSatelliteData() {
  await delay()
  return mockSatellite
}
