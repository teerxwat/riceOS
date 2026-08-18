// ข้อมูลตัวอย่าง (mock) สำหรับ 9 หน้าเมนูที่เหลือ — โครงสร้างเดียวกับ dashboardData.js
// รอต่อ API จริงทีหลัง

export const CENTERS_SUMMARY = [
  { key: 'total', label: 'ศูนย์ทั้งหมด', value: 1000, unit: 'แห่ง' },
  { key: 'online', label: 'ออนไลน์', value: 876, unit: 'แห่ง', trend: 'up' },
  { key: 'warning', label: 'เฝ้าระวัง', value: 82, unit: 'แห่ง' },
  { key: 'offline', label: 'ออฟไลน์', value: 42, unit: 'แห่ง' },
]

export const CENTERS_LIST = [
  {
    id: 1,
    name: 'ศูนย์ข้าวบ้านหนองหวาย',
    province: 'อุบลราชธานี',
    region: 'northeast',
    status: 'ok',
    production: 485.6,
    income: 68.45,
  },
  {
    id: 2,
    name: 'ศูนย์ข้าวบ้านโคกสะอาด',
    province: 'นครราชสีมา',
    region: 'northeast',
    status: 'ok',
    production: 412.3,
    income: 56.2,
  },
  {
    id: 3,
    name: 'ศูนย์ข้าวบ้านดอยหมูส',
    province: 'เชียงใหม่',
    region: 'north',
    status: 'ok',
    production: 398.7,
    income: 52.1,
  },
  {
    id: 4,
    name: 'ศูนย์ข้าวบ้านทุ่งกว้าง',
    province: 'สุพรรณบุรี',
    region: 'central',
    status: 'watch',
    production: 362.5,
    income: 48.3,
  },
  {
    id: 5,
    name: 'ศูนย์ข้าวบ้านนาโพธิ์',
    province: 'ขอนแก่น',
    region: 'northeast',
    status: 'ok',
    production: 324.8,
    income: 43.8,
  },
  {
    id: 6,
    name: 'ศูนย์ข้าวบ้านหนองบัว',
    province: 'สุพรรณบุรี',
    region: 'central',
    status: 'ok',
    production: 298.1,
    income: 40.2,
  },
  {
    id: 7,
    name: 'ศูนย์ข้าวบ้านคลองเจดีย์',
    province: 'สุพรรณบุรี',
    region: 'central',
    status: 'risk',
    production: 210.4,
    income: 28.6,
  },
  {
    id: 8,
    name: 'ศูนย์ข้าวบ้านแม่จัน',
    province: 'เชียงราย',
    region: 'north',
    status: 'offline',
    production: 0,
    income: 0,
  },
  {
    id: 9,
    name: 'ศูนย์ข้าวบ้านบางปลาม้า',
    province: 'สุพรรณบุรี',
    region: 'central',
    status: 'ok',
    production: 276.9,
    income: 37.4,
  },
  {
    id: 10,
    name: 'ศูนย์ข้าวบ้านท่าใหญ่',
    province: 'พัทลุง',
    region: 'south',
    status: 'watch',
    production: 158.2,
    income: 21.9,
  },
]

export const PROVINCE_RANKING_TOP = [
  {
    rank: 1,
    province: 'สุพรรณบุรี',
    production: 485.6,
    income: 68.45,
    progress: 96.8,
  },
  {
    rank: 2,
    province: 'เชียงใหม่',
    production: 412.3,
    income: 56.2,
    progress: 95.1,
  },
  {
    rank: 3,
    province: 'อุบลราชธานี',
    production: 398.7,
    income: 52.1,
    progress: 94.7,
  },
  {
    rank: 4,
    province: 'บุรีรัมย์',
    production: 362.5,
    income: 48.3,
    progress: 93.9,
  },
  {
    rank: 5,
    province: 'ศรีสะเกษ',
    production: 324.8,
    income: 43.8,
    progress: 93.2,
  },
]

export const PROVINCE_RANKING_BOTTOM = [
  {
    rank: 1,
    province: 'แม่ฮ่องสอน',
    production: 52.1,
    income: 6.8,
    progress: 55.2,
  },
  {
    rank: 2,
    province: 'นราธิวาส',
    production: 55.3,
    income: 7.2,
    progress: 56.8,
  },
  { rank: 3, province: 'ยะลา', production: 56.8, income: 7.5, progress: 58.6 },
  {
    rank: 4,
    province: 'มุกดาหาร',
    production: 58.6,
    income: 7.9,
    progress: 58.6,
  },
  {
    rank: 5,
    province: 'ปัตตานี',
    production: 59.7,
    income: 8.1,
    progress: 59.7,
  },
]

export const CARBON_SUMMARY = [
  {
    key: 'total',
    label: 'คาร์บอนเครดิตสะสม',
    value: 256780,
    unit: 'tCO₂e',
    sub: '+18.35% จากเดือนก่อน',
    trend: 'up',
  },
  {
    key: 'target',
    label: 'เป้าหมายปีนี้',
    value: 650000,
    unit: 'tCO₂e',
    sub: 'ความคืบหน้า 39.5%',
  },
  {
    key: 'reduced',
    label: 'ลดการเผาฟาง',
    value: 62430,
    unit: 'ตัน',
    sub: 'สะสมปีนี้',
    trend: 'up',
  },
  {
    key: 'awd',
    label: 'พื้นที่ทำ AWD',
    value: 512430,
    unit: 'ไร่',
    sub: '+18.7% จากเดือนก่อน',
    trend: 'up',
  },
]

export const STRAW_USAGE = [
  {
    key: 'feed',
    label: 'อัดก้อนอาหารสัตว์',
    value: 38250,
    pct: 61.3,
    color: 'var(--color-db-green)',
  },
  {
    key: 'sell',
    label: 'ทำปุ๋ยหมัก',
    value: 12680,
    pct: 20.3,
    color: 'var(--color-db-amber)',
  },
  {
    key: 'mushroom',
    label: 'เพาะเห็ด',
    value: 5420,
    pct: 8.7,
    color: 'var(--color-db-blue)',
  },
  {
    key: 'livestock',
    label: 'เลี้ยงสัตว์',
    value: 4080,
    pct: 6.5,
    color: 'var(--color-db-purple)',
  },
  {
    key: 'other',
    label: 'อื่นๆ',
    value: 2000,
    pct: 3.2,
    color: 'var(--color-db-text-dim)',
  },
]

// สัดส่วนคาร์บอนเครดิตตามสถานะ (pipeline) ทั่วประเทศ — รวมกันควรเท่ากับ
// CARBON_SUMMARY.total (256,780 tCO₂e) โดยประมาณ
export const CARBON_PIPELINE = [
  {
    key: 'forecast',
    label: 'คาดการณ์',
    value: 92440,
    pct: 36.0,
    color: 'var(--color-db-amber)',
  },
  {
    key: 'pending',
    label: 'รอตรวจสอบ (MRV)',
    value: 61630,
    pct: 24.0,
    color: 'var(--color-db-blue)',
  },
  {
    key: 'verified',
    label: 'ยืนยันแล้ว',
    value: 66260,
    pct: 25.8,
    color: 'var(--color-db-green)',
  },
  {
    key: 'sold',
    label: 'จำหน่ายแล้ว',
    value: 36450,
    pct: 14.2,
    color: 'var(--color-db-text-dim)',
  },
]

// คาร์บอนเครดิตสะสมรายเดือน (tCO₂e) — โครงสร้างเดียวกับ TREND ในหน้าภาพรวม
// ใช้กับ TrendChart component เดิม (ผ่าน prop unit ที่เพิ่มใหม่)
export const CARBON_TREND = {
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
  actual: [
    38200,
    79500,
    124800,
    178300,
    256780,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  forecast: [
    38200, 78100, 122400, 172600, 228900, 285200, 341500, 397800, 454100,
    510400, 566700, 650000,
  ],
  target: 650000,
}

export const CARBON_CERTIFICATIONS = [
  'Verra VCS Verified',
  'VM0042 Methodology',
  'SGS Validation',
  'มาตรฐาน สบก. ไทย',
]

export const CARBON_TRANSACTIONS = [
  {
    id: 1,
    date: '19 พ.ค. 2567',
    region: 'ตะวันออกเฉียงเหนือ',
    type: 'สร้างเครดิต (Generation)',
    amount: 18420,
    status: 'ยืนยันแล้ว',
  },
  {
    id: 2,
    date: '15 พ.ค. 2567',
    region: 'กลาง',
    type: 'ขายคาร์บอนเครดิต (Issuance)',
    amount: -12500,
    status: 'ขายแล้ว',
    priceMillionBaht: 4.38,
  },
  {
    id: 3,
    date: '10 พ.ค. 2567',
    region: 'เหนือ',
    type: 'สร้างเครดิต (Generation)',
    amount: 9840,
    status: 'ยืนยันแล้ว',
  },
  {
    id: 4,
    date: '2 พ.ค. 2567',
    region: 'ตะวันออกเฉียงเหนือ',
    type: 'ขายคาร์บอนเครดิต (Issuance)',
    amount: -23950,
    status: 'ขายแล้ว',
    priceMillionBaht: 8.38,
  },
  {
    id: 5,
    date: '22 เม.ย. 2567',
    region: 'ใต้',
    type: 'สร้างเครดิต (Generation)',
    amount: 3120,
    status: 'รอตรวจสอบ',
  },
]

// ความครบถ้วนของหลักฐาน MRV รายศูนย์ (สุ่มตัวอย่างศูนย์ที่เข้าร่วมโครงการ
// คาร์บอน) — auditReady = พร้อมให้ผู้ตรวจสอบภายนอกตรวจ (ครบถ้วน ≥ 90%)
export const MRV_SUMMARY = [
  {
    key: 'enrolled',
    label: 'ศูนย์ที่เข้าร่วมโครงการคาร์บอน',
    value: 428,
    unit: 'ศูนย์',
    sub: 'จาก 1,000 ศูนย์ทั้งหมด',
  },
  {
    key: 'ready',
    label: 'พร้อมตรวจสอบ (Audit Ready)',
    value: 312,
    unit: 'ศูนย์',
    sub: '72.9% ของศูนย์ที่เข้าร่วม',
    trend: 'up',
  },
  {
    key: 'avgComplete',
    label: 'ความครบถ้วนหลักฐานเฉลี่ย',
    value: 84.6,
    unit: '%',
    sub: '+3.2% จากเดือนก่อน',
    trend: 'up',
  },
  {
    key: 'flagged',
    label: 'ศูนย์ที่ต้องติดตาม',
    value: 23,
    unit: 'ศูนย์',
    sub: 'ครบถ้วน < 50%',
  },
]

export const MRV_CENTERS = [
  {
    id: 1,
    name: 'ศูนย์ข้าวบ้านหนองหวาย',
    province: 'อุบลราชธานี',
    plotsEnrolled: 186,
    completePct: 96,
    auditReady: true,
  },
  {
    id: 2,
    name: 'ศูนย์ข้าวบ้านโคกสะอาด',
    province: 'นครราชสีมา',
    plotsEnrolled: 152,
    completePct: 91,
    auditReady: true,
  },
  {
    id: 3,
    name: 'ศูนย์ข้าวบ้านดอยหมูส',
    province: 'เชียงใหม่',
    plotsEnrolled: 98,
    completePct: 78,
    auditReady: false,
  },
  {
    id: 4,
    name: 'ศูนย์ข้าวบ้านทุ่งกว้าง',
    province: 'สุพรรณบุรี',
    plotsEnrolled: 140,
    completePct: 62,
    auditReady: false,
  },
  {
    id: 5,
    name: 'ศูนย์ข้าวบ้านนาโพธิ์',
    province: 'ขอนแก่น',
    plotsEnrolled: 121,
    completePct: 94,
    auditReady: true,
  },
  {
    id: 6,
    name: 'ศูนย์ข้าวบ้านคลองเจดีย์',
    province: 'สุพรรณบุรี',
    plotsEnrolled: 64,
    completePct: 38,
    auditReady: false,
  },
]

export const MRV_FLAGS = [
  {
    id: 1,
    severity: 'critical',
    title: 'ศูนย์ข้าวบ้านคลองเจดีย์ หลักฐานครบเพียง 38%',
    detail:
      'ขาดข้อมูลเซ็นเซอร์และรูปถ่ายแปลงส่วนใหญ่ เสี่ยงไม่ผ่านตรวจสอบรอบถัดไป',
    time: '2 วันที่แล้ว',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'สุพรรณบุรีมี 2 ศูนย์ต่ำกว่าเกณฑ์ Audit Ready',
    detail:
      'ทุ่งกว้าง (62%) และคลองเจดีย์ (38%) ควรเร่งเก็บหลักฐานก่อนสิ้นไตรมาส',
    time: '3 วันที่แล้ว',
  },
  {
    id: 3,
    severity: 'good',
    title: 'อุบลราชธานีความครบถ้วนหลักฐานสูงสุด',
    detail: 'ศูนย์บ้านหนองหวายครบถ้วน 96% พร้อมเป็นต้นแบบให้ศูนย์อื่น',
    time: '1 วันที่แล้ว',
  },
]

export const INCOME_SUMMARY = [
  {
    key: 'total',
    label: 'รายได้เกษตรกรสะสม',
    value: 1284.5,
    unit: 'ล้านบาท',
    sub: '+18.7% จากปีก่อน',
    trend: 'up',
  },
  {
    key: 'perCenter',
    label: 'เฉลี่ยต่อศูนย์',
    value: 1.46,
    unit: 'ล้านบาท',
    sub: 'จาก 876 ศูนย์ออนไลน์',
  },
  {
    key: 'perRai',
    label: 'เฉลี่ยต่อไร่',
    value: 2508,
    unit: 'บาท/ไร่',
    sub: '+5.2% จากปีก่อน',
    trend: 'up',
  },
]

export const INCOME_BY_TYPE = [
  {
    key: 'hommali',
    label: 'ข้าวหอมมะลิ',
    value: 640.2,
    pct: 49.8,
    color: 'var(--color-db-green)',
  },
  {
    key: 'niaw',
    label: 'ข้าวเหนียว',
    value: 325.3,
    pct: 25.3,
    color: 'var(--color-db-amber)',
  },
  {
    key: 'pathum',
    label: 'ข้าวปทุมธานี',
    value: 214.9,
    pct: 16.7,
    color: 'var(--color-db-blue)',
  },
  {
    key: 'other',
    label: 'ข้าวอื่นๆ',
    value: 104.1,
    pct: 8.2,
    color: 'var(--color-db-text-dim)',
  },
]

export const BURNING_SUMMARY = [
  {
    key: 'hotspots',
    label: 'จุดความร้อนวันนี้',
    value: 152,
    unit: 'จุด',
    sub: 'ลดลง -23% จากเมื่อวาน',
    trend: 'down-good',
  },
  {
    key: 'reduced',
    label: 'ลดการเผาฟางสะสม',
    value: 62430,
    unit: 'ตัน',
    sub: 'สะสมปีนี้',
    trend: 'up',
  },
  {
    key: 'provinces',
    label: 'จังหวัดเสี่ยงแล้งจัด',
    value: 15,
    unit: 'จังหวัด',
    sub: 'ช่วง มิ.ย.–ส.ค. 2567',
  },
]

export const BURNING_HOTSPOT_ALERTS = [
  {
    id: 1,
    severity: 'critical',
    title: 'จุดความร้อนเพิ่มขึ้นเฉียบพลัน — สุรินทร์',
    detail: 'ตรวจพบ 18 จุดใน 24 ชม. สูงกว่าค่าเฉลี่ย 3 เท่า',
    time: '08:12 น.',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'ศรีสะเกษเข้าสู่ช่วงเสี่ยงเผาสูงสุด',
    detail: 'คาดสูงสุดช่วง 15 ก.ค. – 20 ส.ค. แนะนำเฝ้าระวังต่อเนื่อง',
    time: '07:40 น.',
  },
  {
    id: 3,
    severity: 'good',
    title: 'บุรีรัมย์ลดจุดความร้อนได้ 42%',
    detail: 'จากมาตรการอัดก้อนฟางเพิ่มในพื้นที่นำร่อง 12 ตำบล',
    time: '07:05 น.',
  },
]

export const FORECAST_SUMMARY = [
  {
    key: 'production',
    label: 'คาดการณ์ผลผลิตปี 67/68',
    value: 11.85,
    unit: 'ล้านตัน',
    sub: 'สูงกว่าเป้าหมาย +5.1%',
    trend: 'up',
  },
  {
    key: 'price',
    label: 'ราคาข้าวเปลือกเฉลี่ยปัจจุบัน',
    value: 15200,
    unit: 'บาท/ตัน',
    sub: 'หอมมะลิ 100% ชั้น 2',
  },
  {
    key: 'priceForecast',
    label: 'คาดการณ์ราคา 3 เดือนข้างหน้า',
    value: 16300,
    unit: 'บาท/ตัน',
    sub: 'แนวโน้มเพิ่มขึ้น',
    trend: 'up',
  },
]

export const AI_FORECAST_INSIGHTS = [
  {
    id: 1,
    severity: 'good',
    title: 'โอกาสเพิ่มผลผลิตอีก 12.6%',
    detail:
      'พบศักยภาพเพิ่มผลผลิตได้ใน 27 จังหวัด หากปรับปรุงการจัดการน้ำและปุ๋ย',
    time: 'อัปเดตวันนี้',
  },
  {
    id: 2,
    severity: 'warning',
    title: 'ความเสี่ยงภัยแล้งระดับสูง 15 จังหวัด',
    detail:
      'คาดว่าจะเสี่ยงขาดแคลนน้ำช่วง มิ.ย.–ส.ค. 2567 แนะนำวางแผนสำรองน้ำล่วงหน้า',
    time: 'อัปเดตวันนี้',
  },
  {
    id: 3,
    severity: 'good',
    title: 'แนวโน้มราคาข้าวเปลือกขาขึ้น',
    detail:
      'คาดว่าจะเพิ่มขึ้นในช่วง ก.ค.–ก.ย. 2567 จากอุปสงค์ตลาดส่งออกที่ฟื้นตัว',
    time: 'อัปเดตวันนี้',
  },
]

export const REPORTS_LIST = [
  {
    id: 1,
    name: 'Executive Summary',
    period: 'อัปเดตล่าสุด 23 พ.ค. 2567',
    format: 'PDF',
  },
  {
    id: 2,
    name: 'รายงานผลการดำเนินงานรายเดือน',
    period: 'ประจำเดือน เม.ย. 2567',
    format: 'PDF',
  },
  {
    id: 3,
    name: 'รายงานคาร์บอนและสิ่งแวดล้อม',
    period: 'ไตรมาส 2/2567',
    format: 'XLSX',
  },
  {
    id: 4,
    name: 'รายงานรายได้เกษตรกร',
    period: 'ไตรมาส 2/2567',
    format: 'XLSX',
  },
  { id: 5, name: 'รายงานการลดการเผา', period: 'ไตรมาส 2/2567', format: 'PDF' },
  {
    id: 6,
    name: 'รายงานสถานการณ์น้ำและแผนที่ความเสี่ยง',
    period: 'พ.ค. 2567',
    format: 'PDF',
  },
]
