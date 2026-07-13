export default function Hero({ title, onPlay, onMoreInfo }) {
  if (!title) return null

  return (
    <section className="hero" style={{ backgroundImage: `url(${title.backdrop})` }}>
      <div className="hero__vignette" />
      <div className="hero__content">
        <p className="hero__eyebrow">{title.seasons ? 'N SERIES' : 'FILM'}</p>
        <h1 className="hero__title">{title.title}</h1>
        <div className="hero__meta">
          <span className="hero__match">{title.match}% Match</span>
          <span>{title.year}</span>
          <span className="hero__tag">{title.maturity}</span>
          <span>{title.seasons ? `${title.seasons} Seasons` : `${title.runtime}m`}</span>
        </div>
        <p className="hero__synopsis">{title.synopsis}</p>
        <div className="hero__actions">
          <button className="btn btn--play" onClick={() => onPlay(title)}>
            <span>▶</span> Play
          </button>
          <button className="btn btn--info" onClick={() => onMoreInfo(title)}>
            <span>ⓘ</span> More Info
          </button>
        </div>
      </div>
    </section>
  )
}
