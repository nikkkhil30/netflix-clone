import { useEffect } from 'react'

export default function MovieModal({ title, onClose, myList, onToggleList }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!title) return null

  const inList = myList.some((m) => m.id === title.id)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__banner" style={{ backgroundImage: `url(${title.backdrop})` }}>
          <div className="modal__banner-fade" />
          <div className="modal__banner-content">
            <h2>{title.title}</h2>
            <div className="modal__actions">
              <button className="btn btn--play btn--sm">▶ Play</button>
              <button
                className="icon-circle"
                onClick={() => onToggleList(title)}
                aria-label="Add to My List"
              >
                {inList ? '✓' : '+'}
              </button>
              <button className="icon-circle" aria-label="Like">👍</button>
            </div>
          </div>
        </div>

        <div className="modal__body">
          <div className="modal__body-main">
            <div className="modal__meta">
              <span className="hero__match">{title.match}% Match</span>
              <span>{title.year}</span>
              <span className="hero__tag">{title.maturity}</span>
              <span>{title.seasons ? `${title.seasons} Seasons` : `${title.runtime}m`}</span>
            </div>
            <p className="modal__synopsis">{title.synopsis}</p>
          </div>
          <div className="modal__body-side">
            <p><span>Genre:</span> {title.genre}</p>
            <p><span>Tags:</span> {title.tags.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
