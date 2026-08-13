// ข้อมูลตัวอย่าง (mock) สำหรับ role ชาวบ้าน — รอต่อ API จริงทีหลัง
// เจ้าของไฟล์: คนที่ทำ src/features/village/ (ไม่ชนกับ feature อื่น)

export const PROFILE = {
  name: 'สมชาย ใจดี',
  center: 'ศูนย์ข้าวชุมชนบ้านทุ่งกว้าง',
  location: 'อ.วารินชำราบ จ.อุบลราชธานี',
  avatar: 'https://i.pravatar.cc/64?img=13',
}

export const WEATHER_TODAY = {
  temp: 31,
  condition: 'แดดอ่อน',
  rain: 10,
  humidity: 68,
  windKph: 12,
}

export const TODAY_STATS = [
  { key: 'tasks', label: 'ภารกิจวันนี้', value: '3/5' },
  { key: 'points', label: 'แต้มสะสม', value: '2,450' },
  { key: 'income', label: 'รายได้ปีนี้', value: '86,450', unit: 'บาท' },
  { key: 'status', label: 'สถานะแปลง', value: 'ปกติ', tone: 'good' },
]

export const PLOTS = [
  {
    id: 1,
    name: 'นาแปลงใหญ่ 1',
    area: 21.5,
    variety: 'ข้าวหอมมะลิ 105',
    plantedDate: '5 เม.ย. 2567',
    harvestDate: '10 ก.ย. 2567',
    status: 'กำลังปลูก',
    progressPct: 62,
  },
  {
    id: 2,
    name: 'นาแปลงเล็ก 2',
    area: 8.2,
    variety: 'ข้าวเหนียว กข.6',
    plantedDate: '18 เม.ย. 2567',
    harvestDate: '22 ก.ย. 2567',
    status: 'กำลังปลูก',
    progressPct: 48,
  },
  {
    id: 3,
    name: 'นาแปลงริมคลอง',
    area: 12.0,
    variety: 'ข้าวปทุมธานี 1',
    plantedDate: '2 มี.ค. 2567',
    harvestDate: '5 ส.ค. 2567',
    status: 'เก็บเกี่ยวแล้ว',
    progressPct: 100,
  },
]

export const NEWS = [
  {
    id: 1,
    tag: 'เตือนภัย',
    tone: 'warning',
    title: 'ระวังเพลี้ยกระโดดสีน้ำตาลในระยะกล้า — แตกกอ',
    date: '23 พ.ค. 2567',
  },
  {
    id: 2,
    tag: 'ข่าวสาร',
    tone: 'good',
    title: 'เปิดจองปุ๋ยราคาสมาชิกรอบใหม่ที่ศูนย์ข้าวชุมชน',
    date: '21 พ.ค. 2567',
  },
  {
    id: 3,
    tag: 'คำแนะนำ',
    tone: 'good',
    title: 'ช่วงนี้ควรจัดการน้ำแบบเปียกสลับแห้ง (AWD) ลดต้นทุน',
    date: '19 พ.ค. 2567',
  },
]

export const AI_QUICK_QUESTIONS = [
  'ข้าวออกรวงไม่เต็ม เกิดจากอะไร?',
  'ปุ๋ยสูตรไหนดีในช่วงข้าวแตกกอ?',
  'ใบข้าวเป็นจุดสีน้ำตาล รักษายังไง?',
]

export const AI_WELCOME =
  'สวัสดีครับ ผมคือ AI ผู้ช่วยเกษตรกร ถ่ายรูปต้นข้าวหรือพิมพ์อาการที่พบมาได้เลย ผมจะช่วยวิเคราะห์ให้ครับ'

export const AI_SAMPLE_DIAGNOSIS = {
  disease: 'โรคไหม้ (เชื้อรา Pyricularia oryzae)',
  recommendations: [
    'ควรระบายน้ำออกจากแปลง',
    'พ่นสารป้องกันกำจัดเชื้อรา เช่น ไตรไซโคลซอล หรือ เบโนมิล',
    'ใส่ปุ๋ยโพแทสเซียมเสริม',
    'หมั่นสำรวจแปลงอย่างสม่ำเสมอ',
  ],
}

export const MARKET_PRICES = [
  { key: 'hommali', name: 'ข้าวหอมมะลิ 105', price: 15200, change: 150 },
  { key: 'kk15', name: 'ข้าว กข.15', price: 13800, change: 100 },
  { key: 'niaw6', name: 'ข้าวเหนียว กข.6', price: 12500, change: -50 },
]

export const CURRENT_SALE_LISTING = {
  variety: 'ข้าวหอมมะลิ 105',
  weightKg: 1200,
  pricePerTon: 15200,
  total: 18240,
}

export const INCOME_SUMMARY = {
  year: 2567,
  totalBaht: 86450,
  soldKg: 8450,
  remainingKg: 2150,
}
