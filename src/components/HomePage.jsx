import { useState, useEffect } from 'react'
import { carouselImages, provincesData, placesData } from '../data/placesData'
import PlaceCard from './PlaceCard'
import Footer from './Footer'

const PROFILE_FALLBACK = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'

export default function HomePage({ goTo, darkMode, toggleDark, onPlaceClick }) {
  const [slide, setSlide] = useState(0)
  const [now, setNow] = useState(new Date())
  const [uploads, setUploads] = useState([])
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % carouselImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  const districts = province ? (provincesData[province] || []) : []

  const handleSearch = () => {
    if (province && district && placesData[district]) {
      setResults({ district, places: placesData[district] })
      setTimeout(() => {
        document.getElementById('home-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleUpload = (e) => {
    const files = Array.from(e.target.files)
    const urls = files.map(f => URL.createObjectURL(f))
    setUploads(prev => [...prev, ...urls])
  }

  const fmt = (d) => d.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-bg-overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">🌴 The Pearl of the Indian Ocean</span>
          <h1 className="hero-title">
            <span>Sri Lanka</span>
          </h1>
          <p className="hero-subtitle">Discover Timeless Beauty</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => goTo('search')}>
              Explore Destinations
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Highlights
            </button>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* DATETIME */}
      <div className="datetime-bar">{fmt(now)}</div>

      {/* PROFILE */}
      <section className="profile-section">
        <div className="profile-inner">
          <div className="profile-avatar">
            <img
              src="images/profile/profile_dulana.jpg"
              alt="Travel with Dulana"
              onError={e => { e.target.onerror = null; e.target.src = PROFILE_FALLBACK }}
            />
          </div>
          <div className="profile-text">
            <h2>Travel with Dulana</h2>
            <p>
              Welcome to TravelScope — your guide to the most breathtaking destinations
              across Sri Lanka. From ancient temples to golden beaches, we bring you
              the best of the Pearl of the Indian Ocean.
            </p>
            <div className="profile-socials">
              <a
                className="social-chip youtube"
                href="https://youtube.com/@travelwithdulana"
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ YouTube
              </a>
              <a
                className="social-chip whatsapp"
                href="https://wa.me/94767574844"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp
              </a>
              <a
                className="social-chip facebook"
                href="https://www.facebook.com/share/1EP1Sypxsz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘 Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORT */}
      <div className="transport-bar">
        <div className="transport-item">
          <span className="transport-icon">🚌</span>
          <span className="transport-label">Bus</span>
        </div>
        <a
          className="transport-item"
          href="https://www.railway.gov.lk/web/index.php?lang=en"
          target="_blank"
          rel="noopener noreferrer"
          title="Sri Lanka Railway Timetable"
        >
          <span className="transport-icon">🚆</span>
          <span className="transport-label">Railway</span>
        </a>
        <div className="transport-item">
          <span className="transport-icon">✈️</span>
          <span className="transport-label">Flights</span>
        </div>
        <div className="transport-item">
          <span className="transport-icon">🛥️</span>
          <span className="transport-label">Ferries</span>
        </div>
      </div>

      {/* CAROUSEL */}
      <section className="carousel-section" id="carousel-section">
        <div className="section-header">
          <div className="section-tag">Gallery</div>
          <h2 className="section-title">Sri Lanka's Finest</h2>
        </div>
        <div className="carousel-wrap">
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className={`carousel-slide ${i === slide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img.url})` }}
            >
              <div className="carousel-caption">{img.caption}</div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* QUICK SEARCH */}
      <div className="home-search-strip">
        <div className="section-header">
          <div className="section-tag">Quick Search</div>
          <h2 className="section-title">Find a Destination</h2>
        </div>

        <div className="search-controls" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="control-group">
            <label className="control-label">Province</label>
            <select
              className="control-select"
              value={province}
              onChange={e => { setProvince(e.target.value); setDistrict(''); setResults(null) }}
            >
              <option value="">Choose a Province</option>
              {Object.keys(provincesData).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">District</label>
            <select
              className="control-select"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              disabled={!province}
            >
              <option value="">Choose a District</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Theme</label>
            <div className="theme-toggle-row">
              <label className="toggle-switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDark} />
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
              <span className="toggle-label">{darkMode ? '🌙 Dark' : '☀️ Light'}</span>
            </div>
          </div>
        </div>

        <div className="search-btn-wrap" style={{ marginTop: 24 }}>
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={!province || !district}
          >
            🔍 Search Places
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {results && (
        <div className="results-section" id="home-results">
          <div className="results-header">
            <h2>Discover {results.district}</h2>
            <p>{results.places.length} amazing destinations found</p>
          </div>
          <div className="places-grid">
            {results.places.map(place => (
              <PlaceCard key={place.id} place={place} onPlaceClick={onPlaceClick} />
            ))}
          </div>
        </div>
      )}

      {/* UPLOAD */}
      <section className="upload-section">
        <div className="section-header">
          <div className="section-tag">Community</div>
          <h2 className="section-title">Share Your Journey</h2>
        </div>

        <div
          className="upload-zone"
          onClick={() => document.getElementById('ts-upload').click()}
        >
          <div className="upload-icon-big">📸</div>
          <h3>Upload Your Sri Lanka Photos</h3>
          <p>Share your travel moments with the community</p>
          <div className="upload-btn">Choose Photos</div>
        </div>

        <input
          id="ts-upload"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />

        {uploads.length > 0 && (
          <div className="upload-grid">
            {uploads.map((url, i) => (
              <img key={i} className="upload-thumb" src={url} alt={`Upload ${i + 1}`} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
