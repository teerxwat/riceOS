import { Check } from 'lucide-react'

export function StepIndicator({ steps, currentStep }) {
  return (
    <div className="c-steps">
      {steps.map((step, index) => {
        const stepNo = index + 1
        const isDone = stepNo < currentStep
        const isActive = stepNo === currentStep
        return (
          <div key={step.label} className="c-step">
            <div className="c-step__col">
              <div
                className={`c-step__circle ${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''}`}
              >
                {isDone ? <Check size={16} /> : stepNo}
              </div>
              <span
                className={`c-step__label ${isActive || isDone ? 'is-current' : ''}`}
              >
                {step.label}
              </span>
            </div>
            {stepNo < steps.length && (
              <div className={`c-step__connector ${isDone ? 'is-done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
