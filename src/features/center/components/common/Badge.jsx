export function Badge({ tone = 'gray', children, className = '' }) {
  return (
    <span className={`c-badge c-badge--${tone} ${className}`}>{children}</span>
  )
}
