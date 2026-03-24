'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchResult {
  type: 'city' | 'nurse'
  label: string
  sub: string
  href: string
}

export default function HeaderSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
        }
      } catch { /* ignore */ }
    }, 200)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery('')
    setResults([])
    router.push(href)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-[#718096] hover:text-[#1E88E5] transition-colors"
        aria-label="Rechercher"
      >
        <Search className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="absolute inset-x-0 top-0 h-16 bg-white z-50 flex items-center px-4 border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-6xl mx-auto w-full flex items-center gap-3">
        <Search className="w-5 h-5 text-[#718096] flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher une ville, un infirmier..."
          className="flex-1 text-sm outline-none text-[#1A202C] placeholder-[#A0AEC0]"
          onKeyDown={e => {
            if (e.key === 'Escape') { setOpen(false); setQuery(''); setResults([]) }
            if (e.key === 'Enter' && query.length >= 2) {
              setOpen(false)
              router.push(`/recherche?q=${encodeURIComponent(query)}`)
            }
          }}
        />
        <button
          onClick={() => { setOpen(false); setQuery(''); setResults([]) }}
          className="p-1 text-[#718096] hover:text-[#1A202C]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-lg max-h-80 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-2">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => handleSelect(r.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7FAFC] rounded-lg text-left transition-colors"
              >
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  r.type === 'city' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {r.type === 'city' ? 'Ville' : 'IDEL'}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#1A202C] truncate">{r.label}</div>
                  <div className="text-xs text-[#718096] truncate">{r.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
