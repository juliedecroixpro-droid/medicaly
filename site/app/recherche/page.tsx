import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Phone, MapPin, Building2, Search } from 'lucide-react'
import { searchNurses } from '@/lib/data'
import { formatPhone, genderLabel, citySlug } from '@/lib/utils'
import SearchBar from '@/components/SearchBar'
import Avatar from '@/components/Avatar'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Résultats pour "${q}"` : 'Recherche',
    description: q
      ? `Résultats de recherche pour "${q}" dans l'annuaire des infirmiers libéraux.`
      : 'Recherchez un infirmier libéral par nom, ville ou code postal.',
    robots: { index: false, follow: true },
  }
}

export default async function RecherchePage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q || ''
  const results = query ? searchNurses(query) : []

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Recherche</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A202C] mb-6">Rechercher un infirmier libéral</h1>

      <div className="mb-8">
        <SearchBar placeholder="Ville, code postal ou nom..." defaultValue={query} size="lg" />
      </div>

      {query && (
        <div className="mb-4 text-sm text-[#718096]">
          {results.length === 0
            ? `Aucun résultat pour "${query}"`
            : `${results.length} résultat${results.length > 1 ? 's' : ''} pour "${query}"${results.length === 50 ? ' (50 premiers résultats)' : ''}`}
        </div>
      )}

      {!query && (
        <div className="text-center py-16 text-[#A0AEC0]">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Entrez une ville, un code postal ou un nom d&apos;infirmier</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map(nurse => {
            const phone = nurse.phone || nurse.phone2
            const citySlugStr = citySlug(nurse.city, nurse.postal_code)
            return (
              <Link
                key={nurse.rpps}
                href={`/infirmier/${nurse.rpps}`}
                className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group flex items-start gap-4"
              >
                <Avatar name={`${nurse.first_name} ${nurse.last_name}`} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#1A202C] group-hover:text-[#1E88E5] transition-colors">
                    {genderLabel(nurse.gender)} {nurse.first_name} {nurse.last_name}
                  </div>
                  {nurse.cabinet && (
                    <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate">
                      <Building2 className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{nurse.cabinet}</span>
                    </div>
                  )}
                  <div className="text-xs text-[#718096] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {nurse.address}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href={`/ville/${citySlugStr}`}
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-[#1E88E5] hover:underline"
                    >
                      {nurse.city} ({nurse.postal_code})
                    </Link>
                    {phone && (
                      <span className="text-xs text-[#4A5568] flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {formatPhone(phone)}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] transition-colors flex-shrink-0 mt-1" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
