'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, User } from 'lucide-react'

interface CityResult {
  name: string
  postalCode: string
  slug: string
  count: number
  departmentName: string
}

interface NurseResult {
  rpps: string
  firstName: string
  lastName: string
  city: string
  postalCode: string
}

export default function SearchBar({
  placeholder = 'Ville, code postal ou nom...',
  defaultValue = '',
  size = 'lg',
}: {
  placeholder?: string
  defaultValue?: string
  size?: 'sm' | 'lg'
}) {
  const [query, setQuery] = useState(defaultValue)
  const [cities, setCities] = useState<CityResult[]>([])
  const [nurses, setNurses] = useState<NurseResult[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>(null)

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setCities([])
      setNurses([])
      setShowDropdown(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setCities(data.cities || [])
        setNurses(data.nurses || [])
        setShowDropdown(true)
      } catch {
        // ignore
      }
      setLoading(false)
    }, 200)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      setShowDropdown(false)
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const isLarge = size === 'lg'
  const hasResults = cities.length > 0 || nurses.length > 0

  return (
    <div ref={wrapperRef} className="w-full relative">
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center bg-white rounded-xl border-2 border-[#E2E8F0] focus-within:border-[#1E88E5] transition-colors shadow-sm ${isLarge ? 'p-1' : ''}`}>
          <Search
            className={`text-[#718096] flex-shrink-0 ${isLarge ? 'ml-4 w-5 h-5' : 'ml-3 w-4 h-4'}`}
          />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => hasResults && setShowDropdown(true)}
            placeholder={placeholder}
            className={`flex-1 bg-transparent outline-none text-[#1A202C] placeholder-[#A0AEC0] ${
              isLarge ? 'px-4 py-3 text-base' : 'px-3 py-2 text-sm'
            }`}
          />
          {loading && (
            <div className="w-5 h-5 border-2 border-[#E2E8F0] border-t-[#1E88E5] rounded-full animate-spin mr-2" />
          )}
          <button
            type="submit"
            style={{ backgroundColor: '#1565C0', color: '#ffffff' }}
            className={`!bg-[#1565C0] hover:!bg-[#0D47A1] !text-white font-bold rounded-xl transition-colors flex-shrink-0 shadow-md ${
              isLarge ? 'px-8 py-3.5 text-base' : 'px-5 py-2.5 text-sm'
            }`}
          >
            Rechercher
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {/* Cities */}
          {cities.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-[#F7FAFC] text-xs font-semibold text-[#718096] uppercase tracking-wide">
                Villes
              </div>
              {cities.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => {
                    setShowDropdown(false)
                    router.push(`/ville/${city.slug}`)
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#EBF5FB] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#1E88E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#1A202C] font-medium text-sm">{city.name}</div>
                    <div className="text-[#718096] text-xs">{city.postalCode} · {city.departmentName}</div>
                  </div>
                  <span className="text-xs text-[#1E88E5] font-semibold bg-[#E3F2FD] px-2 py-0.5 rounded-full">
                    {city.count} IDEL
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Nurses */}
          {nurses.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-[#F7FAFC] text-xs font-semibold text-[#718096] uppercase tracking-wide">
                Infirmiers
              </div>
              {nurses.map((nurse) => (
                <button
                  key={nurse.rpps}
                  onClick={() => {
                    setShowDropdown(false)
                    router.push(`/infirmier/${nurse.rpps}`)
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#EBF5FB] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#1E88E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#1A202C] font-medium text-sm">{nurse.firstName} {nurse.lastName}</div>
                    <div className="text-[#718096] text-xs">{nurse.city} ({nurse.postalCode})</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
