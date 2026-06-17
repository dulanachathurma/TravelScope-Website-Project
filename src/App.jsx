import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import MapModal from './components/MapModal'
import Snow from './components/Snow'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('ts_dark')
    if (saved) setDarkMode(JSON.parse(saved))

    // Initialize history with home state
    window.history.replaceState({ page: 'home' }, '', window.location.href)
  }, [])

  // Listen for browser back/forward button
  useEffect(() => {
    const handlePop = (e) => {
      // If modal was open, just close it
      if (selectedPlace) {
        setSelectedPlace(null)
        return
      }
      const p = e.state?.page || 'home'
      setPage(p)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [selectedPlace])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('ts_dark', JSON.stringify(next))
  }

  const goTo = (p) => {
    if (p === page) return
    window.history.pushState({ page: p }, '', window.location.href)
    setPage(p)
    setSelectedPlace(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openPlace = (place) => {
    window.history.pushState({ page, modal: true }, '', window.location.href)
    setSelectedPlace(place)
  }

  return (
    <div className={`app-root ${darkMode ? 'dark' : 'light'}`}>
      <Snow />
      <Navbar page={page} goTo={goTo} />

      {page === 'home' ? (
        <HomePage
          goTo={goTo}
          darkMode={darkMode}
          toggleDark={toggleDark}
          onPlaceClick={openPlace}
        />
      ) : (
        <SearchPage
          darkMode={darkMode}
          toggleDark={toggleDark}
          onPlaceClick={openPlace}
        />
      )}

      {selectedPlace && (
        <MapModal place={selectedPlace} onClose={() => window.history.back()} />
      )}
    </div>
  )
}
