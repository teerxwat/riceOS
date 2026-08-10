import { Suspense, useEffect, useMemo, useRef, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  Html,
  ContactShadows,
  Center,
  Bounds,
} from '@react-three/drei'

const MODEL_URL = '/models/rice.glb'
const TURNS = Math.PI * 2 // หมุนครบ 1 รอบตลอดช่วง pinned

// ── ความคืบหน้าการหมุน (0..1) อิงกับช่วง hero ที่ถูก pin ไว้ ──
// ระหว่างที่ hero ถูก pin (sticky) ผู้ใช้เลื่อนแล้วโมเดลจะหมุน
// จนครบ (progress=1) หน้าเว็บถึงจะเลื่อนต่อ
function useScrollProgress() {
  const ref = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.hero-scroll')
      if (!el) {
        ref.current = 0
        return
      }
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      ref.current = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return ref
}

// ── โมเดลจริงจากไฟล์ .glb ──
function RiceModel({ scrollRef }) {
  const group = useRef()
  const { scene } = useGLTF(MODEL_URL)

  // ลงสีวัสดุ: ใบ -> เขียว, รวงข้าว -> ทอง (ทำครั้งเดียว)
  useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m) => {
        const isLeaf = /leaf|leaves/i.test(m.name || '')
        m.color?.set(isLeaf ? '#4faf5a' : '#e6b23a')
        if ('metalness' in m) m.metalness = 0.05
        if ('roughness' in m) m.roughness = isLeaf ? 0.6 : 0.45
        m.needsUpdate = true
      })
    })
  }, [scene])

  useFrame((state, delta) => {
    if (!group.current) return
    // หมุนตาม progress ของช่วง pinned (lerp ให้ลื่น ไม่กระตุก)
    const target = scrollRef.current * TURNS
    group.current.rotation.y +=
      (target - group.current.rotation.y) * Math.min(1, delta * 6)
    // ลอยขึ้นลงเบาๆ
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06
  })

  // Bounds = auto-fit โมเดลให้พอดีเฟรมอัตโนมัติ (ไม่ต้องเดา scale)
  // Center = ย้ายจุดหมุนมาไว้กึ่งกลางโมเดล
  return (
    <Bounds fit clip margin={0.65}>
      <group ref={group}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Bounds>
  )
}

// ตำแหน่งใบ/เมล็ด คำนวณครั้งเดียวนอก render (คงที่ ไม่สุ่มใหม่ทุกเฟรม)
const BLADES = Array.from({ length: 5 }, (_, i) => {
  const a = (i / 5) * Math.PI * 2
  return {
    x: Math.cos(a) * 0.35,
    z: Math.sin(a) * 0.35,
    rx: 0.2 * Math.cos(a),
    rz: -0.2 * Math.sin(a),
  }
})
const GRAINS = Array.from({ length: 40 }, () => [
  (Math.random() - 0.5) * 1.2,
  1.6 + Math.random() * 1.4,
  (Math.random() - 0.5) * 1.2,
])

// ── สำรอง: ถ้าโหลด .glb ไม่ได้ วาดต้นข้าวแบบง่ายๆ แทน (หน้าไม่พัง) ──
function RiceFallback({ scrollRef }) {
  const group = useRef()
  useFrame((_, delta) => {
    if (!group.current) return
    const target = scrollRef.current * TURNS
    group.current.rotation.y +=
      (target - group.current.rotation.y) * Math.min(1, delta * 6)
  })
  return (
    <group ref={group} position={[0, -1, 0]}>
      {BLADES.map((b, i) => (
        <mesh key={i} position={[b.x, 1, b.z]} rotation={[b.rx, 0, b.rz]}>
          <coneGeometry args={[0.12, 2.4, 8]} />
          <meshStandardMaterial color="#5bbf4a" roughness={0.5} />
        </mesh>
      ))}
      {GRAINS.map((pos, i) => (
        <mesh key={`g${i}`} position={pos}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#f2c85b" roughness={0.35} />
        </mesh>
      ))}
    </group>
  )
}

// ErrorBoundary ครอบ useGLTF: ถ้าไฟล์หาย/โหลดพัง -> ใช้ fallback
class ModelBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function Loader() {
  return (
    <Html center>
      <div className="rice-loader">กำลังโหลดต้นข้าว…</div>
    </Html>
  )
}

export default function RiceHero() {
  const scrollRef = useScrollProgress()

  return (
    <div className="rice-hero-canvas">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={['#eaffea', '#d8c48a', 0.9]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow />
        <directionalLight
          position={[-4, 2, -2]}
          intensity={0.4}
          color="#bfe6a8"
        />

        <Suspense fallback={<Loader />}>
          <ModelBoundary fallback={<RiceFallback scrollRef={scrollRef} />}>
            <RiceModel scrollRef={scrollRef} />
          </ModelBoundary>
        </Suspense>

        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.35}
          scale={8}
          blur={2.6}
          far={4}
        />
      </Canvas>
      <p className="rice-hero-hint">เลื่อนเมาส์ลงเพื่อหมุนดูต้นข้าว ↓</p>
    </div>
  )
}

// preload ล่วงหน้าให้โหลดไว
useGLTF.preload(MODEL_URL)
