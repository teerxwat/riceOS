import { useState } from 'react'
import { Send, Camera, CheckCircle2 } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import {
  AI_WELCOME,
  AI_QUICK_QUESTIONS,
  AI_SAMPLE_DIAGNOSIS,
} from '../data/villageData'

const GENERIC_REPLY =
  'ขณะนี้ AI ยังวิเคราะห์ได้เฉพาะตัวอย่างสาธิต (ลองถามคำถามแนะนำด้านล่าง หรือแนบรูปต้นข้าวดู) ระบบวิเคราะห์จริงกำลังพัฒนาอยู่ครับ'

function DiagnosisCard() {
  return (
    <div className="max-w-[88%] self-start rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[14.5px] text-[var(--text)]">
        จากข้อมูลที่ส่งมา AI วิเคราะห์พบว่าอาจเกิดจาก
      </p>
      <p className="mt-1 text-[16px] font-bold text-[#e5484d]">
        “{AI_SAMPLE_DIAGNOSIS.disease}”
      </p>
      <p className="mt-3 text-[13.5px] font-semibold text-[var(--text)]">
        คำแนะนำ
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {AI_SAMPLE_DIAGNOSIS.recommendations.map((r) => (
          <li
            key={r}
            className="flex items-start gap-1.5 text-[14px] text-[var(--text)]"
          >
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-[var(--green-strong)]"
            />
            {r}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-[var(--muted)]">
        * ผลวิเคราะห์ตัวอย่างสาธิต ยังไม่ได้เชื่อมโมเดลจริง
      </p>
    </div>
  )
}

// คำที่พบในคำถามแนะนำ (AI_QUICK_QUESTIONS) + "ใบเหลือง" จาก mockup ต้นแบบ —
// พิมพ์เองแล้วมีคำพวกนี้ก็เห็นการ์ดวินิจฉัยตัวอย่างได้เหมือนกัน ไม่ต้องกด
// ปุ่มคำถามแนะนำเท่านั้น
const DIAGNOSIS_KEYWORDS = ['ใบเหลือง', 'ออกรวงไม่เต็ม', 'จุดสีน้ำตาล', 'ปุ๋ย']

function AIAssistantPage() {
  const [messages, setMessages] = useState([{ from: 'bot', text: AI_WELCOME }])
  const [input, setInput] = useState('')

  // กดปุ่ม "คำถามแนะนำ" หรือแนบรูป ถือเป็น trigger ที่ตั้งใจไว้แน่นอน (forceDiagnosis)
  // ส่วนพิมพ์เองเช็คจาก keyword เป็นโบนัส ไม่ตรงก็ตอบ placeholder ตรงๆ
  function pushUserMessage(text, { image, forceDiagnosis = false } = {}) {
    setMessages((prev) => [...prev, { from: 'user', text, image }])

    const isDiagnosisTrigger =
      forceDiagnosis ||
      Boolean(image) ||
      DIAGNOSIS_KEYWORDS.some((kw) => text.includes(kw))

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        isDiagnosisTrigger
          ? { from: 'bot', diagnosis: true }
          : { from: 'bot', text: GENERIC_REPLY },
      ])
    }, 500)
  }

  function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    pushUserMessage(text)
    setInput('')
  }

  function handleQuickQuestion(question) {
    pushUserMessage(question, { forceDiagnosis: true })
  }

  function handleImagePick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () =>
      pushUserMessage('', { image: reader.result, forceDiagnosis: true })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <VillageLayout
      title="AI ผู้ช่วยเกษตรกร"
      subtitle="วิเคราะห์โรคข้าว ให้คำแนะนำแบบเจาะจง"
    >
      {/* กันข้อความ/ปุ่มคำถามแนะนำแถวสุดท้ายไม่ให้โดนช่องพิมพ์ (fixed) บังด้านล่าง
          — เป็นพื้นที่เพิ่มจากที่ VillageLayout กันให้ bottom nav ไปแล้ว */}
      <div className="flex flex-col gap-3" style={{ paddingBottom: '4.5rem' }}>
        {messages.map((m, i) =>
          m.diagnosis ? (
            <DiagnosisCard key={i} />
          ) : (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] ${
                m.from === 'user'
                  ? 'self-end bg-[var(--green-strong)] text-white'
                  : 'self-start border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
              }`}
            >
              {m.image && (
                <img
                  src={m.image}
                  alt="รูปที่แนบ"
                  className="mb-1.5 max-h-40 rounded-lg object-cover"
                />
              )}
              {m.text}
            </div>
          )
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {AI_QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleQuickQuestion(q)}
              className="min-h-11 cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[13.5px] text-[var(--text)] active:bg-[var(--badge-bg)]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* sticky ใช้ไม่ได้ที่นี่ — sticky จะ "เกาะ" ก็ต่อเมื่อเลื่อนผ่านตำแหน่งเดิม
          ของมันไปแล้วเท่านั้น พอข้อความยังน้อย (สั้นกว่าจอ) หน้าจะไม่มีอะไรให้
          เลื่อน ช่องพิมพ์เลยค้างอยู่ตรงตำแหน่งเดิมใต้ปุ่มคำถามแนะนำแทนที่จะลง
          ไปอยู่ล่างสุดเหมือนแอปแชททั่วไป — ใช้ fixed แทน ตรึงเหนือ bottom nav
          ตลอด ไม่ว่าข้อความจะสั้นหรือยาวแค่ไหน (ดีไซน์เดียวกับ BottomNav.jsx) */}
      <form
        onSubmit={handleSend}
        className="fixed inset-x-0 z-30 mx-auto flex w-full max-w-md gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-3 py-2 md:border-x"
        style={{
          bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom))',
        }}
      >
        <label className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] active:bg-[var(--surface-2)]">
          <Camera size={21} strokeWidth={1.8} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImagePick}
            className="sr-only"
          />
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์อาการที่พบ..."
          className="h-12 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 text-[16px] text-[var(--text)] outline-none focus:border-[var(--green-strong)] focus:ring-2 focus:ring-[var(--green-strong)]/30"
        />
        <button
          type="submit"
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[var(--green-strong)] text-white active:scale-95"
          aria-label="ส่ง"
        >
          <Send size={18} />
        </button>
      </form>
    </VillageLayout>
  )
}

export default AIAssistantPage
