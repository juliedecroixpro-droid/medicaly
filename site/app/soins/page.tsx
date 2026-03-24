import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Heart, Syringe, FileText, Stethoscope, User, Clock, Shield } from 'lucide-react'
import { SOINS } from '@/lib/soins'
import { breadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Soins infirmiers à domicile en France',
  description: 'Tous les soins infirmiers realisables à domicile : pansements, injections, prises de sang, perfusions, nursing, diabete, post-operatoire. Trouvez un IDEL.',
  alternates: { canonical: 'https://medicaly.fr/soins' },
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Syringe, FileText, Stethoscope, User, Clock, Shield,
}

export default function SoinsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://medicaly.fr' },
    { name: 'Soins infirmiers', url: 'https://medicaly.fr/soins' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Soins infirmiers à domicile</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Decouvrez l&apos;ensemble des soins que les infirmiers libéraux peuvent realiser a votre domicile.
            Tous remboursés par l&apos;Assurance Maladie.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">Soins infirmiers</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOINS.map(soin => {
            const Icon = ICON_MAP[soin.icon] || Heart
            return (
              <Link
                key={soin.slug}
                href={`/soins/${soin.slug}`}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:border-[#1E88E5] hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#1E88E5]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#1A202C] group-hover:text-[#1E88E5] transition-colors mb-1">
                      {soin.shortName}
                    </h2>
                    <p className="text-sm text-[#718096] leading-relaxed">{soin.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
