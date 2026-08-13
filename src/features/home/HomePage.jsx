import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sprout,
  Bell,
  BellRing,
  Satellite,
  Recycle,
  BarChart3,
  Wheat,
  Map,
  Check,
  RadioTower,
  ShieldCheck,
  Camera,
  MonitorSmartphone,
  Server,
  TrendingUp,
  Leaf,
  BadgeCheck,
  Globe2,
  Users,
  Phone,
  Mail,
  Globe,
  MapPin,
  ArrowLeft,
  ArrowRight,
  FileSearch,
  Layers,
  Lock,
  Clock,
  Target,
  Factory,
  Sun,
  Wrench,
} from 'lucide-react'
import RiceHero from './components/RiceHero.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CountUp from './components/CountUp.jsx'
import SmartImage from './components/SmartImage.jsx'
import { IMG } from './images.js'
import './HomePage.css'

// เผยเนื้อหาแบบ fade-up เมื่อเลื่อนถึง
// element ที่อยู่ในจอตั้งแต่แรกโชว์ทันที (ไม่รอ IntersectionObserver —
// บางสภาวะ IO ไม่ยิง event ทำให้เนื้อหาล่องหนถาวร)
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = [...(ref.current?.querySelectorAll('[data-reveal]') ?? [])]
    const vh = window.innerHeight || document.documentElement.clientHeight
    const rest = els.filter((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh && r.bottom > 0) {
        el.classList.add('is-visible')
        return false
      }
      return true
    })
    if (!rest.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    rest.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

// parallax ตามเมาส์ (เฉพาะ hero) ให้รู้สึก interactive
function useMouseParallax() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
  return ref
}

// ตัวเลขจริงของโครงการระดับชาติ (แพลตฟอร์มข้าวชุมชนอัจฉริยะ 1,000 ศูนย์)
const STATS = [
  {
    to: 1000,
    suffix: '',
    label: 'ศูนย์ข้าวชุมชนทั่วประเทศ',
    sub: 'ยกระดับครบทุกภูมิภาค',
  },
  {
    to: 104000,
    suffix: '+',
    label: 'อุปกรณ์ IoT และ IT รวม',
    sub: 'เซ็นเซอร์ สื่อสาร โครงสร้างพื้นฐาน',
  },
  {
    to: 67000,
    suffix: '',
    label: 'จุดตรวจวัดภาคสนาม',
    sub: 'น้ำ ดิน อากาศ เครื่องจักร พลังงาน',
  },
  {
    to: 1200000,
    suffix: '',
    label: 'ไร่ พื้นที่เกษตรกรสมาชิก',
    sub: 'จากแปลงนา สู่แพลตฟอร์มข้อมูล',
  },
]

// อุปกรณ์หลักที่จัดหาในโครงการ
const EQUIPMENT = [
  { Icon: Sprout, label: 'เซ็นเซอร์ภาคสนาม น้ำ/ดิน/อากาศ' },
  { Icon: RadioTower, label: 'เกตเวย์ LoRaWAN และเครือข่าย' },
  { Icon: ShieldCheck, label: 'ระบบความปลอดภัยเครื่องจักร' },
  { Icon: Camera, label: 'กล้องวงจรปิด AI' },
  { Icon: MonitorSmartphone, label: 'จอแสดงผลและระบบยืนยันตัวตน' },
  { Icon: Server, label: 'ระบบ IT และซอฟต์แวร์ประจำศูนย์' },
]

// ประโยชน์ที่ได้รับ (จากวิสัยทัศน์โครงการ)
const IMPACTS = [
  {
    Icon: TrendingUp,
    title: 'เพิ่มรายได้เกษตรกร',
    desc: 'ผลผลิตคุณภาพสูงขึ้น รายได้เพิ่มขึ้น 2–3 เท่า',
  },
  {
    Icon: Leaf,
    title: 'ลดต้นทุน เพิ่มประสิทธิภาพ',
    desc: 'พลังงานสะอาด ลดการสูญเสีย ใช้ทรัพยากรคุ้มค่า',
  },
  {
    Icon: BadgeCheck,
    title: 'ยกระดับคุณภาพและมาตรฐาน',
    desc: 'ตรวจสอบย้อนกลับได้ สร้างความเชื่อมั่นสู่ตลาดโลก',
  },
  {
    Icon: Globe2,
    title: 'ลดโลกร้อน สู่ Net Zero',
    desc: 'ลดการปล่อยคาร์บอน สร้างรายได้คาร์บอนเครดิตในอนาคต',
  },
  {
    Icon: Users,
    title: 'สร้างความเข้มแข็งให้ชุมชน',
    desc: 'องค์ความรู้ เทคโนโลยี และโอกาสใหม่ สู่คนรุ่นต่อไป',
  },
  {
    Icon: Wheat,
    title: 'ความมั่นคงทางอาหาร',
    desc: 'ข้าวไทยคุณภาพดี ผลิตได้ต่อเนื่อง เสริมความมั่นคงของประเทศ',
  },
]

const FEATURES = [
  {
    Icon: BarChart3,
    title: 'ภาพรวมแบบเรียลไทม์',
    desc: 'ค่าน้ำ ดิน อากาศ และผลผลิตของทุกแปลง บนแดชบอร์ดเดียว เข้าใจง่ายในพริบตา',
    span: 'wide',
  },
  {
    Icon: BellRing,
    title: 'ระบบแจ้งเตือน',
    desc: 'เตือนเมื่อค่าผิดปกติ ให้ลงมือแก้ทันก่อนเสียหาย',
  },
  {
    Icon: Wheat,
    title: 'ยกระดับผลผลิต',
    desc: 'ใช้ข้อมูลจริงช่วยตัดสินใจทุกรอบการปลูก',
  },
  {
    Icon: Map,
    title: 'มุมมองผู้บริหารรายพื้นที่',
    desc: 'เทียบผลแต่ละภาค/จังหวัด/ศูนย์ ดูคาร์บอนและเศรษฐกิจทั้งประเทศ',
    span: 'wide',
  },
  {
    Icon: ShieldCheck,
    title: 'ตรวจสอบย้อนกลับได้',
    desc: 'ข้อมูลบันทึกแบบแก้ย้อนหลังไม่ได้ ทุกขั้นตอนโปร่งใส',
  },
  {
    Icon: Leaf,
    title: 'พร้อมต่อยอดคาร์บอนเครดิต',
    desc: 'ข้อมูลระดับแปลงจัดเก็บตามมาตรฐาน พร้อมรองรับการรับรองคาร์บอนเครดิต สร้างรายได้ใหม่ให้เกษตรกรในระยะยาว',
    span: 'wide',
  },
]

// ความพร้อมของ donaus ในการเป็นผู้จัดหาอุปกรณ์ (จากข้อเสนอโครงการ)
const WHY_DONAUS = [
  {
    Icon: FileSearch,
    title: 'วิเคราะห์ข้อกำหนดเชิงลึกระดับรายบรรทัด',
    desc: 'ครอบคลุมวิศวกรรม จัดซื้อ และกฎระเบียบ ก่อนเริ่มงานจริงทุกครั้ง',
  },
  {
    Icon: Users,
    title: 'ทบทวนหลายมุมมอง 7 ด้าน',
    desc: 'วิศวกรรม คลื่นความถี่ พลังงาน ระบบ IT การติดตั้ง ข้อกำหนดโครงการ และจัดซื้อ พร้อมตรวจทานตัวเลขอย่างอิสระ',
  },
  {
    Icon: Layers,
    title: 'สถาปัตยกรรมระบบครบ 4 ชั้น',
    desc: 'ภาคสนาม → เกตเวย์ → ศูนย์ → คลาวด์ พร้อมแผนผังวิศวกรรมครบถ้วน',
  },
  {
    Icon: Factory,
    title: 'แผนจัดหาแบบผู้ผลิตคู่ (Dual-Source)',
    desc: 'ผู้ผลิตไทยและต่างประเทศคู่กัน ลดความเสี่ยงซัพพลาย พร้อมแผนขออนุญาตคลื่นความถี่',
  },
]

// 4 เสาหลักของการส่งมอบ
const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'คุณภาพมาตรฐาน',
    desc: 'ทดสอบผ่านการใช้งานภาคสนามจริง',
  },
  {
    Icon: Lock,
    title: 'เสถียร ปลอดภัย',
    desc: 'เชื่อมต่อมั่นคง ข้อมูลปลอดภัย',
  },
  { Icon: Clock, title: 'ส่งมอบตรงเวลา', desc: 'แผนงานชัดเจน ควบคุมได้' },
  {
    Icon: Sprout,
    title: 'ต่อยอดอนาคต',
    desc: 'รองรับคาร์บอนเครดิตและการขยายผล',
  },
]

// กลยุทธ์จัดหาแบบผู้ผลิตคู่
const DUAL_SOURCE = [
  {
    Icon: Factory,
    title: 'ผู้ผลิตในประเทศ',
    points: [
      'ระยะเวลาส่งมอบสั้น',
      'บริการหลังการขายรวดเร็ว',
      'สนับสนุนเศรษฐกิจในประเทศ',
    ],
  },
  {
    Icon: Globe2,
    title: 'ผู้ผลิตต่างประเทศ',
    points: [
      'เทคโนโลยีมาตรฐานสากล',
      'ต้นทุนแข่งขันได้',
      'สำรองความเสี่ยงซัพพลาย',
    ],
  },
]

// จุดเด่นของอุปกรณ์ทั้งโครงการ
const STANDARDS = [
  { Icon: BadgeCheck, label: 'ออกแบบตามมาตรฐานสากล รองรับการขยายในอนาคต' },
  { Icon: RadioTower, label: 'ใช้งานเสถียร แม้พื้นที่ห่างไกล' },
  { Icon: Sun, label: 'ใช้พลังงานต่ำ เหมาะกับพลังงานแสงอาทิตย์' },
  { Icon: Wrench, label: 'ติดตั้งง่าย บำรุงรักษาสะดวก' },
  { Icon: BarChart3, label: 'ข้อมูลแม่นยำ เชื่อถือได้ ตรวจสอบได้แบบเรียลไทม์' },
]

const SHOWCASE = [
  {
    img: IMG.paddyGreen,
    tag: 'ระดับแปลง',
    title: 'เซ็นเซอร์ในแปลงนา',
    desc: 'วัดระดับน้ำ ความชื้นดิน และอากาศแบบต่อเนื่อง ส่งเข้าระบบอัตโนมัติผ่านเกตเวย์ ทำให้รู้สถานะทุกแปลงตลอดเวลา',
    points: [
      'เซ็นเซอร์น้ำ–ดิน–อากาศ',
      'คำนวณรอบ AWD อัตโนมัติ',
      'ข้อมูลเข้าระบบทันที',
    ],
  },
  {
    img: IMG.misty,
    tag: 'ระดับศูนย์',
    title: 'จัดการศูนย์อย่างเป็นระบบ',
    desc: 'ตั้งแต่ลงทะเบียนสมาชิก อบข้าว รับซื้อ ไปจนถึงจัดการฟาง ทุกอย่างเชื่อมกันและตรวจสอบย้อนกลับได้',
    points: [
      'ทะเบียนสมาชิก + ทบก.',
      'เครื่องอบ ไซโล ตาชั่ง โซลาร์',
      'กระทบยอดอัตโนมัติ',
    ],
    flip: true,
  },
  {
    img: IMG.field,
    tag: 'ระดับประเทศ',
    title: 'บอร์ดกลางระดับประเทศ',
    desc: 'แดชบอร์ดภาพรวมทั้งประเทศ แยกภาค/จังหวัด เห็นสถานะคาร์บอน การไม่เผา และผลเศรษฐกิจ พร้อม War Room 24 ชม.',
    points: [
      'ภาพรวมทั้งประเทศ',
      'สถานะคาร์บอน + การไม่เผา',
      'แจ้งเตือนแบบเรียลไทม์',
    ],
  },
  {
    img: IMG.solar,
    tag: 'พลังงานสะอาด',
    title: 'โครงสร้างพื้นฐานประจำศูนย์',
    desc: 'โซลาร์เซลล์ ระบบพลังงาน และเครือข่ายสื่อสารประจำศูนย์ ออกแบบให้ใช้พลังงานต่ำ ทำงานเสถียรแม้พื้นที่ห่างไกล',
    points: ['โซลาร์เซลล์ + ระบบพลังงาน', 'เกตเวย์ LoRaWAN', 'บำรุงรักษาสะดวก'],
  },
]

const PHASES = [
  {
    n: 1,
    title: 'ลงทะเบียนศูนย์และสมาชิก',
    desc: 'เก็บข้อมูลศูนย์ กรรมการ และสมาชิกรายคน (ทบก. แปลง เอกสารสิทธิ์ ข้อมูลผลิตเดิมเป็น Baseline คาร์บอน) ผ่านแท็บเล็ต + เครื่องอ่านบัตร + GPS',
  },
  {
    n: 2,
    title: 'สำรวจพื้นที่และคัดกรอง',
    desc: 'สำรวจจุดวางเครื่อง ที่เก็บข้าว สัญญาณ เขตชลประทาน และชุดดิน แล้วจัดกลุ่ม ก / ข / ค / ง',
  },
  {
    n: 3,
    title: 'ติดตั้งอุปกรณ์',
    desc: 'แยกอุปกรณ์ประจำศูนย์ (เครื่องอบ ไซโล ตาชั่ง โซลาร์ Edge) กับอุปกรณ์ในแปลง (เซ็นเซอร์น้ำ ดิน อากาศ เกตเวย์)',
  },
  {
    n: 4,
    title: 'เดินระบบและเก็บข้อมูล',
    desc: 'ข้อมูลอบข้าว รับซื้อ จัดการน้ำ ฟาง และดาวเทียม ไหลเข้าระบบอัตโนมัติ — แก้ย้อนหลังไม่ได้ เพื่อความน่าเชื่อถือ',
  },
  {
    n: 5,
    title: 'ประมวลผลและรายงาน',
    desc: 'คำนวณรอบ AWD ตรวจคุณภาพ กระทบยอด คำนวณคาร์บอน และออกรายงานให้ 4 ฝ่าย',
  },
  {
    n: 6,
    title: 'บอร์ดกลางระดับประเทศ',
    desc: 'แดชบอร์ดภาพรวมทั้งประเทศ แยกภาค/จังหวัด สถานะคาร์บอน การไม่เผา ผลเศรษฐกิจ พร้อม War Room และเจ้าหน้าที่ 24 ชม.',
  },
]

const FLOW = [
  'แปลงนาและศูนย์',
  'ระบบประจำศูนย์',
  'ส่วนกลางและคลาวด์',
  'บอร์ดกลางระดับประเทศ',
]

export default function HomePage() {
  const ref = useReveal()
  const heroRef = useMouseParallax()
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  // เลื่อนสไลด์ทีละใบแบบอิง index (ปุ่มลูกศรของ slider)
  const slideBy = (dir) => {
    const el = sliderRef.current
    if (!el) return
    const slides = el.querySelectorAll('.slide')
    if (!slides.length) return
    const gap = 26
    const w = slides[0].getBoundingClientRect().width + gap
    const idx = Math.max(
      0,
      Math.min(slides.length - 1, Math.round(el.scrollLeft / w) + dir)
    )
    el.scrollTo({ left: idx * w, behavior: 'smooth' })
  }

  return (
    <div className="home" ref={ref}>
      <ScrollProgress />

      {/* ── HERO (pinned: หมุนโมเดลจนครบก่อน หน้าเว็บถึงเลื่อนต่อ) ── */}
      <section className="hero-scroll">
        <div className="hero" ref={heroRef}>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />

          <div className="hero-copy" data-reveal>
            <span className="badge">
              <Sprout size={16} /> Smart Rice Platform
            </span>
            <h1>
              ยกระดับการทำนาไทย
              <br />
              ด้วย<span className="grad"> ข้อมูลอัจฉริยะ</span>
            </h1>
            <p>
              ระบบดูแลและติดตามภาพรวมการปลูกข้าวตั้งแต่แปลงนาถึงระดับประเทศ
              ช่วยให้ชาวนาได้ผลผลิตดีขึ้น จัดการง่ายขึ้น
              และเห็นทุกค่าที่สำคัญแบบเรียลไทม์
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate('/login')}
              >
                เข้าสู่ระบบ
              </button>
              <button className="btn btn-ghost" type="button">
                ดูภาพรวมระบบ
              </button>
            </div>
            <div className="hero-chips">
              <span>
                <Bell size={15} /> แจ้งเตือนอัตโนมัติ
              </span>
              <span>
                <Satellite size={15} /> ข้อมูลดาวเทียม
              </span>
              <span>
                <Recycle size={15} /> ลดการเผา
              </span>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <RiceHero />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats" data-reveal>
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-value">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </section>

      {/* ── NATIONAL PROJECT (โครงการระดับชาติ) ── */}
      <section className="section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">โครงการระดับชาติ</span>
          <h2>แพลตฟอร์มข้าวชุมชนอัจฉริยะ 1,000 ศูนย์ทั่วประเทศ</h2>
          <p>
            แพลตฟอร์มเกษตรอัจฉริยะภาครัฐระดับประเทศ ครอบคลุมการตรวจวัดภาคสนาม
            โครงสร้างพื้นฐาน ระบบ IT และซอฟต์แวร์ครบวงจร
          </p>
        </header>

        <div className="showcase" data-reveal>
          <div className="showcase-media">
            <SmartImage
              src={IMG.solar}
              alt="โซลาร์เซลล์และอุปกรณ์ IoT ภาคสนาม"
            />
            <span className="showcase-tag">1,000 ศูนย์</span>
          </div>
          <div className="showcase-body">
            <h3>ยกระดับศูนย์แปรรูปข้าวชุมชนครบทุกภูมิภาค</h3>
            <p>
              donaus รับบทผู้จัดหาอุปกรณ์ IoT และระบบซอฟต์แวร์ภาคสนามของโครงการ
              ตั้งแต่เซ็นเซอร์ในแปลงจนถึงระบบประจำศูนย์
              พร้อมส่งมอบโซลูชันครบวงจร — อุปกรณ์คุณภาพ ระบบเสถียร
              ข้อมูลแม่นยำเชื่อถือได้
            </p>
            <ul>
              <li>
                <Check size={18} className="li-check" />
                จุดตรวจวัดภาคสนาม 67,000 จุด — น้ำ ดิน อากาศ เครื่องจักร พลังงาน
                ความปลอดภัย
              </li>
              <li>
                <Check size={18} className="li-check" />
                อุปกรณ์รวมกว่า 104,000 รายการ ทั้ง IoT ระบบสื่อสาร
                โครงสร้างพื้นฐาน และ IT
              </li>
              <li>
                <Check size={18} className="li-check" />
                ข้อมูลระดับแปลง รองรับการรับรองคาร์บอนเครดิต
              </li>
            </ul>
          </div>
        </div>

        <div className="equip-chips" data-reveal>
          {EQUIPMENT.map((e) => (
            <span key={e.label}>
              <e.Icon size={16} /> {e.label}
            </span>
          ))}
        </div>

        <div className="goal-banner" data-reveal>
          <span className="goal-icon">
            <Target size={22} />
          </span>
          <p>
            <b>เป้าหมายของโครงการ</b> —
            สร้างแพลตฟอร์มข้อมูลเกษตรอัจฉริยะที่เชื่อมโยงทุกศูนย์ข้าวชุมชนทั่วประเทศ
            เพื่อเพิ่มประสิทธิภาพการผลิต ลดต้นทุน
            และสร้างมูลค่าเพิ่มจากข้อมูลสู่คาร์บอนเครดิต
          </p>
        </div>
      </section>

      {/* ── FEATURES (bento) ── */}
      <section className="section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">ทำไมต้อง riceOS</span>
          <h2>เครื่องมือครบสำหรับดูแลการทำนา</h2>
          <p>ทุกฟีเจอร์ออกแบบมาเพื่อให้การทำนาออกมาดีขึ้นในทุกขั้นตอน</p>
        </header>
        <div className="bento">
          {FEATURES.map((f) => (
            <article
              className={`feature-card${f.span === 'wide' ? ' wide' : ''}`}
              key={f.title}
              data-reveal
            >
              <div className="feature-icon">
                <f.Icon size={26} strokeWidth={1.8} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
          <article className="feature-card image-tile" data-reveal>
            <SmartImage src={IMG.dewy} alt="หยดน้ำค้างบนต้นข้าวยามเช้า" />
            <div className="image-tile-cap">ทุกหยดน้ำ ทุกต้นข้าว มีข้อมูล</div>
          </article>
        </div>
      </section>

      {/* ── SHOWCASE (สไลด์แนวนอนแบบ scroll-snap) ── */}
      <section className="section slider-section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">ระดับการทำงาน</span>
          <h2>จากแปลงนา สู่ระดับประเทศ</h2>
          <p>ลากหรือกดลูกศรเพื่อเลื่อนดูแต่ละระดับ</p>
        </header>
        <div className="slider-wrap" data-reveal>
          <div className="slider" ref={sliderRef}>
            {SHOWCASE.map((s) => (
              <article className="slide" key={s.title}>
                <div className="slide-media">
                  <SmartImage src={s.img} alt={s.title} />
                  <span className="showcase-tag">{s.tag}</span>
                </div>
                <div className="slide-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>
                        <Check size={18} className="li-check" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="slider-nav">
            <button
              type="button"
              onClick={() => slideBy(-1)}
              aria-label="สไลด์ก่อนหน้า"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => slideBy(1)}
              aria-label="สไลด์ถัดไป"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY DONAUS (ความพร้อมของผู้จัดหา) ── */}
      <section className="section why-section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">ทำไมต้อง DONAUS</span>
          <h2>ความพร้อมในการเป็นผู้จัดหาอุปกรณ์</h2>
          <p>
            พร้อมส่งมอบโซลูชันครบวงจร — อุปกรณ์คุณภาพ ระบบเสถียร
            ข้อมูลแม่นยำเชื่อถือได้
          </p>
        </header>

        <div className="why-grid">
          {WHY_DONAUS.map((w, i) => (
            <article className="why-item" key={w.title} data-reveal>
              <span className="why-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="why-body">
                <h3>
                  <w.Icon size={19} /> {w.title}
                </h3>
                <p>{w.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pillar-row" data-reveal>
          {PILLARS.map((p) => (
            <div className="pillar" key={p.title}>
              <p.Icon size={22} />
              <b>{p.title}</b>
              <span>{p.desc}</span>
            </div>
          ))}
        </div>

        <div className="dual-grid" data-reveal>
          {DUAL_SOURCE.map((d) => (
            <article className="dual-card" key={d.title}>
              <div className="feature-icon">
                <d.Icon size={24} strokeWidth={1.8} />
              </div>
              <h3>{d.title}</h3>
              <ul>
                {d.points.map((p) => (
                  <li key={p}>
                    <Check size={17} className="li-check" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="standards-row" data-reveal>
          {STANDARDS.map((s) => (
            <span key={s.label}>
              <s.Icon size={16} /> {s.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── 6 PHASES ── */}
      <section className="section timeline-section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">โร้ดแมป</span>
          <h2>6 ช่วงของโครงการ</h2>
          <p>จากการลงทะเบียนหน้างาน สู่แดชบอร์ดภาพรวมระดับประเทศ</p>
        </header>
        <div className="timeline">
          {PHASES.map((p) => (
            <div className="phase" key={p.n} data-reveal>
              <div className="phase-num">{p.n}</div>
              <div className="phase-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DATA FLOW ── */}
      <section className="section flow-section" data-reveal>
        <header className="section-head">
          <h2>เส้นทางข้อมูลทั้งระบบ</h2>
          <p>ข้อมูลไหลจากแปลงนาขึ้นสู่บอร์ดกลางอย่างเป็นระบบ</p>
        </header>
        <div className="flow">
          {FLOW.map((step, i) => (
            <div className="flow-step" key={step}>
              <span className="flow-dot">{i + 1}</span>
              <span className="flow-label">{step}</span>
              {i < FLOW.length - 1 && <span className="flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACTS (ประโยชน์ที่ได้รับ) ── */}
      <section className="section impact-section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">ประโยชน์ที่ได้รับ</span>
          <h2>คุณค่าที่ส่งถึงเกษตรกรและประเทศ</h2>
          <p>ใช้ข้อมูล ใช้เทคโนโลยี สร้างคุณค่ายั่งยืนให้เกษตรกรไทย</p>
        </header>
        <div className="impact-grid">
          {IMPACTS.map((m) => (
            <article className="feature-card" key={m.title} data-reveal>
              <div className="feature-icon">
                <m.Icon size={24} strokeWidth={1.8} />
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
        <div className="badges-row" data-reveal>
          <span>
            <Globe2 size={16} /> SDGs — เป้าหมายการพัฒนาที่ยั่งยืน
          </span>
          <span>
            <Recycle size={16} /> BCG — เศรษฐกิจชีวภาพ หมุนเวียน สีเขียว
          </span>
          <span>
            <Leaf size={16} /> Carbon Neutral — สู่ Net Zero
          </span>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta" data-reveal>
        <SmartImage
          src={IMG.golden}
          alt="ทุ่งข้าวสีทองยามเย็น"
          className="cta-bg"
        />
        <div className="cta-inner">
          <h2>พร้อมยกระดับการทำนาของศูนย์คุณแล้วหรือยัง?</h2>
          <p>
            เริ่มจากการลงทะเบียนศูนย์และสมาชิก แล้วปล่อยให้ข้อมูลทำงานให้คุณ
          </p>
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => navigate('/login')}
          >
            เริ่มลงทะเบียน
          </button>
        </div>
      </section>

      {/* ── FOOTER (ติดต่อ) ── */}
      <footer className="home-footer" data-reveal>
        <div className="home-footer-brand">
          <b>DONAUS</b>
          <span>Smart IoT Solution for Sustainable Future</span>
          <p>ข้าวอัจฉริยะ เกษตรกรมั่งคั่ง ประเทศไทยยั่งยืน</p>
        </div>
        <div className="home-footer-contact">
          <span>
            <Phone size={15} /> 053-215939
          </span>
          <span>
            <Mail size={15} /> info@donaus.com
          </span>
          <span>
            <Globe size={15} /> www.donaus.com
          </span>
          <span>
            <MapPin size={15} /> DONAUS Co., Ltd. เชียงใหม่ ประเทศไทย
          </span>
        </div>
        <div className="home-footer-cred">
          <span>ประสบการณ์ IoT และระบบอัจฉริยะกว่า 10 ปี</span>
          <span>โครงการมากกว่า 500+ ทั่วประเทศ</span>
          <span>ทีมงานมืออาชีพ ดูแลครบวงจรตั้งแต่ต้นจนจบ</span>
          <span>มาตรฐานสากล ปลอดภัย ปกป้องข้อมูล 100%</span>
        </div>
      </footer>
    </div>
  )
}
