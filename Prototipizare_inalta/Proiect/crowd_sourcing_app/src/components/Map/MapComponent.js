import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../stylesheets/popupStyles.css';
import {useMapEvents } from 'react-leaflet';

// Dynamic icon creation based on category
const createCustomIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const MapComponent = ({ markers, onMapClick, onMarkerClick }) => {
  const initialCoords = [46.7712, 23.6236]; // Default center (Cluj-Napoca, Romania)
  const [activePopup, setActivePopup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [center, setCenter] = useState(initialCoords);
  const [zoom, setZoom] = useState(15);

  // Function to handle search input and geocoding
  const handleSearch = async () => {
    if (!searchQuery) return;
  
    try {
      // Prepend "Cluj-Napoca" to the search query
      const fullQuery = `Cluj-Napoca, ${searchQuery}`;
  
      // Call OpenStreetMap Nominatim API to get lat, lon for the address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}`
      );
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0]; // Get the first result
        setCenter([parseFloat(lat), parseFloat(lon)]); // Set the map center to the found coordinates
        setZoom(18); // Set zoom to maximum (street level)
      } else {
        alert('Address not found!');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };
  
  

  // Custom hook to update the map view when center or zoom changes
  const MapViewUpdater = () => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick(e);
        setActivePopup(null);
      },
    });
    return null;
  };

  const handleMarkerClick = (marker) => {
    setActivePopup(marker);
    onMarkerClick(marker);
  };

  // Icon mapping for categories
  const iconMap = {
    Infrastructura: require('../../assets/infr_mark.png'),
    Social: require('../../assets/social_mark.png'),
    Circulatie: require('../../assets/road_mark.png'),
    Siguranta: require('../../assets/health_mark.png'),
  };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
      <input
  type="text"
  placeholder="Enter street and number"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    padding: '10px',
    borderRadius: '5px',
    width: '300px',
    fontSize: '16px',
  }}
/>

        <button
          onClick={handleSearch}
          style={{
            padding: '10px',
            marginLeft: '5px',
            borderRadius: '5px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <MapViewUpdater />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon(iconMap[marker.category] || require('../../assets/mark.png'))}
          >
            <Popup open={activePopup === marker} onClose={() => setActivePopup(null)}>
              <div className="popup-content">
                <strong>Descriere:</strong> {marker.description} <br />
                <strong>Stare:</strong> {marker.status} <br />
                <strong>Locație:</strong> {marker.address || 'Adresa necunoscută'} <br />
                <strong>Creat La:</strong> {marker.date} <br />
                <strong>Tip:</strong> {marker.category} <br /> {/* Display the category (type) */}
                <button
                  className="marker-details-button"
                  onClick={() => handleMarkerClick(marker)}
                >
                  Vezi Soluții
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
