"use client"
import { useEffect, useState } from 'react'

const slides = [
  { id: 'deals', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?q=80&w=1600&auto=format&fit=crop', title: 'Weekly Deals', subtitle: 'Save up to 30% on pantry favorites' },
  { id: 'produce', image: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?q=80&w=1600&auto=format&fit=crop', title: 'Seasonal Produce', subtitle: 'Fresh, local, and colorful' },
  { id: 'delivery', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?q=80&w=1600&auto=format&fit=crop', title: 'Fast Delivery', subtitle: 'Same-day delivery available' },
]

export default function Carousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative overflow-hidden rounded-xl h-56 sm:h-72 md:h-96 card" aria-roledescription="carousel" aria-label="Promotions">
      <div className="absolute inset-0 flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s) => (
          <div key={s.id} className="min-w-full relative">
            <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
              <h3 className="text-2xl font-bold">{s.title}</h3>
              <p className="text-sm opacity-90">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Select slide">
        {slides.map((s, i) => (
          <button key={s.id} aria-label={`Go to ${s.title}`} aria-selected={i===index} className={`h-2.5 w-2.5 rounded-full ${i===index? 'bg-white' : 'bg-white/50'}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  )
}
