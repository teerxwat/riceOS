// เจ้าของไฟล์: คนที่ 4 (feature technician)
// store ฝั่งช่าง: ใบงานซ่อม + อะไหล่ + เครื่องจักร แชร์ระหว่างหน้า
import { useSyncExternalStore } from 'react'
import {
  INITIAL_WORK_ORDERS,
  INITIAL_PARTS,
  MACHINES,
} from './technicianData.js'

let workOrders = INITIAL_WORK_ORDERS
let parts = INITIAL_PARTS
let machines = MACHINES
const subscribers = new Set()

function subscribe(callback) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}
const emit = () => subscribers.forEach((fn) => fn())

export function useWorkOrders() {
  return useSyncExternalStore(subscribe, () => workOrders)
}

export function updateWorkOrder(id, patch) {
  workOrders = workOrders.map((w) => (w.id === id ? { ...w, ...patch } : w))
  emit()
}

export function useParts() {
  return useSyncExternalStore(subscribe, () => parts)
}

// เบิก (-1) หรือเติมสต๊อก (+n)
export function adjustPart(id, delta) {
  parts = parts.map((p) =>
    p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
  )
  emit()
}

export function useMachines() {
  return useSyncExternalStore(subscribe, () => machines)
}

// เพิ่มอุปกรณ์ใหม่เข้าระบบ (mock — รหัสรันต่อจากรายการล่าสุด)
export function addMachine(data) {
  const nextNum = machines.length + 1
  const id = `M-${String(nextNum).padStart(3, '0')}`
  machines = [{ ...data, id, isNew: true }, ...machines]
  emit()
  return id
}
