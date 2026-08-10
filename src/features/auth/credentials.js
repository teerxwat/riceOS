// บัญชีผู้ใช้แบบ fix ไว้ก่อน (mock — ยังไม่ต่อ backend)
// รหัสผ่านเดียวกันทุก role เพื่อความสะดวกในการทดสอบ: rice1234
export const CREDENTIALS = [
  { username: 'villager', password: 'rice1234', role: 'villager' },
  { username: 'center', password: 'rice1234', role: 'center' },
  { username: 'province', password: 'rice1234', role: 'province' },
  { username: 'technician', password: 'rice1234', role: 'technician' },
  { username: 'country', password: 'rice1234', role: 'country' },
]

// ตรวจสอบชื่อผู้ใช้/รหัสผ่าน -> คืนบัญชีที่ตรง หรือ null
export function verify(username, password) {
  const u = username.trim().toLowerCase()
  return (
    CREDENTIALS.find((c) => c.username === u && c.password === password) ?? null
  )
}
