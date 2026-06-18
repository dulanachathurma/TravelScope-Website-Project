const FALLBACK = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'

export default function PlaceCard({ place, onPlaceClick }) {
  return (
   <div className="place-card">
      <div className="place-img-wrap">
        <img
          className="place-img"
          src={place.image}
          alt={place.name}
          loading="lazy"
          onError={e => { e.target.onerror = null; e.target.src = FALLBACK }}
        />
      </div>
      <div className="place-body">
        <h3 className="place-name">{place.name}</h3>
        <p className="place-desc">{place.description}</p>
        {place.address && (
          <p className="place-address">📍 {place.address}</p>
        )}
       <button className="place-map-btn" onClick={() => onPlaceClick(place)}>🗺️ View Location </button>
      </div>
    </div>
  )
}
