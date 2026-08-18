// ข้อมูลตัวอย่าง (mock) สำหรับหน้าภาพรวมประเทศ — รอต่อ API จริงทีหลัง
// โครงสร้างนี้ตั้งใจให้ใกล้เคียงกับ response ที่ backend น่าจะส่งมา
// เพื่อให้สลับไปใช้ของจริงทีหลังง่าย (แค่เปลี่ยนจุดที่ import)

export const HERO = {
  label: 'ข้าวเปลือกวันนี้',
  value: 8543.2,
  unit: 'ตัน',
  target: 9000,
  targetLabel: 'เป้าหมาย 9,000 ตัน',
  deltaPct: 5.1,
}

export const KPI_STRIP = [
  {
    key: 'centers',
    label: 'ศูนย์ข้าวทั้งหมด',
    value: 1000,
    unit: 'ศูนย์',
    sub: 'ออนไลน์ 876 (87.6%)',
  },
  {
    key: 'awd',
    label: 'พื้นที่ทำคาร์บอนต่ำ',
    value: 512430,
    unit: 'ไร่',
    sub: '+18.7% จากเดือนก่อน',
    trend: 'up',
  },
  {
    key: 'income',
    label: 'รายได้เกษตรกร',
    value: 1284.5,
    unit: 'ล้านบาท',
    sub: 'สะสมปีนี้',
  },
  {
    key: 'noburn',
    label: 'ลดการเผาฟาง',
    value: 62430,
    unit: 'ตัน',
    sub: 'สะสมปีนี้',
    trend: 'up',
  },
]

// พิกัด lat/lng เป็นจุดศูนย์กลางโดยประมาณของแต่ละภาค (ใกล้จังหวัดหลัก)
// ใช้ปักหมุดบนแผนที่ Leaflet จริง ไม่ใช่พิกัดขอบเขตภาคที่แม่นยำระดับสำรวจ
// awdAdoptionPct = สัดส่วนพื้นที่ (area) ของภาคนั้นที่ทำนาแบบ AWD จริง — ใช้
// แสดงใน RegionDetailPanel เวลากดเลือกภาคบนแผนที่ (หน้า "แผนที่ประเทศ")
export const REGIONS = [
  {
    id: 'north',
    name: 'เหนือ',
    lat: 18.79,
    lng: 98.98,
    centers: 190,
    production: 1742.3,
    area: 95430,
    income: 284.65,
    status: 'ok',
    awdAdoptionPct: 58.2,
  },
  {
    id: 'northeast',
    name: 'ตะวันออกเฉียงเหนือ',
    lat: 15.85,
    lng: 102.94,
    centers: 340,
    production: 2864.7,
    area: 162850,
    income: 452.3,
    status: 'ok',
    awdAdoptionPct: 71.4,
  },
  {
    id: 'east',
    name: 'ตะวันออก',
    lat: 12.68,
    lng: 101.28,
    centers: 95,
    production: 812.4,
    area: 48250,
    income: 129.4,
    status: 'ok',
    awdAdoptionPct: 62.8,
  },
  {
    id: 'south',
    name: 'ใต้',
    lat: 8.44,
    lng: 99.96,
    centers: 110,
    production: 601.2,
    area: 33450,
    income: 108.2,
    status: 'risk',
    awdAdoptionPct: 24.1,
  },
  {
    id: 'west',
    name: 'ตะวันตก',
    lat: 14.02,
    lng: 99.53,
    centers: 55,
    production: 507.2,
    area: 29560,
    income: 99.4,
    status: 'ok',
    awdAdoptionPct: 55.6,
  },
  {
    id: 'central',
    name: 'กลาง',
    lat: 14.35,
    lng: 100.58,
    centers: 210,
    production: 2015.6,
    area: 128340,
    income: 318.75,
    status: 'watch',
    awdAdoptionPct: 44.9,
  },
]

const REGION_TOTALS = REGIONS.reduce(
  (acc, r) => ({
    centers: acc.centers + r.centers,
    production: acc.production + r.production,
    area: acc.area + r.area,
    income: acc.income + r.income,
    awdArea: acc.awdArea + r.area * (r.awdAdoptionPct / 100),
  }),
  { centers: 0, production: 0, area: 0, income: 0, awdArea: 0 }
)

export const COUNTRY_TOTAL = {
  centers: REGION_TOTALS.centers,
  production: REGION_TOTALS.production,
  area: REGION_TOTALS.area,
  income: REGION_TOTALS.income,
  // ถ่วงน้ำหนักด้วยพื้นที่ของแต่ละภาค ไม่ใช่ค่าเฉลี่ยธรรมดา — ภาคที่มีพื้นที่
  // เยอะกว่าควรมีน้ำหนักต่อภาพรวมประเทศมากกว่าภาคเล็ก
  awdAdoptionPct: (REGION_TOTALS.awdArea / REGION_TOTALS.area) * 100,
}

// ผลผลิตรายเดือน: จริง vs คาดการณ์ vs เป้าหมาย (ล้านตันสะสม)
export const TREND = {
  months: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ],
  actual: [0.7, 1.6, 2.9, 4.3, 5.9, null, null, null, null, null, null, null],
  forecast: [0.7, 1.5, 2.8, 4.0, 5.6, 7.1, 8.6, 9.9, 11.0, 11.6, 11.8, 11.85],
  target: 11.28,
}

// ฟีดความสำคัญ: รวม insight เฉิงบวก + คำเตือน + ไฮไลต์จังหวัดเด่น เรียงตาม severity
export const ATTENTION_FEED = [
  {
    id: 1,
    severity: 'critical',
    title: 'ความชื้นข้าวเกินเกณฑ์ 5 จังหวัด',
    detail:
      'นครสวรรค์, อุทัยธานี, สุพรรณบุรี, ลพบุรี, สระบุรี — เสี่ยงเชื้อราหากไม่จัดการใน 48 ชม.',
    time: '08:30 น.',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'พื้นที่ทำคาร์บอนต่ำเพิ่มขึ้น 18.7%',
    detail: 'สูงกว่า baseline ที่ตั้งไว้ แนะนำเร่ง 4 จังหวัดที่ยังต่ำกว่าเป้า',
    time: '07:45 น.',
  },
  {
    id: 3,
    severity: 'good',
    title: 'สุพรรณบุรีผลงานโดดเด่นอันดับ 1',
    detail:
      'ข้าวออบ 485.6 ตัน รายได้ 68.45 ล้านบาท — สูงกว่าค่าเฉลี่ยประเทศ 34%',
    time: '07:10 น.',
  },
  {
    id: 4,
    severity: 'good',
    title: 'คาดการณ์ผลผลิตปี 67/68 สูงกว่าเป้า 5.1%',
    detail: 'AI ประเมิน 11.85 ล้านตัน จากสภาพอากาศและการจัดการน้ำที่ดีขึ้น',
    time: '06:50 น.',
  },
]

export const ENVIRONMENT_TODAY = [
  {
    key: 'rain',
    label: 'ฝนสะสม 24 ชม.',
    value: '18.6',
    unit: 'มม.',
    deltaLabel: 'สูงกว่าค่าเฉลี่ย',
    delta: '+12%',
    tone: 'watch',
  },
  {
    key: 'flood',
    label: 'พื้นที่น้ำท่วมขัง',
    value: '82,450',
    unit: 'ไร่',
    deltaLabel: 'ลดลง',
    delta: '-8.3%',
    tone: 'good',
  },
  {
    key: 'heat',
    label: 'จุดความร้อน (ไฟ/เผา)',
    value: '152',
    unit: 'จุด',
    deltaLabel: 'ลดลง',
    delta: '-23%',
    tone: 'good',
  },
  {
    key: 'air',
    label: 'คุณภาพอากาศ (เฉลี่ย)',
    value: 'AQI 42',
    unit: '',
    deltaLabel: '',
    delta: 'ดี',
    tone: 'good',
  },
]
