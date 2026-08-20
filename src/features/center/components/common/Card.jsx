export function Card({
  title,
  titleAction,
  children,
  className = '',
  ...rest
}) {
  return (
    <div className={`c-card ${className}`} {...rest}>
      {title && (
        <div className="c-card__header">
          <h3 className="c-card__title">{title}</h3>
          {titleAction}
        </div>
      )}
      <div className="c-card__body">{children}</div>
    </div>
  )
}
