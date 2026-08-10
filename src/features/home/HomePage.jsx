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
} from 'lucide-react'
import RiceHero from './components/RiceHero.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CountUp from './components/CountUp.jsx'
import SmartImage from './components/SmartImage.jsx'
import { IMG } from './images.js'
import './HomePage.css'

// เผยเนื้อหาแบบ fade-up เมื่อเลื่อนถึง
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]') ?? []
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
    els.forEach((el) => io.observe(el))
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

const STATS = [
  { to: 1000, suffix: '+', label: 'ไร่ที่ดูแล' },
  { to: 24, suffix: ' ชม.', label: 'เฝ้าระวังต่อเนื่อง' },
  { to: 6, suffix: ' ช่วง', label: 'ครบทั้งวงจร' },
  { to: 100, suffix: '%', label: 'ข้อมูลแก้ย้อนหลังไม่ได้' },
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

const MARQUEE = [
  'ข้าว',
  'AWD',
  'คาร์บอนเครดิต',
  'ไม่เผาฟาง',
  'IoT ในแปลง',
  'ดาวเทียม',
  'ชลประทาน',
  'ผลผลิตสูงขึ้น',
  'War Room',
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
  const navigate = useNavigate()

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
          </div>
        ))}
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

      {/* ── SHOWCASE (image + text สลับ) ── */}
      <section className="section showcase-section">
        <header className="section-head" data-reveal>
          <span className="eyebrow">3 ระดับการทำงาน</span>
          <h2>จากแปลงนา สู่ระดับประเทศ</h2>
        </header>
        {SHOWCASE.map((s) => (
          <div
            className={`showcase${s.flip ? ' flip' : ''}`}
            key={s.title}
            data-reveal
          >
            <div className="showcase-media">
              <SmartImage src={s.img} alt={s.title} />
              <span className="showcase-tag">{s.tag}</span>
            </div>
            <div className="showcase-body">
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
          </div>
        ))}
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" data-reveal>
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>
              <Wheat size={16} /> {m}
            </span>
          ))}
        </div>
      </div>

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

      {/* ── CTA ── */}
      <section className="cta" data-reveal>
        <SmartImage src={IMG.misty} alt="ทุ่งนายามเช้า" className="cta-bg" />
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
    </div>
  )
}
