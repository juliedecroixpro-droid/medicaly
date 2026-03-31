import { NextRequest, NextResponse } from 'next/server'
import { searchNurses, getAllCities, getNurseSlug } from '@/lib/data'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() || ''
  if (q.length < 2) return NextResponse.json({ cities: [], nurses: [] })

  const qLower = q.toLowerCase()

  // Search cities first
  const allCities = getAllCities()
  const cities = allCities
    .filter(c => c.name.toLowerCase().includes(qLower) || c.postalCode.startsWith(qLower))
    .slice(0, 5)
    .map(c => ({ name: c.name, postalCode: c.postalCode, slug: c.slug, count: c.count, departmentName: c.departmentName }))

  // Search nurses
  const nurses = searchNurses(q).slice(0, 5).map(n => ({
    rpps: n.rpps,
    slug: getNurseSlug(n),
    firstName: n.first_name,
    lastName: n.last_name,
    city: n.city,
    postalCode: n.postal_code,
  }))

  return NextResponse.json({ cities, nurses })
}
