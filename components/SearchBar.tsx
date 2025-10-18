"use client"
import { useEffect, useMemo, useState } from 'react'

type Suggestion = { id: string; name: string }

export default function SearchBar({ onSelect }: { onSelect?: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      if (!query.trim()) { setSuggestions([]); return }
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      if (!res.ok) return
      const data: Suggestion[] = await res.json()
      setSuggestions(data)
      setActive(0)
    }
    const id = setTimeout(run, 150)
    return () => { clearTimeout(id); controller.abort() }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && suggestions[active]) { onSelect?.(suggestions[active].id) }
  }

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">Search products</label>
      <input id="search" className="input" placeholder="Search for milk, apples, pasta…" value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={handleKeyDown} aria-autocomplete="list" aria-controls="search-suggestions"/>
      {suggestions.length>0 && (
        <ul id="search-suggestions" role="listbox" className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-soft">
          {suggestions.map((s, i) => (
            <li key={s.id} role="option" aria-selected={i===active}>
              <button className={`block w-full text-left px-3 py-2 hover:bg-cream ${i===active?'bg-butter':''}`} onMouseEnter={()=>setActive(i)} onClick={()=>onSelect?.(s.id)}>
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
