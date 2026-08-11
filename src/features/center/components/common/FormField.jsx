export function FieldWrapper({ label, required, className = '', children }) {
  return (
    <label className={`c-field ${className}`}>
      <span className="c-field__label">
        {label}
        {required && <span className="c-field__required"> *</span>}
      </span>
      {children}
    </label>
  )
}

export function TextInput({ label, required, className, ...inputProps }) {
  return (
    <FieldWrapper label={label} required={required} className={className}>
      <input className="c-input" {...inputProps} />
    </FieldWrapper>
  )
}

export function SelectInput({
  label,
  required,
  className,
  options,
  ...selectProps
}) {
  return (
    <FieldWrapper label={label} required={required} className={className}>
      <select className="c-select" {...selectProps}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
