import { useRef, useState } from 'react'

export default function Row({ label, titles, onSelect, myList, onToggleList }) {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.85 * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
    setTimeout(updateEdges, 400)
  }

  if (!titles || titles.length === 0) return null

  return (
    <section className="row">
      <h2 className="row__label">{label}</h2>
      <div className="row__viewport">
        {!atStart && (
          <button className="row__arrow row__arrow--left" onClick={() => scrollBy(-1)} aria-label="Scroll left">
            ‹
          </button>
        )}
        <div className="row__track" ref={trackRef} onScroll={updateEdges}>
          {titles.map((t) => (
            <article className="card" key={t.id} onClick={() => onSelect(t)}>
              <div className="card__poster-wrap">
                <img src={t.poster} alt={t.title} loading="lazy" />
                <div className="card__hover">
                  <div className="card__hover-top">
                    <img src={t.backdrop} alt="" className="card__hover-bg" />
                    <div className="card__hover-actions">
                      <button
                        className="card__icon-btn card__icon-btn--play"
                        onClick={(e) => { e.stopPropagation(); onSelect(t) }}
                        aria-label="Play"
                      >
                        ▶
                      </button>
                      <button
                        className="card__icon-btn"
                        onClick={(e) => { e.stopPropagation(); onToggleList(t) }}
                        aria-label="Add to My List"
                      >
                        {myList.some((m) => m.id === t.id) ? '✓' : '+'}
                      </button>
                      <button
                        className="card__icon-btn card__icon-btn--info"
                        onClick={(e) => { e.stopPropagation(); onSelect(t) }}
                        aria-label="More info"
                      >
                        ⌄
                      </button>
                    </div>
                  </div>
                  <div className="card__hover-info">
                    <span className="card__match">{t.match}% Match</span>
                    <div className="card__tags">
                      {t.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!atEnd && (
          <button className="row__arrow row__arrow--right" onClick={() => scrollBy(1)} aria-label="Scroll right">
            ›
          </button>
        )}
      </div>
    </section>
  )
}
