import { NextRequest, NextResponse } from 'next/server'
import { getNursesByCity, getNursesByMetroCity, type Nurse } from '@/lib/data'

// Haversine distance in km
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Paris arrondissement adjacency
const PARIS_ADJACENT: Record<string, string[]> = {
  '75001': ['75002', '75003', '75004', '75006', '75007'],
  '75002': ['75001', '75003', '75009', '75010'],
  '75003': ['75001', '75002', '75004', '75010', '75011'],
  '75004': ['75001', '75003', '75005', '75011', '75012'],
  '75005': ['75004', '75006', '75013', '75014'],
  '75006': ['75001', '75005', '75007', '75014', '75015'],
  '75007': ['75001', '75006', '75008', '75015', '75016'],
  '75008': ['75007', '75009', '75016', '75017'],
  '75009': ['75002', '75008', '75010', '75017', '75018'],
  '75010': ['75002', '75003', '75009', '75011', '75018', '75019'],
  '75011': ['75003', '75004', '75010', '75012', '75019', '75020'],
  '75012': ['75004', '75005', '75011', '75013', '75020'],
  '75013': ['75005', '75012', '75014'],
  '75014': ['75005', '75006', '75013', '75015'],
  '75015': ['75006', '75007', '75014', '75016'],
  '75016': ['75007', '75008', '75015', '75017', '75116'],
  '75017': ['75008', '75009', '75016', '75018', '75116'],
  '75018': ['75009', '75010', '75017', '75019'],
  '75019': ['75010', '75011', '75018', '75020'],
  '75020': ['75011', '75012', '75019'],
  '75116': ['75016', '75017', '75008'],
}

// Geocode using BAN API (French government, fast, no rate limit)
async function geocode(address: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`,
      { headers: { 'Accept': 'application/json' } }
    )
    const data = await res.json()
    if (data.features?.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates
      return { lat, lon }
    }
  } catch { /* silent */ }
  return null
}

// Sort by postal code proximity (fallback when no geocoding)
function sortByPostalProximity(nurses: Nurse[], targetCp: string): Nurse[] {
  const adjacent = PARIS_ADJACENT[targetCp] || []
  return [...nurses].sort((a, b) => {
    const aScore = a.postal_code === targetCp ? 0 : adjacent.includes(a.postal_code) ? 1 : 2
    const bScore = b.postal_code === targetCp ? 0 : adjacent.includes(b.postal_code) ? 1 : 2
    if (aScore !== bScore) return aScore - bScore
    return Math.abs(parseInt(a.postal_code) - parseInt(targetCp)) - Math.abs(parseInt(b.postal_code) - parseInt(targetCp))
  })
}

export async function GET(request: NextRequest) {
  const cp = request.nextUrl.searchParams.get('cp')
  const address = request.nextUrl.searchParams.get('address')

  if (!cp || cp.length < 5) {
    return NextResponse.json({ nurses: [], total: 0 })
  }

  // Fetch all nurses for the area
  let nurses: Nurse[] = []
  const dept = cp.slice(0, 2)
  let isMetro = false

  if (dept === '75') {
    nurses = getNursesByMetroCity('paris')
    isMetro = true
  } else if (dept === '13' && parseInt(cp) >= 13001 && parseInt(cp) <= 13016) {
    nurses = getNursesByMetroCity('marseille')
    isMetro = true
  } else if (dept === '69' && parseInt(cp) >= 69001 && parseInt(cp) <= 69009) {
    nurses = getNursesByMetroCity('lyon')
    isMetro = true
  } else {
    nurses = getNursesByCity(cp)
  }

  const withPhone = nurses.filter(n => n.phone || n.phone2)

  // Try to geocode patient address for distance-based sorting
  let patientCoords: { lat: number; lon: number } | null = null
  if (address) {
    patientCoords = await geocode(`${address}, ${cp}, France`)
  }

  let sortedNurses: { nurse: Nurse; distance: number | null }[]

  if (patientCoords) {
    // Use pre-geocoded coordinates on nurses (from idel_france_geocoded.json)
    const withDist = withPhone.map(n => {
      if (n.lat != null && n.lon != null) {
        const dist = haversine(patientCoords!.lat, patientCoords!.lon, n.lat, n.lon)
        return { nurse: n, distance: Math.round(dist * 10) / 10 }
      }
      // No coords: assign high distance but same CP gets a bonus
      return { nurse: n, distance: n.postal_code === cp ? 50 : 100 }
    })
    withDist.sort((a, b) => a.distance - b.distance)
    sortedNurses = withDist
  } else if (isMetro) {
    // Fallback: postal code proximity
    const sorted = sortByPostalProximity(withPhone, cp)
    sortedNurses = sorted.map(n => ({ nurse: n, distance: null }))
  } else {
    sortedNurses = withPhone.map(n => ({ nurse: n, distance: null }))
  }

  const result = sortedNurses.slice(0, 20).map(({ nurse: n, distance }) => ({
    rpps: n.rpps,
    gender: n.gender,
    firstName: n.first_name,
    lastName: n.last_name,
    address: n.address,
    postalCode: n.postal_code,
    city: n.city,
    phone: n.phone || n.phone2,
    cabinet: n.cabinet || null,
    distance: patientCoords && distance != null && distance < 50 ? distance : null,
  }))

  return NextResponse.json({
    nurses: result,
    total: nurses.length,
    withPhone: withPhone.length,
    sortedBy: patientCoords ? 'distance' : isMetro ? 'postal_proximity' : 'default',
  })
}
