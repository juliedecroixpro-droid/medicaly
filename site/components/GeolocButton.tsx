'use client'

import { useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

export default function GeolocButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGeoloc() {
    if (!navigator.geolocation) {
      setError('Geolocalisation non supportee par votre navigateur')
      return
    }
    setLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'fr' } }
          )
          const data = await res.json()
          const postcode = data?.address?.postcode
          if (postcode) {
            window.location.href = `/recherche?q=${postcode}`
          } else {
            setError('Impossible de determiner votre ville')
          }
        } catch {
          setError('Erreur lors de la geolocalisation')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Geolocalisation refusee')
        setLoading(false)
      },
      { timeout: 10000 }
    )
  }

  return (
    <div>
      <button
        onClick={handleGeoloc}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-xl transition-colors border border-white/30 text-sm disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4" />
        )}
        {loading ? 'Localisation en cours...' : 'IDEL pres de chez moi'}
      </button>
      {error && <p className="text-red-200 text-xs mt-2">{error}</p>}
    </div>
  )
}
