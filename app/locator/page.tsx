"use client"
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })

const stores = [
  { id: 'downtown', name: 'FreshCart Downtown', lat: 37.7749, lng: -122.4194, address: '123 Market St, San Francisco, CA' },
  { id: 'sunset', name: 'FreshCart Sunset', lat: 37.7549, lng: -122.4944, address: '456 Sunset Blvd, San Francisco, CA' },
]

export default function LocatorPage() {
  const [active, setActive] = useState('downtown')
  const center = useMemo(() => {
    const s = stores.find(s => s.id === active)!
    return { lat: s.lat, lng: s.lng }
  }, [active])

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card overflow-hidden">
        <Map center={center} markers={stores.map(s => ({ id: s.id, position: { lat: s.lat, lng: s.lng }, label: s.name }))} onMarkerClick={(id)=>setActive(id)} />
      </div>
      <aside className="space-y-3">
        {stores.map(s => (
          <button key={s.id} onClick={()=>setActive(s.id)} className={`card p-3 text-left w-full ${active===s.id?'ring-2 ring-leaf':''}`} aria-pressed={active===s.id}>
            <div className="font-medium">{s.name}</div>
            <div className="text-sm text-gray-600">{s.address}</div>
          </button>
        ))}
      </aside>
    </div>
  )
}
