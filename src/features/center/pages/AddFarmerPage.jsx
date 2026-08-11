import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, PlusCircle } from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { StepIndicator } from '../components/common/StepIndicator.jsx'
import { StepMember } from '../components/farmer/StepMember.jsx'
import { StepPlots } from '../components/farmer/StepPlots.jsx'
import { StepPlotLocation } from '../components/farmer/StepPlotLocation.jsx'
import { StepDocuments } from '../components/farmer/StepDocuments.jsx'
import { initialFarmerForm } from '../utils/farmerForm'
import { createFarmer } from '../api/farmers'
import '../styles/farmer.css'

const STEPS = [
  { label: 'ข้อมูลสมาชิก' },
  { label: 'ข้อมูลแปลงนา' },
  { label: 'กำหนดตำแหน่งแปลงนา' },
  { label: 'เอกสารและบันทึก' },
]

export function AddFarmerPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialFarmerForm)
  const [draftSavedAt, setDraftSavedAt] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [savedFarmerId, setSavedFarmerId] = useState(null)

  const checklist = useMemo(
    () => [
      {
        label: 'ข้อมูลบัตรประชาชนครบถ้วน',
        done: Boolean(
          form.member.nationalId &&
          form.member.firstName &&
          form.member.lastName
        ),
      },
      {
        label: 'ข้อมูลแปลงนาอย่างน้อย 1 แปลง',
        done:
          form.plots.every((p) => p.location && p.areaRai !== '') &&
          form.plots.length > 0,
      },
      {
        label: 'ระบุตำแหน่งแปลงนาครบทุกแปลง',
        done: form.plotLocations.every((l) => l.province),
      },
      {
        label: 'แนบสำเนาบัตรประชาชนและเอกสารสิทธิ์ที่ดิน',
        done:
          form.files.some((f) => f.category === 'id_card') &&
          form.files.some((f) => f.category === 'land_deed'),
      },
    ],
    [form]
  )

  function handleSaveDraft() {
    setDraftSavedAt(
      new Date().toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    )
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await createFarmer(form)
      setSavedFarmerId(res.farmerId ?? 0)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
      )
    } finally {
      setSubmitting(false)
    }
  }

  function handleStartNew() {
    setForm(initialFarmerForm())
    setStep(1)
    setSavedFarmerId(null)
    setDraftSavedAt(null)
  }

  if (savedFarmerId !== null) {
    return (
      <>
        <Topbar
          title="เพิ่มเกษตรกร"
          subtitle="บันทึกข้อมูลสมาชิกเรียบร้อยแล้ว"
        />
        <div className="cf-success">
          <div className="cf-success-card">
            <CheckCircle2 size={40} color="var(--c-emerald)" />
            <p className="cf-success-title">บันทึกข้อมูลสมาชิกสำเร็จ</p>
            <p className="cf-success-desc">
              {form.member.prefix}
              {form.member.firstName} {form.member.lastName}{' '}
              ถูกเพิ่มเข้าศูนย์เรียบร้อยแล้ว
              {savedFarmerId > 0 && ` (รหัสสมาชิก #${savedFarmerId})`}
            </p>
            <button
              type="button"
              onClick={handleStartNew}
              className="c-btn c-btn--primary"
            >
              <PlusCircle size={15} /> เพิ่มเกษตรกรรายใหม่
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Topbar
        title="เพิ่มเกษตรกร (ชาวนา) เข้าศูนย์"
        subtitle="กรอกข้อมูลให้น้อยที่สุด เร็วที่สุด — ข้อมูลนี้จะถูกบันทึกลงฐานข้อมูลจริง"
      />
      <div className="c-content">
        <div className="cf-wizard">
          <StepIndicator steps={STEPS} currentStep={step} />

          {step === 1 && (
            <StepMember
              member={form.member}
              onChange={(member) => setForm({ ...form, member })}
            />
          )}

          {step === 2 && (
            <StepPlots
              plots={form.plots}
              onChangePlots={(plots) => setForm({ ...form, plots })}
              cultivation={form.cultivation}
              onChangeCultivation={(cultivation) =>
                setForm({ ...form, cultivation })
              }
            />
          )}

          {step === 3 && (
            <StepPlotLocation
              plots={form.plots}
              plotLocations={form.plotLocations}
              onChange={(plotLocations) => setForm({ ...form, plotLocations })}
            />
          )}

          {step === 4 && (
            <StepDocuments
              files={form.files}
              onFilesChange={(files) => setForm({ ...form, files })}
              checklist={checklist}
              submitting={submitting}
              submitError={submitError}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          )}

          <div className="cf-nav">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="c-btn c-btn--outline"
            >
              <ArrowLeft size={15} /> ย้อนกลับ
            </button>

            <span className="cf-nav-hint">
              {draftSavedAt
                ? `บันทึกร่างล่าสุด ${draftSavedAt} น.`
                : 'ยังไม่มีการบันทึกร่าง'}
            </span>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                className="c-btn c-btn--primary"
              >
                ถัดไป <ArrowRight size={15} />
              </button>
            ) : (
              <span style={{ width: '6rem' }} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
