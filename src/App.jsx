import { useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Row from './components/Row.jsx'
import MovieModal from './components/MovieModal.jsx'
import { CATALOG, GENRES, FEATURED, ALL_TITLES } from './data/movies.js'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeLink, setActiveLink] = useState('Home')
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [myList, setMyList] = useState([])

  const toggleList = (title) => {
    setMyList((prev) =>
      prev.some((m) => m.id === title.id)
        ? prev.filter((m) => m.id !== title.id)
        : [title, ...prev]
    )
  }

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null
    const q = searchTerm.trim().toLowerCase()
    return ALL_TITLES.filter(
      (t) => t.title.toLowerCase().includes(q) || t.genre.toLowerCase().includes(q)
    )
  }, [searchTerm])

  const handleNavClick = (link) => {
    setActiveLink(link)
    setSearchTerm('')
  }

  const showMyList = activeLink === 'My List' && !searchResults

  return (
    <div className="app">
      <Navbar
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        activeLink={activeLink}
        onNavClick={handleNavClick}
      />

      {searchResults ? (
        <main className="search-view">
          <h2 className="row__label">
            {searchResults.length > 0
              ? `Results for "${searchTerm}"`
              : `No results found for "${searchTerm}"`}
          </h2>
          <div className="search-grid">
            {searchResults.map((t) => (
              <article className="card card--grid" key={t.id} onClick={() => setSelectedTitle(t)}>
                <img src={t.poster} alt={t.title} loading="lazy" />
                <div className="card--grid__caption">
                  <p>{t.title}</p>
                  <span>{t.match}% Match · {t.year}</span>
                </div>
              </article>
            ))}
          </div>
        </main>
      ) : showMyList ? (
        <main className="search-view">
          <h2 className="row__label">My List</h2>
          {myList.length === 0 ? (
            <p className="empty-state">Titles you add will show up here. Hit the “+” on any card to save it.</p>
          ) : (
            <div className="search-grid">
              {myList.map((t) => (
                <article className="card card--grid" key={t.id} onClick={() => setSelectedTitle(t)}>
                  <img src={t.poster} alt={t.title} loading="lazy" />
                  <div className="card--grid__caption">
                    <p>{t.title}</p>
                    <span>{t.match}% Match · {t.year}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      ) : (
        <main>
          <Hero title={FEATURED} onPlay={setSelectedTitle} onMoreInfo={setSelectedTitle} />
          <div className="rows">
            {myList.length > 0 && (
              <Row
                label="My List"
                titles={myList}
                onSelect={setSelectedTitle}
                myList={myList}
                onToggleList={toggleList}
              />
            )}
            {GENRES.map((g) => (
              <Row
                key={g.key}
                label={g.label}
                titles={CATALOG[g.key]}
                onSelect={setSelectedTitle}
                myList={myList}
                onToggleList={toggleList}
              />
            ))}
          </div>
          <footer className="footer">
            <p>This is a fan-made, frontend-only clone built for demonstration purposes and is not affiliated with Netflix.</p>
          </footer>
        </main>
      )}

      <MovieModal
        title={selectedTitle}
        onClose={() => setSelectedTitle(null)}
        myList={myList}
        onToggleList={toggleList}
      />
    </div>
  )
}
