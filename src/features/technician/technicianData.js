// เจ้าของไฟล์: คนที่ 4 (feature technician)
// ข้อมูล mock ฝั่งช่าง: เครื่องจักร ใบงานซ่อม อะไหล่ ทีมช่าง (ตัวอย่างจังหวัดเชียงใหม่)
import { CENTERS } from '../province/provinceData.js'

export { fmt } from '../province/provinceData.js'

// สถานะเครื่องจักร
export const MACHINE_STATUS = {
  ok: { label: 'ปกติ', color: '#3fae57' },
  watch: { label: 'เฝ้าระวัง', color: '#e8b84b' },
  repair: { label: 'กำลังซ่อม', color: '#f0883e' },
  down: { label: 'เสีย', color: '#e5484d' },
  offline: { label: 'ออฟไลน์', color: '#8a978d' },
}

export const MACHINE_TYPES = {
  dryer: 'เครื่องอบข้าว',
  mill: 'เครื่องสีข้าว',
  solar: 'โซลาร์เซลล์',
  pump: 'ปั๊มน้ำ',
  iot: 'เซ็นเซอร์ IoT',
}

const center = (id) => CENTERS.find((c) => c.id === id)

// เครื่องจักรในจังหวัด (อิงศูนย์ข้าวจริงในระบบ)
export const MACHINES = [
  {
    id: 'M-001',
    name: 'เครื่องอบข้าว DR-300 #1',
    type: 'dryer',
    centerId: 'RC6601001',
    status: 'ok',
    health: 96,
    hours: 3256,
    lastService: '02 พ.ค. 67',
  },
  {
    id: 'M-002',
    name: 'โซลาร์เซลล์ 40kW',
    type: 'solar',
    centerId: 'RC6601001',
    status: 'ok',
    health: 92,
    hours: 8120,
    lastService: '18 เม.ย. 67',
  },
  {
    id: 'M-003',
    name: 'เครื่องอบข้าว DR-300 #1',
    type: 'dryer',
    centerId: 'RC6602012',
    status: 'down',
    health: 22,
    hours: 4108,
    lastService: '12 มี.ค. 67',
  },
  {
    id: 'M-004',
    name: 'เซ็นเซอร์น้ำ-ดิน ชุด A',
    type: 'iot',
    centerId: 'RC6603015',
    status: 'down',
    health: 15,
    hours: 6540,
    lastService: '28 ก.พ. 67',
  },
  {
    id: 'M-005',
    name: 'เครื่องสีข้าว RM-400',
    type: 'mill',
    centerId: 'RC6605009',
    status: 'ok',
    health: 89,
    hours: 2870,
    lastService: '25 เม.ย. 67',
  },
  {
    id: 'M-006',
    name: 'ปั๊มน้ำ WP-150',
    type: 'pump',
    centerId: 'RC6602019',
    status: 'watch',
    health: 64,
    hours: 5230,
    lastService: '02 เม.ย. 67',
  },
  {
    id: 'M-007',
    name: 'เครื่องอบข้าว DR-200',
    type: 'dryer',
    centerId: 'RC6608007',
    status: 'repair',
    health: 48,
    hours: 6012,
    lastService: '10 พ.ค. 67',
  },
  {
    id: 'M-008',
    name: 'เซ็นเซอร์อุณหภูมิไซโล',
    type: 'iot',
    centerId: 'RC6605011',
    status: 'watch',
    health: 58,
    hours: 7420,
    lastService: '20 มี.ค. 67',
  },
  {
    id: 'M-009',
    name: 'เครื่องอบข้าว DR-300 #2',
    type: 'dryer',
    centerId: 'RC6606004',
    status: 'ok',
    health: 94,
    hours: 1980,
    lastService: '08 พ.ค. 67',
  },
  {
    id: 'M-010',
    name: 'โซลาร์เซลล์ 25kW',
    type: 'solar',
    centerId: 'RC6607003',
    status: 'ok',
    health: 90,
    hours: 6890,
    lastService: '30 เม.ย. 67',
  },
  {
    id: 'M-011',
    name: 'เกตเวย์ IoT หลัก',
    type: 'iot',
    centerId: 'RC6603022',
    status: 'offline',
    health: 0,
    hours: 5120,
    lastService: '15 ก.พ. 67',
  },
  {
    id: 'M-012',
    name: 'เครื่องสีข้าว RM-200',
    type: 'mill',
    centerId: 'RC6604018',
    status: 'watch',
    health: 61,
    hours: 4460,
    lastService: '22 มี.ค. 67',
  },
  {
    id: 'M-013',
    name: 'ปั๊มน้ำ WP-200',
    type: 'pump',
    centerId: 'RC6609002',
    status: 'ok',
    health: 87,
    hours: 3340,
    lastService: '05 พ.ค. 67',
  },
  {
    id: 'M-014',
    name: 'เกตเวย์ IoT หลัก',
    type: 'iot',
    centerId: 'RC6610006',
    status: 'offline',
    health: 0,
    hours: 4780,
    lastService: '02 ก.พ. 67',
  },
  {
    id: 'M-015',
    name: 'เครื่องอบข้าว DR-200',
    type: 'dryer',
    centerId: 'RC6611005',
    status: 'ok',
    health: 91,
    hours: 2210,
    lastService: '11 พ.ค. 67',
  },
  {
    id: 'M-016',
    name: 'เครื่องชั่งดิจิทัล 5T',
    type: 'iot',
    centerId: 'RC6601023',
    status: 'watch',
    health: 66,
    hours: 3980,
    lastService: '19 มี.ค. 67',
  },
  {
    id: 'M-017',
    name: 'เครื่องอบข้าว DR-300 #1',
    type: 'dryer',
    centerId: 'RC6604021',
    status: 'ok',
    health: 95,
    hours: 1650,
    lastService: '14 พ.ค. 67',
  },
  {
    id: 'M-018',
    name: 'โซลาร์เซลล์ 40kW',
    type: 'solar',
    centerId: 'RC6606004',
    status: 'ok',
    health: 93,
    hours: 5210,
    lastService: '27 เม.ย. 67',
  },
].map((m) => {
  const c = center(m.centerId)
  return { ...m, center: c?.name ?? '-', district: c?.district ?? '-' }
})

// ระดับความเร่งด่วนของใบงาน
export const WO_PRIORITY = {
  critical: { label: 'วิกฤต', color: '#e5484d' },
  urgent: { label: 'เร่งด่วน', color: '#f0883e' },
  normal: { label: 'ปกติ', color: '#4aa8e0' },
}

// สถานะใบงาน + ลำดับขั้นถัดไป
export const WO_STATUS = {
  waiting: {
    label: 'รอรับงาน',
    color: '#8a978d',
    next: 'accepted',
    nextLabel: 'รับงาน',
  },
  accepted: {
    label: 'รับงานแล้ว',
    color: '#4aa8e0',
    next: 'repairing',
    nextLabel: 'เริ่มซ่อม',
  },
  repairing: {
    label: 'กำลังซ่อม',
    color: '#f0883e',
    next: 'done',
    nextLabel: 'ปิดงาน',
  },
  parts: {
    label: 'รออะไหล่',
    color: '#e8b84b',
    next: 'repairing',
    nextLabel: 'เริ่มซ่อม',
  },
  done: { label: 'เสร็จสิ้น', color: '#3fae57', next: null, nextLabel: null },
}

// ใบงานซ่อมตั้งต้น (state จริงอยู่ใน woStore)
export const INITIAL_WORK_ORDERS = [
  {
    id: 'WO-670523-045',
    machineId: 'M-003',
    priority: 'critical',
    issue: 'มอเตอร์ร้อนผิดปกติ เครื่องหยุดทำงาน',
    due: '23 พ.ค. 12:00',
    sla: '01:30',
    assignee: 'สมชาย ใจดี',
    status: 'repairing',
  },
  {
    id: 'WO-670523-046',
    machineId: 'M-004',
    priority: 'critical',
    issue: 'เชื่อมต่อเซ็นเซอร์ไม่ได้ทั้งศูนย์',
    due: '23 พ.ค. 14:00',
    sla: '03:45',
    assignee: null,
    status: 'waiting',
  },
  {
    id: 'WO-670523-031',
    machineId: 'M-007',
    priority: 'urgent',
    issue: 'สายพานลำเลียงขาด',
    due: '23 พ.ค. 15:00',
    sla: '04:30',
    assignee: 'วรพล แสนดี',
    status: 'parts',
  },
  {
    id: 'WO-670523-018',
    machineId: 'M-006',
    priority: 'urgent',
    issue: 'แรงดันน้ำต่ำ น้ำรั่วซึมที่ข้อต่อ',
    due: '24 พ.ค. 09:00',
    sla: '18:30',
    assignee: 'เอกชัย คำฟู',
    status: 'accepted',
  },
  {
    id: 'WO-670522-118',
    machineId: 'M-012',
    priority: 'urgent',
    issue: 'มีเสียงดังผิดปกติขณะทำงาน',
    due: '24 พ.ค. 10:00',
    sla: '19:45',
    assignee: null,
    status: 'waiting',
  },
  {
    id: 'WO-670522-094',
    machineId: 'M-008',
    priority: 'normal',
    issue: 'ค่าเซ็นเซอร์คลาดเคลื่อนเกินเกณฑ์',
    due: '25 พ.ค. 67',
    sla: '2 วัน',
    assignee: 'ธีระพงษ์ อินตา',
    status: 'accepted',
  },
  {
    id: 'WO-670522-077',
    machineId: 'M-016',
    priority: 'normal',
    issue: 'หน้าจอแสดงผลค่าน้ำหนักไม่ตรง',
    due: '25 พ.ค. 67',
    sla: '2 วัน',
    assignee: null,
    status: 'waiting',
  },
  {
    id: 'WO-670521-063',
    machineId: 'M-011',
    priority: 'urgent',
    issue: 'เกตเวย์ออฟไลน์ ไฟเลี้ยงไม่เข้า',
    due: '24 พ.ค. 16:00',
    sla: '1 วัน',
    assignee: 'ณัฐวุฒิ ศรีสุข',
    status: 'accepted',
  },
  {
    id: 'WO-670521-052',
    machineId: 'M-014',
    priority: 'urgent',
    issue: 'เกตเวย์ออฟไลน์ คาดแบตเสื่อม',
    due: '24 พ.ค. 17:00',
    sla: '1 วัน',
    assignee: null,
    status: 'waiting',
  },
  {
    id: 'WO-670520-041',
    machineId: 'M-005',
    priority: 'normal',
    issue: 'ตรวจเช็คตามรอบ 3,000 ชม.',
    due: '26 พ.ค. 67',
    sla: '3 วัน',
    assignee: 'สมชาย ใจดี',
    status: 'done',
  },
]

// อะไหล่คงคลัง
export const INITIAL_PARTS = [
  {
    id: 'P-01',
    name: 'มอเตอร์ 15 HP',
    stock: 12,
    min: 10,
    unit: 'ตัว',
    usedFor: 'เครื่องอบทุกชนิด',
  },
  {
    id: 'P-02',
    name: 'สายพานลำเลียง B-95',
    stock: 8,
    min: 20,
    unit: 'เส้น',
    usedFor: 'เครื่องอบรุ่น A,B',
  },
  {
    id: 'P-03',
    name: 'ตลับลูกปืน UC205',
    stock: 48,
    min: 30,
    unit: 'ชิ้น',
    usedFor: 'เครื่องอบ/เครื่องสี',
  },
  {
    id: 'P-04',
    name: 'พัดลมระบายอากาศ',
    stock: 8,
    min: 6,
    unit: 'ตัว',
    usedFor: 'เครื่องอบรุ่น B,C',
  },
  {
    id: 'P-05',
    name: 'เซ็นเซอร์อุณหภูมิ',
    stock: 15,
    min: 10,
    unit: 'ชิ้น',
    usedFor: 'เครื่องอบทุกชนิด',
  },
  {
    id: 'P-06',
    name: 'บอร์ดควบคุมหลัก',
    stock: 6,
    min: 5,
    unit: 'ชุด',
    usedFor: 'เครื่องอบรุ่น C',
  },
  {
    id: 'P-07',
    name: 'แบตเตอรี่เกตเวย์ 12V',
    stock: 4,
    min: 10,
    unit: 'ก้อน',
    usedFor: 'เกตเวย์ IoT',
  },
  {
    id: 'P-08',
    name: 'ตลับกรองน้ำปั๊ม',
    stock: 5,
    min: 12,
    unit: 'ชิ้น',
    usedFor: 'ปั๊มน้ำ WP',
  },
]

// ทีมช่างในจังหวัด
export const TEAM = [
  { name: 'สมชาย ใจดี', skill: 'ช่างไฟฟ้า', status: 'busy', distance: 1.2 },
  {
    name: 'เอกชัย คำฟู',
    skill: 'ช่างเครื่องกล',
    status: 'busy',
    distance: 3.5,
  },
  { name: 'วรพล แสนดี', skill: 'ช่างไฟฟ้า', status: 'busy', distance: 5.9 },
  { name: 'ธีระพงษ์ อินตา', skill: 'ช่าง IoT', status: 'free', distance: 8.1 },
  { name: 'ณัฐวุฒิ ศรีสุข', skill: 'ช่าง IoT', status: 'busy', distance: 12.4 },
]

// ภาพรวมรายจังหวัด (เฉพาะช่างใหญ่ระดับประเทศ)
// lat,lng = จุดกึ่งกลางจังหวัดโดยประมาณ ใช้ปักป้ายบนแผนที่ทั้งประเทศ
export const NATIONAL_SUMMARY = [
  {
    id: 'cnx',
    province: 'เชียงใหม่',
    lat: 18.79,
    lng: 98.98,
    machines: 254,
    backlog: 10,
    critical: 2,
    online: 92.5,
  },
  {
    id: 'cri',
    province: 'เชียงราย',
    lat: 19.91,
    lng: 99.83,
    machines: 218,
    backlog: 7,
    critical: 1,
    online: 94.1,
  },
  {
    id: 'plk',
    province: 'พิษณุโลก',
    lat: 16.82,
    lng: 100.26,
    machines: 186,
    backlog: 12,
    critical: 3,
    online: 89.8,
  },
  {
    id: 'nma',
    province: 'นครราชสีมา',
    lat: 14.98,
    lng: 102.1,
    machines: 342,
    backlog: 15,
    critical: 2,
    online: 91.2,
  },
  {
    id: 'ubn',
    province: 'อุบลราชธานี',
    lat: 15.24,
    lng: 104.85,
    machines: 296,
    backlog: 9,
    critical: 1,
    online: 93.4,
  },
]

// helper: หา machine/center ของใบงาน
export const machineOf = (wo) => MACHINES.find((m) => m.id === wo.machineId)
export const centerOf = (wo) => center(machineOf(wo)?.centerId)

// สถานี = ศูนย์ที่มีเครื่องจักร สรุปสถานะแย่สุดของเครื่องในสถานีนั้น
// (ใช้ตอนช่างใหญ่ซูมเข้าไปดูรายจังหวัด: โชว์สีเฉพาะจุดที่มีแนวโน้มปัญหา)
const WORST_ORDER = ['down', 'repair', 'offline', 'watch', 'ok']
export const STATIONS = [...new Set(MACHINES.map((m) => m.centerId))].map(
  (cid) => {
    const c = center(cid)
    const machines = MACHINES.filter((m) => m.centerId === cid)
    const worst =
      WORST_ORDER.find((s) => machines.some((m) => m.status === s)) ?? 'ok'
    return {
      id: cid,
      name: c?.name ?? '-',
      district: c?.district ?? '-',
      lat: c?.lat,
      lng: c?.lng,
      worst,
      machines,
    }
  }
)
