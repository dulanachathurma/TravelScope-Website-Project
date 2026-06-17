import { useState } from 'react'
import { provincesData, placesData } from '../data/placesData'
import PlaceCard from './PlaceCard'
import Footer from './Footer'

export default function SearchPage({ darkMode, toggleDark, onPlaceClick }) {
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [results, setResults] = useState(null)

  const districts = province ? (provincesData[province] || []) : []

  const handleSearch = () => {
    if (province && district && placesData[district]) {
      setResults({ district, places: placesData[district] })
    }
  }

  return (
    <div className="search-page">
      <div className="search-hero">
        <h1>Explore <span>Sri Lanka</span></h1>
        <p>Select a province and district to discover amazing destinations</p>

        <div className="search-controls">
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

        <div className="search-btn-wrap">
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={!province || !district}
          >
            🔍 Search Places
          </button>
        </div>
      </div>

      {results && (
        <div className="results-section">
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

      {!results && (
        <div className="no-results">
          <div className="no-results-icon">🌴</div>
          <h3>Choose a destination above</h3>
          <p>Select a province and district to explore Sri Lanka's beautiful places</p>
        </div>
      )}

      <Footer />
    </div>
  )
}
