import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Users, MapPin } from 'lucide-react'
import { getAllDepartments, getCitiesByDepartment, getDepartmentByCode } from '@/lib/data'
import { parseDeptSlug } from '@/lib/utils'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const departments = getAllDepartments()
  return departments.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseDeptSlug(slug)
  if (!parsed) return {}
  const dept = getDepartmentByCode(parsed.code)
  if (!dept) return {}
  return {
    title: `Infirmiers libéraux en ${dept.name} (${dept.code})`,
    description: `Trouvez un infirmier libéral dans le département ${dept.name}. ${dept.count} infirmiers libéraux référencés.`,
    openGraph: {
      title: `Infirmiers libéraux en ${dept.name}`,
      description: `${dept.count} infirmiers libéraux référencés dans le ${dept.name}`,
    },
  }
}

export default async function DépartementPage({ params }: Props) {
  const { slug } = await params
  const parsed = parseDeptSlug(slug)
  if (!parsed) notFound()

  const dept = getDepartmentByCode(parsed.code)
  if (!dept) notFound()

  const cities = getCitiesByDepartment(dept.code)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#1E88E5]">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/departement" className="hover:text-[#1E88E5]">
          Départements
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">{dept.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#1E88E5] text-white text-sm font-bold px-3 py-1 rounded-lg">
            {dept.code}
          </span>
          <h1 className="text-3xl font-bold text-[#1A202C]">{dept.name}</h1>
        </div>
        <p className="text-[#718096]">
          {dept.count.toLocaleString('fr-FR')} infirmiers libéraux dans {cities.length} villes
        </p>
      </div>

      {/* Cities grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map(city => (
          <Link
            key={city.slug}
            href={`/ville/${city.slug}`}
            className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-[#1A202C] capitalize mb-1 group-hover:text-[#1E88E5] transition-colors">
                {city.name}
              </div>
              <div className="text-xs text-[#718096] flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {city.postalCode}
                <span className="mx-1">-</span>
                <Users className="w-3 h-3" />
                {city.count} infirmier{city.count > 1 ? 's' : ''}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
