// เจ้าของไฟล์: คนที่ 2 (feature province)
// store จังหวัดที่เลือก แชร์ระหว่าง Navbar (ตัวเลือกจังหวัด) กับหน้าแดชบอร์ด
import { useSyncExternalStore } from 'react'

let provinceId = 'cnx'
const subscribers = new Set()

function subscribe(callback) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

export function useProvinceId() {
  return useSyncExternalStore(subscribe, () => provinceId)
}

export function setProvinceId(id) {
  provinceId = id
  subscribers.forEach((fn) => fn())
}
