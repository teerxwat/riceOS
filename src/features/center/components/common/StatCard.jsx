export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  deltaLabel,
  deltaTone = 'neutral',
}) {
  return (
    <div className="c-stat">
      <div className="c-stat__top">
        {Icon && (
          <span className="c-stat__icon">
            <Icon size={16} />
          </span>
        )}
        <span className="c-stat__label">{label}</span>
      </div>
      <div className="c-stat__value-row">
        <span className="c-stat__value">{value}</span>
        {unit && <span className="c-stat__unit">{unit}</span>}
      </div>
      {deltaLabel && (
        <span className={`c-stat__delta c-stat__delta--${deltaTone}`}>
          {deltaLabel}
        </span>
      )}
    </div>
  )
}
