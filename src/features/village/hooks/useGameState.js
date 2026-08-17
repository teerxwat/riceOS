import { useEffect, useState } from 'react'
import { STARTING_POINTS } from '../data/villageData'

const STORAGE_KEY = 'village_game_state'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && typeof saved === 'object') {
      // ข้ามวันแล้ว รีเซ็ตภารกิจประจำวัน (แต้มที่ได้แล้วยังอยู่) — เช็คตอน
      // โหลดค่าเริ่มต้นเลย ไม่ใช่ setState ใน effect (เลี่ยง cascading render)
      return saved.completedDate === todayStr()
        ? saved
        : { ...saved, completedToday: [], completedDate: todayStr() }
    }
  } catch {
    // ค่าที่เก็บไว้เสีย ใช้ค่าเริ่มต้นแทน
  }
  return {
    points: STARTING_POINTS,
    completedToday: [],
    completedDate: todayStr(),
  }
}

// เก็บแต้ม/ภารกิจที่ทำวันนี้ไว้ใน localStorage — HomePage ("แต้มสะสม") กับ
// GamePage อ่านค่าเดียวกันผ่าน hook นี้ ทำภารกิจในหน้าเกมแล้วแต้มที่หน้าแรก
// ต้องขยับตามจริง ไม่ใช่ตัวเลขคนละชุดกัน
export function useGameState() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function completeMission(id, points) {
    setState((s) =>
      s.completedToday.includes(id)
        ? s
        : {
            ...s,
            points: s.points + points,
            completedToday: [...s.completedToday, id],
          }
    )
  }

  return { state, completeMission }
}
