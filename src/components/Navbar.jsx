import { useEffect, useState, useRef } from 'react'

const NAV_LINKS = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List']

export default function Navbar({ onSearch, searchTerm, activeLink, onNavClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <div className="navbar__left">
        <span className="navbar__logo">CLAUDEFLIX</span>
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`navbar__link ${activeLink === link ? 'navbar__link--active' : ''}`}
              onClick={() => onNavClick(link)}
            >
              {link}
            </button>
          ))}
        </nav>
      </div>

      <div className="navbar__right">
        <div className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}>
          <button
            className="navbar__icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            🔍
          </button>
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
        </div>

        <button className="navbar__icon-btn" aria-label="Notifications">🔔</button>

        <div className="navbar__profile" ref={profileRef}>
          <button className="navbar__profile-btn" onClick={() => setProfileOpen((v) => !v)}>
            <img src="https://picsum.photos/seed/profile-avatar/64/64" alt="Profile avatar" />
            <span className={`navbar__caret ${profileOpen ? 'navbar__caret--up' : ''}`}>▾</span>
          </button>
          {profileOpen && (
            <div className="navbar__dropdown">
              <div className="navbar__dropdown-item">
                <img src="https://picsum.photos/seed/profile-2/64/64" alt="" />
                <span>Guest</span>
              </div>
              <div className="navbar__dropdown-item">
                <img src="https://picsum.photos/seed/profile-3/64/64" alt="" />
                <span>Kids</span>
              </div>
              <hr />
              <div className="navbar__dropdown-row">Manage Profiles</div>
              <div className="navbar__dropdown-row">Account</div>
              <div className="navbar__dropdown-row">Sign out</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
