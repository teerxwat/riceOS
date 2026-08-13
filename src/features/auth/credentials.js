// บัญชีผู้ใช้แบบ fix ไว้ก่อน (mock — ยังไม่ต่อ backend)
// รหัสผ่านเดียวกันทุก role เพื่อความสะดวกในการทดสอบ: rice1234
export const CREDENTIALS = [
  {
    username: 'villager',
    password: 'rice1234',
    role: 'villager',
    displayName: 'สมหมาย นาดี',
    title: 'เกษตรกรบ้านหนองหว้า',
  },
  {
    username: 'center',
    password: 'rice1234',
    role: 'center',
    displayName: 'สมศรี รวงทอง',
    title: 'ผู้จัดการศูนย์ข้าวบ้านหนองหว้า',
  },
  {
    username: 'province',
    password: 'rice1234',
    role: 'province',
    displayName: 'สมชาย ใจดี',
    title: 'เกษตรจังหวัดเชียงใหม่',
  },
  {
    username: 'technician',
    password: 'rice1234',
    role: 'technician',
    displayName: 'สมพงษ์ ช่างดี',
    title: 'ช่างประจำจังหวัดเชียงใหม่',
    scope: 'province', // ช่างจังหวัด: เห็นเฉพาะจังหวัดตัวเอง
  },
  {
    username: 'techlead',
    password: 'rice1234',
    role: 'technician',
    displayName: 'ช่างใหญ่ สมชาย',
    title: 'หัวหน้าทีมช่าง (ทั้งประเทศ)',
    scope: 'national', // ช่างใหญ่: ดูแล+จัดการได้ทุกจังหวัด
  },
  {
    username: 'country',
    password: 'rice1234',
    role: 'country',
    displayName: 'สมคิด มั่นคง',
    title: 'บอร์ดกลางระดับประเทศ',
  },
]

// ตรวจสอบชื่อผู้ใช้/รหัสผ่าน -> คืนบัญชีที่ตรง หรือ null
export function verify(username, password) {
  const u = username.trim().toLowerCase()
  return (
    CREDENTIALS.find((c) => c.username === u && c.password === password) ?? null
  )
}
