import { useEffect } from 'react'

export default function MapModal({ place, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">📍 {place.name}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <iframe
          className="modal-map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(place.location)}&output=embed&z=15`}
          title={place.name}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
