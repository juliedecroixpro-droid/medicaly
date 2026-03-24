'use client'

import { useEffect, useRef, useState } from 'react'

interface LeafletMapProps {
  cityName: string
  postalCode: string
  nurseCount: number
}

export default function LeafletMap({ cityName, postalCode, nurseCount }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let cancelled = false

    async function init() {
      try {
        // Geocode city using Nominatim
        const query = encodeURIComponent(`${cityName} ${postalCode} France`)
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=fr`,
          { headers: { 'Accept-Language': 'fr' } }
        )
        const data = await resp.json() as Array<{ lat: string; lon: string }>

        if (cancelled || !mapRef.current) return

        if (!data.length) {
          setError(true)
          return
        }

        const lat = parseFloat(data[0].lat)
        const lon = parseFloat(data[0].lon)

        // Dynamic import of leaflet to avoid SSR issues
        const L = (await import('leaflet')).default
        await import('leaflet/dist/leaflet.css')

        if (cancelled || !mapRef.current) return

        // Fix default icon paths broken by webpack
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })

        const map = L.map(mapRef.current).setView([lat, lon], 13)
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map)

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(
            `<strong>${cityName}</strong><br/>${nurseCount} infirmier${nurseCount > 1 ? 's' : ''} libéral${nurseCount > 1 ? 'aux' : ''}`
          )
          .openPopup()
      } catch {
        if (!cancelled) setError(true)
      }
    }

    init()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstanceRef.current as any).remove()
        mapInstanceRef.current = null
      }
    }
  }, [cityName, postalCode, nurseCount])

  if (error) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 overflow-hidden mb-8">
      <div className="px-5 py-3 border-b border-[#E2E8F0] dark:border-gray-700">
        <h2 className="text-base font-bold text-[#1A202C] dark:text-gray-100">
          Localisation - {cityName}
        </h2>
      </div>
      <div ref={mapRef} style={{ height: '320px', width: '100%' }} />
    </div>
  )
}
