import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Users, ChevronRight } from 'lucide-react'
import { getAllDepartments } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Tous les départements',
  description:
    'Trouvez un infirmier libéral dans votre département. Annuaire complet des IDEL par département.',
}

export default function DépartementsPage() {
  const departments = getAllDepartments()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Départements</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2 text-[#1A202C]">Tous les départements</h1>
      <p className="text-[#718096] mb-8">
        {departments.length} départements repertories - {departments.reduce((s, d) => s + d.count, 0).toLocaleString('fr-FR')} infirmiers libéraux
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {departments.map(dept => (
          <Link
            key={dept.code}
            href={`/departement/${dept.slug}`}
            className="bg-white rounded-xl p-4 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="bg-[#E3F2FD] text-[#1E88E5] text-xs font-bold px-2 py-1 rounded-lg">
                {dept.code}
              </span>
              <MapPin className="w-3 h-3 text-[#A0AEC0] group-hover:text-[#1E88E5] transition-colors" />
            </div>
            <div className="font-semibold text-[#1A202C] text-sm leading-snug">{dept.name}</div>
            <div className="text-xs text-[#718096] flex items-center gap-1">
              <Users className="w-3 h-3" />
              {dept.count.toLocaleString('fr-FR')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
