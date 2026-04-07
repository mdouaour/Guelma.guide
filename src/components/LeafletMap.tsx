'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet-icons/marker-icon-2x.png',
  iconUrl: '/leaflet-icons/marker-icon.png',
  shadowUrl: '/leaflet-icons/marker-shadow.png',
})

interface Landmark {
  name: string
  lat: number
  lng: number
  category: string
}

interface LeafletMapProps {
  landmarks: Landmark[]
  onMarkerClick?: (landmark: Landmark) => void
}

export default function LeafletMap({ landmarks, onMarkerClick }: LeafletMapProps) {
  return (
    <MapContainer
      center={[36.4621, 7.4247]}
      zoom={13}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {landmarks.map((lm) => (
        <Marker
          key={`${lm.lat}-${lm.lng}`}
          position={[lm.lat, lm.lng]}
          eventHandlers={{ click: () => onMarkerClick?.(lm) }}
        >
          <Popup>
            <strong>{lm.name}</strong>
            <br />
            <span style={{ fontSize: '12px', color: '#555' }}>{lm.category}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
