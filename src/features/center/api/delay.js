// Simulates network latency for mock endpoints so the loading states behave
// the same way they will once these are swapped for real `fetch` calls.
export function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
