import mockDrone from '../data/drone.json'
import { delay } from './delay'

// Mock implementation — swap for a real API call once a backend endpoint exists.
export async function fetchDroneData() {
  await delay()
  return mockDrone
}
