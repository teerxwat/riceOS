import { useState } from 'react'
import { X, Send, Sparkles } from 'lucide-react'
import { useDismissablePanel } from '../hooks/useDismissablePanel'

const WELCOME = {
  from: 'bot',
  text: 'สวัสดีครับ ผมคือ AI Assistant ผู้ช่วยผู้บริหาร ถามข้อมูลเกี่ยวกับข้าวและศูนย์ข้าวชุมชนได้เลยครับ',
}

const PLACEHOLDER_REPLY =
  'ขณะนี้ระบบ AI ยังอยู่ระหว่างพัฒนา เร็วๆ นี้จะสามารถตอบคำถามเกี่ยวกับข้อมูลข้าวแบบเรียลไทม์ได้ครับ'

// แผง chat แบบ slide-over จากขวา — ยังไม่ต่อ AI จริง ตอบด้วยข้อความคงที่
// (ไม่แกล้งทำเป็นตอบได้จริง เพราะยังไม่มี backend AI ให้ต่อ)
function AIAssistantPanel({ open, onClose }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const panelRef = useDismissablePanel(open, onClose)

  function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: PLACEHOLDER_REPLY }])
    }, 500)
  }

  if (!open) return null

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="ปิด AI Assistant"
        className="fixed inset-0 z-[1100] cursor-default bg-black/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="AI Assistant"
        className="fixed top-0 right-0 z-[1101] flex h-svh w-full max-w-sm flex-col border-l border-db-border bg-db-surface"
      >
        <div className="flex items-center justify-between border-b border-db-border p-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-db-green" />
            <p className="text-heading-sm font-bold text-db-text">
              AI Assistant
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-db-text-muted hover:text-db-text"
            aria-label="ปิด"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-db px-3.5 py-2.5 text-body ${
                m.from === 'user'
                  ? 'self-end bg-db-green text-white'
                  : 'self-start border border-db-border bg-db-surface-alt text-db-text'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t border-db-border p-3"
        >
          <label htmlFor="ai-assistant-input" className="sr-only">
            พิมพ์คำถามถึง AI Assistant
          </label>
          <input
            id="ai-assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์คำถาม..."
            className="flex-1 rounded-lg border border-db-border bg-db-surface-alt px-3 py-2 text-body text-db-text outline-none focus:border-db-green focus:ring-2 focus:ring-db-green/40"
          />
          <button
            type="submit"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-db-green text-white"
            aria-label="ส่ง"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  )
}

export default AIAssistantPanel
