import mockMarketplace from '../data/marketplace.json'
import { delay } from './delay'

// Mock implementation — swap for a real API call once a backend endpoint exists.
export async function fetchMarketplaceData() {
  await delay()
  return mockMarketplace
}
