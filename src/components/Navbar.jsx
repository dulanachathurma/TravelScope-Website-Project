export default function Navbar({ page, goTo }) {
  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => window.open('mailto:dulanachathurma99@gmail.com', '_blank')}
        title="Email Us"
      >
        TravelScope
      </div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${page === 'home' ? 'active' : ''}`}
          onClick={() => goTo('home')}
        >
          <span>🏠</span>
          <span>Home</span>
        </button>
        <button
          className={`nav-btn ${page === 'search' ? 'active' : ''}`}
          onClick={() => goTo('search')}
        >
          <span>🔍</span>
          <span>Explore</span>
        </button>
      </div>
    </nav>
  )
}
