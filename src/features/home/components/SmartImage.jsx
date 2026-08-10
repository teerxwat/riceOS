import { useState } from 'react'

// รูปที่มี skeleton ระหว่างโหลด + fallback สวยๆ ถ้ารูปเสีย (หน้าไม่พัง)
export default function SmartImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div
      className={`smart-img ${className}${loaded ? ' is-loaded' : ''}${
        error ? ' is-error' : ''
      }`}
    >
      {error ? (
        <div className="smart-img-fallback">🌾</div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
