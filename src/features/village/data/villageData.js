// ข้อมูลตัวอย่าง (mock) สำหรับ role ชาวบ้าน — รอต่อ API จริงทีหลัง
// เจ้าของไฟล์: คนที่ทำ src/features/village/ (ไม่ชนกับ feature อื่น)

export const PROFILE = {
  name: 'สมชาย ใจดี',
  phone: '089-123-4567',
  farmerId: 'FM-6704-1189',
  center: 'ศูนย์ข้าวชุมชนบ้านทุ่งกว้าง',
  location: 'อ.วารินชำราบ จ.อุบลราชธานี',
  memberSince: 'สมาชิกตั้งแต่ปี 2564',
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

// จำนวนแต้มเริ่มต้น = ตัวเลขเดียวกับ TODAY_STATS "แต้มสะสม" ด้านบน (ให้ตรงกัน
// ตอนเริ่มต้น) หลังจากนั้นแต้มจริงจะเก็บแยกใน useGameState (localStorage)
// และ HomePage จะอ่านจากตรงนั้นแทนค่าคงที่นี้ เพื่อให้ทำภารกิจแล้วแต้มขยับจริง
export const STARTING_POINTS = 2450

// เกณฑ์เลเวล — ล้อกับสถานะการเติบโตของ "นาข้าวเสมือน" 1 เลเวล = 1 สเตจ
export const LEVELS = [
  { level: 1, minPoints: 0, rank: 'มือใหม่หัดทำนา', stage: 'หว่านเมล็ด' },
  { level: 2, minPoints: 800, rank: 'ชาวนามือสมัครเล่น', stage: 'ต้นกล้า' },
  { level: 3, minPoints: 2000, rank: 'ชาวนามือโปร', stage: 'แตกกอ' },
  { level: 4, minPoints: 3800, rank: 'ปราชญ์ชาวนา', stage: 'ออกรวง' },
  { level: 5, minPoints: 6000, rank: 'เซียนข้าว', stage: 'พร้อมเก็บเกี่ยว' },
]

// ภารกิจประจำวัน — แตะเพื่อ "ยืนยันว่าทำแล้ว" (ไม่มี backend เช็คจริง เป็นการ
// สาธิต) ยกเว้นภารกิจ 'quiz' ที่มี UI ควิซจริงให้ตอบในหน้าเกม รีเซ็ตทุกวัน
export const DAILY_MISSIONS = [
  { id: 'awd', title: 'บันทึกระดับน้ำในแปลง (AWD)', points: 20 },
  { id: 'photo', title: 'ถ่ายรูปแปลงนาวันนี้', points: 30 },
  { id: 'weather', title: 'ตรวจพยากรณ์อากาศก่อนออกแปลง', points: 10 },
  { id: 'quiz', title: 'ตอบคำถามความรู้ประจำวัน', points: 25 },
]

// คำถามควิซ — เลือก "ของวันนี้" แบบหมุนตามวันที่ (deterministic) ใน GamePage
export const QUIZ_QUESTIONS = [
  {
    q: 'การทำนาแบบเปียกสลับแห้ง (AWD) ช่วยเรื่องใดเป็นหลัก?',
    choices: ['ลดปริมาณน้ำที่ใช้', 'เพิ่มความหวานของข้าว', 'ป้องกันนกกินข้าว'],
    answer: 0,
  },
  {
    q: 'โรคไหม้ในข้าวเกิดจากเชื้อชนิดใด?',
    choices: ['แบคทีเรีย', 'เชื้อรา', 'ไวรัส'],
    answer: 1,
  },
  {
    q: 'ช่วงข้าวแตกกอ ควรเน้นใส่ปุ๋ยสูตรใด?',
    choices: [
      'สูตรเร่งราก (สูงฟอสฟอรัส)',
      'สูตรเร่งใบ/แตกกอ (สูงไนโตรเจน)',
      'สูตรเร่งดอก (สูงโพแทสเซียม)',
    ],
    answer: 1,
  },
  {
    q: 'เพลี้ยกระโดดสีน้ำตาลระบาดหนักช่วงไหน?',
    choices: ['ระยะกล้า-แตกกอ', 'ระยะออกรวง', 'หลังเก็บเกี่ยว'],
    answer: 0,
  },
  {
    q: 'การระบายน้ำออกจากแปลงช่วยเรื่องใดเมื่อพบโรคไหม้?',
    choices: [
      'ลดความชื้นที่เชื้อราชอบ',
      'เร่งให้ข้าวสุกเร็วขึ้น',
      'เพิ่มออกซิเจนให้ราก',
    ],
    answer: 0,
  },
]

// อันดับในศูนย์ข้าวเดียวกัน — คนปัจจุบัน (isMe) ใส่แต้มจริงจาก useGameState
// ตอน render ในหน้าเกม ไม่ใช่ตัวเลขคงที่ตรงนี้
export const LEADERBOARD = [
  { id: 'p1', name: 'คุณสมหญิง รักนา', points: 5200 },
  { id: 'p2', name: 'คุณประเสริฐ ขยันทำ', points: 4100 },
  { id: 'me', name: PROFILE.name, isMe: true },
  { id: 'p3', name: 'คุณวิภา แสนดี', points: 1800 },
  { id: 'p4', name: 'คุณอนันต์ พูนผล', points: 1200 },
]

// carbonEnrolled/awdStatus/waterLevelCm/carbonTco2e/mrv เป็นข้อมูลของฟีเจอร์
// "นาคาร์บอน" (AWD + คาร์บอนเครดิต) — ตั้งใจให้แปลง 3 (ยังไม่สมัครโครงการ)
// เพื่อให้มีตัวอย่างการกด "สมัครเป็นสมาชิกโครงการคาร์บอน" ได้จริงในหน้าสาธิต
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
    carbonEnrolled: true,
    awdStatus: 'เหมาะสม',
    waterLevelCm: -15,
    carbonTco2e: 1.85,
    daysGrown: 35,
    mapPos: { x: 30, y: 35 },
    tasksDoneIds: ['fertilize'],
    mrv: {
      gps: true,
      timestamp: true,
      photo: true,
      sensorData: true,
      farmerLog: false,
    },
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
    carbonEnrolled: true,
    awdStatus: 'เปิดน้ำ',
    waterLevelCm: 3,
    carbonTco2e: 0.62,
    daysGrown: 22,
    mapPos: { x: 65, y: 25 },
    tasksDoneIds: [],
    mrv: {
      gps: true,
      timestamp: true,
      photo: false,
      sensorData: false,
      farmerLog: true,
    },
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
    carbonEnrolled: false,
    awdStatus: null,
    waterLevelCm: null,
    carbonTco2e: 0,
    daysGrown: 120,
    mapPos: { x: 50, y: 68 },
    tasksDoneIds: [],
    mrv: {
      gps: false,
      timestamp: false,
      photo: false,
      sensorData: false,
      farmerLog: false,
    },
  },
]

// ประวัติบันทึกน้ำ (ล่าสุดอยู่ก่อน) ต่อแปลง — ใช้วาดกราฟแท่งอย่างง่ายและสรุป
// รอบ AWD ใน WaterLogPage คีย์ตาม plot id
export const WATER_LOG_HISTORY = {
  1: [
    { date: '19 พ.ค.', levelCm: -15, type: 'ปิดน้ำ' },
    { date: '17 พ.ค.', levelCm: -8, type: 'ปิดน้ำ' },
    { date: '15 พ.ค.', levelCm: 2, type: 'เปิดน้ำ' },
    { date: '13 พ.ค.', levelCm: -12, type: 'ปิดน้ำ' },
    { date: '11 พ.ค.', levelCm: -18, type: 'ปิดน้ำ' },
  ],
  2: [
    { date: '19 พ.ค.', levelCm: 3, type: 'เปิดน้ำ' },
    { date: '16 พ.ค.', levelCm: -10, type: 'ปิดน้ำ' },
    { date: '13 พ.ค.', levelCm: 5, type: 'เปิดน้ำ' },
  ],
  3: [],
}

// ระยะการเจริญเติบโตของข้าว (AI Crop Calendar) — เทียบ daysGrown ของแปลงกับ
// ช่วงวันด้านล่างเพื่อหาว่าตอนนี้อยู่ระยะไหน
export const CROP_STAGES = [
  { key: 'seedling', label: 'ระยะกล้า', minDay: 0, maxDay: 20 },
  { key: 'tillering', label: 'แตกกอ', minDay: 20, maxDay: 40 },
  { key: 'booting', label: 'ตั้งท้อง', minDay: 40, maxDay: 70 },
  { key: 'heading', label: 'ออกรวง', minDay: 70, maxDay: 100 },
  { key: 'harvest', label: 'เก็บเกี่ยว', minDay: 100, maxDay: 120 },
]

// งานแนะนำล่วงหน้า (เทมเพลตเดียวใช้ร่วมกันทุกแปลงที่เข้าร่วมโครงการ) —
// dueInDays คือ "อีกกี่วัน" นับจากวันนี้ ให้ negative/0 = ถึงกำหนดแล้ว
export const TASK_SCHEDULE = [
  { id: 'fertilize', label: 'ใส่ปุ๋ย', dueInDays: 0 },
  { id: 'awd-drain', label: 'AWD Drain (ระบายน้ำตามรอบ)', dueInDays: 3 },
  { id: 'disease-check', label: 'ตรวจโรค', dueInDays: 10 },
  { id: 'soil-sample', label: 'เก็บตัวอย่างดิน', dueInDays: 15 },
]

export const FERTILIZER_TYPES = [
  { formula: '16-20-0', name: 'สูตรเร่งราก' },
  { formula: '46-0-0', name: 'ยูเรีย' },
  { formula: '16-8-8', name: 'สูตรเร่งกอ/ใบ' },
  { formula: '13-13-21', name: 'สูตรเร่งรวง/เมล็ด' },
]

// N2O ต่อ กก. ปุ๋ยไนโตรเจน — ตัวเลขสาธิต (ไม่ใช่ค่ามาตรฐาน IPCC จริง) ใช้แค่
// โชว์ว่าระบบคำนวณให้อัตโนมัติจากปริมาณที่กรอก
export const N2O_FACTOR_PER_KG = 0.0098

export const FERTILIZER_LOG_HISTORY = {
  1: [
    {
      id: 1,
      date: '19 พ.ค. 2567',
      formula: '16-20-0',
      amountKg: 25,
      areaRai: 21.5,
    },
    {
      id: 2,
      date: '5 พ.ค. 2567',
      formula: '46-0-0',
      amountKg: 20,
      areaRai: 21.5,
    },
  ],
  2: [
    {
      id: 3,
      date: '10 พ.ค. 2567',
      formula: '46-0-0',
      amountKg: 8,
      areaRai: 8.2,
    },
  ],
  3: [],
}

export const DOCUMENT_CATEGORIES = [
  { key: 'receipt', label: 'ใบเสร็จ', count: 4 },
  { key: 'delivery', label: 'ใบส่งของ', count: 3 },
  { key: 'analysis', label: 'ผลวิเคราะห์ดิน/น้ำ', count: 2 },
  { key: 'photo', label: 'รูปภาพแปลงนา', count: 6 },
]

export const DOCUMENTS = [
  {
    id: 1,
    category: 'receipt',
    name: 'ใบเสร็จค่าปุ๋ย 16-20-0',
    date: '19 พ.ค. 2567',
  },
  {
    id: 2,
    category: 'receipt',
    name: 'ใบเสร็จค่าปุ๋ย 46-0-0',
    date: '5 พ.ค. 2567',
  },
  {
    id: 3,
    category: 'delivery',
    name: 'ใบส่งข้าวหอมมะลิ 105',
    date: '15 พ.ค. 2567',
  },
  {
    id: 4,
    category: 'analysis',
    name: 'ผลตรวจน้ำแปลง 1',
    date: '19 พ.ค. 2567',
  },
  {
    id: 5,
    category: 'photo',
    name: 'ภาพแปลง 1 (ระยะแตกกอ)',
    date: '19 พ.ค. 2567',
  },
]

export const MILLS = [
  {
    id: 1,
    name: 'โรงอบชุมชนบ้านนา',
    type: 'โรงอบ',
    status: 'ว่าง',
    queueCount: 2,
  },
  {
    id: 2,
    name: 'โรงสีข้าวทรีไรซ์',
    type: 'โรงสี',
    status: 'ใกล้เต็ม',
    queueCount: 6,
  },
  {
    id: 3,
    name: 'โรงสีข้าวกลางอำเภอ',
    type: 'โรงสี',
    status: 'เต็ม',
    queueCount: 9,
  },
]

export const LOGISTICS_STEPS = ['แปลงนา', 'จุดรับสินค้า', 'โรงอบ', 'โรงสี']

// แนวโน้มคาร์บอนสะสมรายเดือน (สำหรับกราฟแท่งเล็กๆ ในกระเป๋าคาร์บอน)
export const CARBON_TREND = [
  { label: 'ม.ค.', tco2e: 0.4 },
  { label: 'ก.พ.', tco2e: 0.7 },
  { label: 'มี.ค.', tco2e: 1.1 },
  { label: 'เม.ย.', tco2e: 1.7 },
  { label: 'พ.ค.', tco2e: 2.47 },
]

export const CARBON_CERTIFICATIONS = [
  'Verra VCS Verified',
  'VM0042 Methodology',
  'SGS Validation',
  'มาตรฐาน สบก. ไทย',
]

// ประเภทหลักฐาน MRV (Measurement, Reporting, Verification) — ใช้เป็นเช็คลิสต์
// ต่อแปลงในหน้า MrvEvidencePage อ้างอิงตาม key ใน plot.mrv ด้านบน
export const MRV_EVIDENCE_TYPES = [
  { key: 'gps', label: 'พิกัด GPS' },
  { key: 'timestamp', label: 'เวลาบันทึก (Timestamp)' },
  { key: 'photo', label: 'รูปถ่ายแปลงนา' },
  { key: 'sensorData', label: 'ข้อมูลเซ็นเซอร์ระดับน้ำ' },
  { key: 'farmerLog', label: 'บันทึกกิจกรรมของเกษตรกร' },
]

// กระเป๋าคาร์บอน — totalTco2e ควรใกล้เคียงผลรวม carbonTco2e ของทุกแปลงข้างบน
// (ไม่บังคับให้ตรงเป๊ะ เพราะของจริงจะมีส่วนต่างจากรอบตรวจสอบที่ค้างอยู่)
export const CARBON_WALLET = {
  totalTco2e: 2.47,
  pricePerTon: 350,
  breakdown: [
    { key: 'forecast', label: 'คาดการณ์', tco2e: 0.9 },
    { key: 'pending', label: 'รอตรวจสอบ', tco2e: 0.8 },
    { key: 'verified', label: 'ยืนยันแล้ว', tco2e: 0.5 },
    { key: 'sold', label: 'จำหน่ายแล้ว', tco2e: 0.27 },
  ],
}

export const CARBON_TRANSACTIONS = [
  {
    id: 1,
    date: '19 พ.ค. 2567',
    type: 'สร้างเครดิตรายสัปดาห์',
    amount: 0.32,
    status: 'ยืนยันแล้ว',
  },
  {
    id: 2,
    date: '10 พ.ค. 2567',
    type: 'ขายคาร์บอนเครดิต',
    amount: -1.2,
    status: 'ขายแล้ว',
    priceBaht: 420,
  },
  {
    id: 3,
    date: '2 พ.ค. 2567',
    type: 'สร้างเครดิตรายสัปดาห์',
    amount: 0.28,
    status: 'ยืนยันแล้ว',
  },
  {
    id: 4,
    date: '25 เม.ย. 2567',
    type: 'ขายคาร์บอนเครดิต',
    amount: -1.0,
    status: 'ขายแล้ว',
    priceBaht: 340,
  },
]

export const CARBON_PROGRAM_INFO = {
  standard: 'Verra VCS VM0042',
  benefitPct: '15–30%',
  terms: [
    'ปฏิบัติตามวิธีทำนาแบบเปียกสลับแห้ง (AWD) ตามรอบที่ระบบแนะนำ',
    'บันทึกระดับน้ำ/กิจกรรมในแปลงอย่างสม่ำเสมอเพื่อใช้เป็นหลักฐาน MRV',
    'ยินยอมให้ศูนย์ข้าวและผู้ตรวจสอบเข้าถึงข้อมูลแปลงเพื่อรับรองคาร์บอนเครดิต',
    'รายได้จากการขายคาร์บอนเครดิตจะโอนเข้าบัญชีตามรอบที่ตกลง',
  ],
}

// หน้าแรกโชว์แค่ 3 อันแรก (NEWS.slice(0, 3)) ส่วนหน้า "ข่าวสารทั้งหมด" โชว์ครบ
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
  {
    id: 4,
    tag: 'ข่าวสาร',
    tone: 'good',
    title: 'ศูนย์ข้าวชุมชนเปิดอบรมทำนาแบบเปียกสลับแห้งฟรี 15 มิ.ย. นี้',
    date: '15 พ.ค. 2567',
  },
  {
    id: 5,
    tag: 'คำแนะนำ',
    tone: 'good',
    title: 'ช่วงหน้าฝนควรตรวจระบบระบายน้ำในแปลงให้พร้อมก่อนน้ำหลาก',
    date: '10 พ.ค. 2567',
  },
]

export const WEATHER_FORECAST = [
  {
    day: 'วันนี้',
    date: '23 พ.ค.',
    condition: 'แดดอ่อน',
    high: 33,
    low: 25,
    rain: 10,
  },
  {
    day: 'พรุ่งนี้',
    date: '24 พ.ค.',
    condition: 'มีเมฆบางส่วน',
    high: 32,
    low: 25,
    rain: 20,
  },
  {
    day: 'เสาร์',
    date: '25 พ.ค.',
    condition: 'ฝนฟ้าคะนอง',
    high: 30,
    low: 24,
    rain: 70,
  },
  {
    day: 'อาทิตย์',
    date: '26 พ.ค.',
    condition: 'ฝนฟ้าคะนอง',
    high: 29,
    low: 24,
    rain: 65,
  },
  {
    day: 'จันทร์',
    date: '27 พ.ค.',
    condition: 'มีเมฆเป็นส่วนมาก',
    high: 31,
    low: 25,
    rain: 30,
  },
  {
    day: 'อังคาร',
    date: '28 พ.ค.',
    condition: 'แดดจัด',
    high: 34,
    low: 26,
    rain: 5,
  },
  {
    day: 'พุธ',
    date: '29 พ.ค.',
    condition: 'แดดจัด',
    high: 35,
    low: 26,
    rain: 5,
  },
]

// unread = 3 อัน ตรงกับ badge ที่เคย hardcode ไว้ที่ VillageLayout เดิม
export const NOTIFICATIONS = [
  {
    id: 1,
    tone: 'warning',
    title: 'ระวังเพลี้ยกระโดดสีน้ำตาล',
    body: 'พบการระบาดในพื้นที่ใกล้เคียง ตรวจแปลงของคุณด้วย',
    time: '2 ชม. ที่แล้ว',
    read: false,
  },
  {
    id: 2,
    tone: 'good',
    title: 'ราคาข้าวหอมมะลิปรับขึ้น',
    body: 'ราคาข้าวหอมมะลิ 105 ปรับขึ้น 150 บาท/ตัน วันนี้',
    time: '5 ชม. ที่แล้ว',
    read: false,
  },
  {
    id: 3,
    tone: 'good',
    title: 'ถึงกำหนดใส่ปุ๋ยนาแปลงใหญ่ 1',
    body: 'ตามแผนการดูแล ควรใส่ปุ๋ยสูตรแตกกอภายในสัปดาห์นี้',
    time: '1 วันที่แล้ว',
    read: false,
  },
  {
    id: 4,
    tone: 'good',
    title: 'เปิดจองปุ๋ยราคาสมาชิกรอบใหม่',
    body: 'จองได้ที่ศูนย์ข้าวชุมชนบ้านทุ่งกว้างถึงสิ้นเดือน',
    time: '3 วันที่แล้ว',
    read: true,
  },
]

export const RICE_VARIETIES = [
  'ข้าวหอมมะลิ 105',
  'ข้าว กข.15',
  'ข้าวเหนียว กข.6',
  'ข้าวปทุมธานี 1',
]

export const SALES_HISTORY = [
  {
    id: 1,
    date: '15 พ.ค. 2567',
    variety: 'ข้าวหอมมะลิ 105',
    weightKg: 2000,
    total: 30100,
  },
  {
    id: 2,
    date: '2 เม.ย. 2567',
    variety: 'ข้าว กข.15',
    weightKg: 1500,
    total: 20550,
  },
  {
    id: 3,
    date: '20 ก.พ. 2567',
    variety: 'ข้าวเหนียว กข.6',
    weightKg: 950,
    total: 11685,
  },
]

export const PAYMENT_HISTORY = [
  {
    id: 1,
    date: '16 พ.ค. 2567',
    amount: 30100,
    method: 'โอนเข้าบัญชีธนาคาร',
    ref: 'PAY-240516-01',
  },
  {
    id: 2,
    date: '3 เม.ย. 2567',
    amount: 20550,
    method: 'โอนเข้าบัญชีธนาคาร',
    ref: 'PAY-240403-01',
  },
  {
    id: 3,
    date: '21 ก.พ. 2567',
    amount: 11685,
    method: 'โอนเข้าบัญชีธนาคาร',
    ref: 'PAY-240221-01',
  },
]

export const FAQ_ITEMS = [
  {
    q: 'เพิ่มแปลงนาใหม่ยังไง?',
    a: 'ไปที่แท็บ "แปลงของฉัน" แล้วกดปุ่ม "+ เพิ่มแปลงใหม่" มุมขวาบน กรอกข้อมูลแปลงแล้วบันทึก',
  },
  {
    q: 'AI วิเคราะห์โรคข้าวแม่นยำแค่ไหน?',
    a: 'ตอนนี้เป็นระบบสาธิต ตอบตามตัวอย่างที่ตั้งไว้ล่วงหน้าเท่านั้น ยังไม่ใช่โมเดลวิเคราะห์ภาพจริง ผลที่ได้ใช้อ้างอิงเบื้องต้น ควรปรึกษาเจ้าหน้าที่ศูนย์ข้าวเพิ่มเติม',
  },
  {
    q: 'ขายข้าวผ่านแอปแล้วได้เงินเมื่อไหร่?',
    a: 'โดยทั่วไปศูนย์ข้าวจะโอนเงินภายใน 1-3 วันทำการ หลังชั่งน้ำหนักและตรวจคุณภาพข้าวเรียบร้อย ดูสถานะได้ที่ "ประวัติการรับเงิน"',
  },
  {
    q: 'ราคาข้าวที่แสดงอัปเดตบ่อยแค่ไหน?',
    a: 'ราคาอ้างอิงจากศูนย์ข้าวชุมชน ปรับปรุงทุกวันทำการ',
  },
  {
    q: 'ลืมรหัสผ่านทำยังไง?',
    a: 'ติดต่อเจ้าหน้าที่ศูนย์ข้าวของท่านเพื่อขอรีเซ็ตรหัสผ่าน',
  },
]

export const CONTACT_INFO = {
  name: 'ศูนย์ข้าวชุมชนบ้านทุ่งกว้าง',
  address: 'อ.วารินชำราบ จ.อุบลราชธานี',
  phone: '045-123-456',
  hours: 'จันทร์-ศุกร์ 08:00-16:30 น.',
  staff: [
    {
      name: 'คุณประยุทธ นาดี',
      role: 'หัวหน้าศูนย์ข้าวชุมชน',
      phone: '081-234-5678',
    },
    {
      name: 'คุณสมหญิง ขยันดี',
      role: 'เจ้าหน้าที่ส่งเสริมการเกษตร',
      phone: '089-876-5432',
    },
  ],
}

export const APP_INFO = {
  name: 'DONAUS RiceOS',
  version: '1.0.0 (Beta)',
  description:
    'แอปพลิเคชันสำหรับชาวนา ช่วยติดตามแปลงนา วิเคราะห์โรคข้าวเบื้องต้น ดูราคาตลาด และจัดการรายได้ในที่เดียว',
}

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
  {
    key: 'hommali',
    name: 'ข้าวหอมมะลิ 105',
    price: 15200,
    change: 150,
    unit: 'บาท/ตัน',
  },
  {
    key: 'kk15',
    name: 'ข้าว กข.15',
    price: 13800,
    change: 100,
    unit: 'บาท/ตัน',
  },
  {
    key: 'niaw6',
    name: 'ข้าวเหนียว กข.6',
    price: 12500,
    change: -50,
    unit: 'บาท/ตัน',
  },
]

export const STRAW_PRICES = [
  {
    key: 'bale_small',
    name: 'ฟางก้อนอัดแน่น (ก้อนเล็ก)',
    price: 40,
    change: 2,
    unit: 'บาท/ก้อน',
  },
  {
    key: 'bale_large',
    name: 'ฟางก้อนใหญ่ (บิ๊กแบ็ก)',
    price: 1500,
    change: 50,
    unit: 'บาท/ตัน',
  },
  {
    key: 'fresh_straw',
    name: 'ฟางสดหน้าแปลง',
    price: 850,
    change: -20,
    unit: 'บาท/ตัน',
  },
]

export const CARBON_MARKET_PRICES = [
  {
    key: 'tver_awd',
    name: 'คาร์บอนเครดิต AWD (T-VER)',
    price: 350,
    change: 15,
    unit: 'บาท/tCO2e',
  },
  {
    key: 'verra_vcs',
    name: 'คาร์บอนเครดิต Verra VCS',
    price: 420,
    change: 20,
    unit: 'บาท/tCO2e',
  },
  {
    key: 'agroforestry',
    name: 'คาร์บอนเครดิตวนเกษตร',
    price: 310,
    change: -5,
    unit: 'บาท/tCO2e',
  },
]

export const BIOMASS_PELLETS_PRICES = [
  {
    key: 'straw_pellet',
    name: 'ชีวมวลอัดเม็ดจากฟางข้าว',
    price: 2800,
    change: 50,
    unit: 'บาท/ตัน',
  },
  {
    key: 'husk_pellet',
    name: 'ชีวมวลอัดเม็ดจากแกลบ',
    price: 3200,
    change: 80,
    unit: 'บาท/ตัน',
  },
  {
    key: 'wood_pellet',
    name: 'ขี้เลื่อย/ชีวมวลไม้สับอัดเม็ด',
    price: 3500,
    change: -30,
    unit: 'บาท/ตัน',
  },
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
