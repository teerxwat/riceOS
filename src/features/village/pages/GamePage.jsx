import { useMemo, useState } from 'react'
import {
  CircleDot,
  Sprout,
  Leaf,
  Wheat,
  CheckCircle2,
  Trophy,
} from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { useGameState } from '../hooks/useGameState'
import {
  DAILY_MISSIONS,
  QUIZ_QUESTIONS,
  LEVELS,
  LEADERBOARD,
} from '../data/villageData'
import { formatNumber } from '../utils/format'

const STAGE_ICONS = [CircleDot, Sprout, Leaf, Wheat, Wheat]

function getLevelInfo(points) {
  let current = LEVELS[0]
  for (const lv of LEVELS) {
    if (points >= lv.minPoints) current = lv
  }
  const next = LEVELS.find((lv) => lv.minPoints > points)
  return { current, next }
}

// เลือกคำถาม "ของวันนี้" แบบหมุนตามวันที่ในเดือน — ไม่ต้องมี backend ก็ดูเหมือน
// เปลี่ยนคำถามใหม่ทุกวันได้ (ไม่ครบทุกวันในเดือนเพราะจำนวนคำถามมีจำกัด แต่ก็
// พอสำหรับสาธิต)
function useTodaysQuiz() {
  return useMemo(() => {
    const day = new Date().getDate()
    return QUIZ_QUESTIONS[day % QUIZ_QUESTIONS.length]
  }, [])
}

function QuizMission({ points, done, onComplete }) {
  const quiz = useTodaysQuiz()
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  if (done) {
    return (
      <li className="flex min-h-16 items-center gap-3 border-b border-[var(--border)] px-4 py-3 last:border-0">
        <CheckCircle2
          size={22}
          className="shrink-0 text-[var(--green-strong)]"
        />
        <span className="min-w-0 flex-1 text-[14.5px] text-[var(--muted)] line-through">
          ตอบคำถามความรู้ประจำวัน
        </span>
        <span className="shrink-0 text-[13px] font-semibold text-[var(--green-strong)]">
          +{points}
        </span>
      </li>
    )
  }

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
    if (selected === quiz.answer) onComplete()
  }

  return (
    <li className="border-b border-[var(--border)] px-4 py-3 last:border-0">
      <p className="text-[14.5px] font-medium text-[var(--text)]">{quiz.q}</p>
      <div className="mt-2 flex flex-col gap-2">
        {quiz.choices.map((choice, i) => {
          const isCorrect = submitted && i === quiz.answer
          const isWrongPick =
            submitted && i === selected && selected !== quiz.answer
          return (
            <button
              key={choice}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`min-h-11 rounded-xl border px-3.5 text-left text-[13.5px] ${
                isCorrect
                  ? 'border-[var(--green-strong)] bg-[var(--badge-bg)] text-[var(--green-strong)]'
                  : isWrongPick
                    ? 'border-[#e5484d] bg-[color-mix(in_srgb,#e5484d_12%,transparent)] text-[#e5484d]'
                    : selected === i
                      ? 'border-[var(--green-strong)] text-[var(--text)]'
                      : 'border-[var(--border)] text-[var(--text)]'
              }`}
            >
              {choice}
            </button>
          )
        })}
      </div>
      {submitted ? (
        <p
          className={`mt-2 text-[13px] font-medium ${
            selected === quiz.answer
              ? 'text-[var(--green-strong)]'
              : 'text-[#e5484d]'
          }`}
        >
          {selected === quiz.answer
            ? `ตอบถูก! ได้ +${points} แต้ม`
            : 'ตอบผิด ลองใหม่พรุ่งนี้นะครับ'}
        </p>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-3 min-h-11 w-full cursor-pointer rounded-xl bg-[var(--green-strong)] text-[14px] font-semibold text-white disabled:opacity-40"
        >
          ยืนยันคำตอบ
        </button>
      )}
    </li>
  )
}

function GamePage() {
  const { state, completeMission } = useGameState()
  const { current, next } = getLevelInfo(state.points)
  const StageIcon = STAGE_ICONS[current.level - 1]
  const progressPct = next
    ? Math.round(
        ((state.points - current.minPoints) /
          (next.minPoints - current.minPoints)) *
          100
      )
    : 100

  const board = [...LEADERBOARD]
    .map((p) => (p.isMe ? { ...p, points: state.points } : p))
    .sort((a, b) => b.points - a.points)

  return (
    <VillageLayout title="ภารกิจ / เกม" backTo="/village">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--badge-bg)] text-[var(--green-strong)]">
              <StageIcon size={28} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-[var(--muted)]">
                เลเวล {current.level} · {current.rank}
              </p>
              <p className="truncate text-[16px] font-bold text-[var(--text)]">
                นาข้าวเสมือน: {current.stage}
              </p>
            </div>
            <p className="shrink-0 text-[17px] font-bold text-[var(--green-strong)] tabular-nums">
              {formatNumber(state.points)}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div
                className="h-full rounded-full bg-[var(--green-strong)]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="shrink-0 text-[11.5px] text-[var(--muted)]">
              {next
                ? `อีก ${formatNumber(next.minPoints - state.points)} แต้ม เลเวล ${next.level}`
                : 'เลเวลสูงสุด'}
            </span>
          </div>
        </section>

        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            ภารกิจวันนี้
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {DAILY_MISSIONS.map((m) => {
              const done = state.completedToday.includes(m.id)
              if (m.id === 'quiz') {
                return (
                  <QuizMission
                    key={m.id}
                    points={m.points}
                    done={done}
                    onComplete={() => completeMission(m.id, m.points)}
                  />
                )
              }
              return (
                <li
                  key={m.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <button
                    type="button"
                    disabled={done}
                    onClick={() => completeMission(m.id, m.points)}
                    className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)] disabled:cursor-default"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                        done
                          ? 'border-[var(--green-strong)] bg-[var(--green-strong)] text-white'
                          : 'border-[var(--border)] text-transparent'
                      }`}
                    >
                      <CheckCircle2 size={18} />
                    </span>
                    <span
                      className={`min-w-0 flex-1 text-[14.5px] ${
                        done
                          ? 'text-[var(--muted)] line-through'
                          : 'text-[var(--text)]'
                      }`}
                    >
                      {m.title}
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold text-[var(--green-strong)]">
                      +{m.points}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <p className="mb-2 flex items-center gap-1.5 text-[15px] font-bold text-[var(--text)]">
            <Trophy size={17} className="text-[var(--gold)]" />
            อันดับในศูนย์ข้าว
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {board.map((p, i) => (
              <li
                key={p.id}
                className={`flex min-h-14 items-center gap-3 border-b border-[var(--border)] px-4 last:border-0 ${
                  p.isMe ? 'bg-[var(--badge-bg)]' : ''
                }`}
              >
                <span className="w-5 shrink-0 text-center text-[13px] font-bold text-[var(--muted)]">
                  {i + 1}
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-[14px] ${
                    p.isMe
                      ? 'font-bold text-[var(--green-strong)]'
                      : 'text-[var(--text)]'
                  }`}
                >
                  {p.isMe ? `${p.name} (คุณ)` : p.name}
                </span>
                <span className="shrink-0 text-[13.5px] font-semibold text-[var(--text)] tabular-nums">
                  {formatNumber(p.points)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </VillageLayout>
  )
}

export default GamePage
