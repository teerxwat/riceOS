// เจ้าของไฟล์: คนที่ 2 (feature province)
// store แจ้งเตือนแบบแชร์ข้ามคอมโพเนนต์ (Navbar + หน้าแจ้งเตือน ใช้ตัวเลขเดียวกัน)
import { useSyncExternalStore } from 'react'
import { INITIAL_ALERTS } from './provinceData.js'

let alerts = INITIAL_ALERTS
const subscribers = new Set()

function subscribe(callback) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

export function useAlerts() {
  return useSyncExternalStore(subscribe, () => alerts)
}

export function setAlerts(updater) {
  alerts = typeof updater === 'function' ? updater(alerts) : updater
  subscribers.forEach((fn) => fn())
}
