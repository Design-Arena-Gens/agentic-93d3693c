"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map({ center, markers, onMarkerClick }: { center: { lat: number, lng: number }, markers: { id: string, position: { lat: number, lng: number }, label: string }[], onMarkerClick?: (id: string) => void }) {
  const pos = [center.lat, center.lng] as [number, number]
  return (
    <MapContainer center={pos} zoom={12} style={{ height: 420, width: '100%' }} aria-label="Store map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(m => (
        <Marker key={m.id} position={[m.position.lat, m.position.lng] as [number, number]} eventHandlers={{ click: () => onMarkerClick?.(m.id) }}>
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
