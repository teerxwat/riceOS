import mockMachines from '../data/machines.json'
import { delay } from './delay'

// Mock implementation — swap for a real API call once a backend endpoint exists.
export async function fetchMachinesData() {
  await delay()
  return mockMachines
}
