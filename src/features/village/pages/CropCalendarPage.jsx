import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import VillageLayout from '../components/VillageLayout'
import { PLOTS, CROP_STAGES, TASK_SCHEDULE } from '../data/villageData'

// mutate PLOTS ในฟังก์ชันนอกคอมโพเนนต์ (ไม่ใช่ตัวแปร `plot` ที่ผูกกับ render)
function toggleTaskDone(plotId, taskId) {
  const plot = PLOTS.find((p) => p.id === plotId)
  if (!plot) return null
  const has = plot.tasksDoneIds.includes(taskId)
  plot.tasksDoneIds = has
    ? plot.tasksDoneIds.filter((t) => t !== taskId)
    : [...plot.tasksDoneIds, taskId]
  return plot.tasksDoneIds
}

function dueLabel(dueInDays) {
  if (dueInDays <= 0) return 'วันนี้'
  return `อีก ${dueInDays} วัน`
}

function CropCalendarPage() {
  const { id } = useParams()
  const plot = PLOTS.find((p) => String(p.id) === id)
  const [doneIds, setDoneIds] = useState(plot?.tasksDoneIds ?? [])

  if (!plot) {
    return (
      <VillageLayout title="ไม่พบแปลงนา" backTo="/village/plots">
        <p className="pt-6 text-center text-[14px] text-[var(--muted)]">
          ไม่พบข้อมูลแปลงนี้ อาจถูกลบไปแล้ว
        </p>
      </VillageLayout>
    )
  }

  const currentStage =
    CROP_STAGES.find(
      (s) => plot.daysGrown >= s.minDay && plot.daysGrown < s.maxDay
    ) ?? CROP_STAGES[CROP_STAGES.length - 1]

  function handleToggle(taskId) {
    const updated = toggleTaskDone(plot.id, taskId)
    if (updated) setDoneIds(updated)
  }

  return (
    <VillageLayout
      title={`ปฏิทินการเพาะปลูก · ${plot.name}`}
      backTo={`/village/plots/${plot.id}`}
    >
      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[13px] text-[var(--muted)]">ระยะตอนนี้</p>
          <p className="text-[19px] font-bold text-[var(--green-strong)]">
            {currentStage.label}
          </p>
          <p className="mt-0.5 text-[12.5px] text-[var(--muted)]">
            อายุข้าว {plot.daysGrown} วัน
          </p>

          <div className="mt-4 flex items-center">
            {CROP_STAGES.map((s, i) => (
              <div key={s.key} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div
                    className={`h-1.5 flex-1 ${i === 0 ? 'invisible' : s.minDay <= currentStage.minDay ? 'bg-[var(--green-strong)]' : 'bg-[var(--border)]'}`}
                  />
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                      s.key === currentStage.key
                        ? 'border-[var(--green-strong)] bg-[var(--green-strong)]'
                        : s.minDay < currentStage.minDay
                          ? 'border-[var(--green-strong)] bg-[var(--green-strong)]'
                          : 'border-[var(--border)] bg-[var(--surface)]'
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 ${i === CROP_STAGES.length - 1 ? 'invisible' : s.minDay < currentStage.minDay ? 'bg-[var(--green-strong)]' : 'bg-[var(--border)]'}`}
                  />
                </div>
                <span
                  className={`mt-1.5 text-center text-[10.5px] ${
                    s.key === currentStage.key
                      ? 'font-bold text-[var(--green-strong)]'
                      : 'text-[var(--muted)]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-[15px] font-bold text-[var(--text)]">
            งานแนะนำล่วงหน้า
          </p>
          <ul className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {TASK_SCHEDULE.map((task) => {
              const done = doneIds.includes(task.id)
              return (
                <li
                  key={task.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(task.id)}
                    className="flex min-h-16 w-full cursor-pointer items-center gap-3 px-4 text-left active:bg-[var(--surface-2)]"
                  >
                    {done ? (
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-[var(--green-strong)]"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="shrink-0 text-[var(--muted)]"
                      />
                    )}
                    <span
                      className={`min-w-0 flex-1 text-[14.5px] ${
                        done
                          ? 'text-[var(--muted)] line-through'
                          : 'text-[var(--text)]'
                      }`}
                    >
                      {task.label}
                    </span>
                    <span className="shrink-0 text-[12.5px] text-[var(--muted)]">
                      {dueLabel(task.dueInDays)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </VillageLayout>
  )
}

export default CropCalendarPage
