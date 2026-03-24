import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Search } from 'lucide-react'
import { SOINS, getSoin } from '@/lib/soins'
import { TOP_CITIES } from '@/lib/cities-top'
import { getNursesByCity } from '@/lib/data'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'

type Props = { params: Promise<{ soin: string }> }

export async function generateStaticParams() {
  return SOINS.map(s => ({ soin: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { soin } = await params
  const s = getSoin(soin)
  if (!s) return {}
  return {
    title: s.name,
    description: s.description,
    alternates: { canonical: `https://medicaly.fr/soins/${soin}` },
  }
}

export default async function SoinPage({ params }: Props) {
  const { soin } = await params
  const s = getSoin(soin)
  if (!s) notFound()

  const topCitiesWithCount = TOP_CITIES.map(c => ({
    ...c,
    count: getNursesByCity(c.postal).length,
  }))

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://medicaly.fr' },
    { name: 'Soins', url: 'https://medicaly.fr/soins' },
    { name: s.shortName, url: `https://medicaly.fr/soins/${soin}` },
  ])

  const faqs = [
    {
      question: `Comment beneficier de ${s.shortName.toLowerCase()} à domicile ?`,
      answer: `Pour beneficier de ${s.shortName.toLowerCase()} à domicile, munissez-vous d'une ordonnance de votre médecin, puis contactez un infirmier libéral près de chez vous via Medicaly. L'IDEL se deplacera a votre domicile pour realiser les soins.`,
    },
    {
      question: `Les ${s.shortName.toLowerCase()} à domicile sont-ils remboursés ?`,
      answer: `Oui, les ${s.shortName.toLowerCase()} à domicile sont pris en charge a 60% par l'Assurance Maladie (100% en ALD). La plupart des IDEL pratiquent le tiers payant.`,
    },
  ]

  // Convert markdown-like details to paragraphs
  const paragraphs = s.details.split('\n\n').map(p => p.trim()).filter(Boolean)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{s.name}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">{s.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/soins" className="hover:text-[#1E88E5]">Soins</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">{s.shortName}</span>
        </nav>

        {/* Content */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 md:p-8 mb-8">
          <div className="space-y-4 text-sm text-[#4A5568] leading-relaxed">
            {paragraphs.map((p, i) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return <h2 key={i} className="text-lg font-bold text-[#1A202C] mt-4">{p.replace(/\*\*/g, '')}</h2>
              }
              if (p.startsWith('- ')) {
                const items = p.split('\n').map(l => l.replace(/^- /, ''))
                return <ul key={i} className="list-disc list-inside space-y-1">{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />)}</ul>
              }
              return <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#1A202C]">$1</strong>') }} />
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-6 text-center text-white mb-8">
          <h2 className="text-lg font-bold mb-2">Besoin de {s.shortName.toLowerCase()} à domicile ?</h2>
          <p className="text-blue-100 text-sm mb-4">Trouvez un infirmier libéral près de chez vous en quelques clics.</p>
          <Link href="/demande" className="inline-flex items-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            <Search className="w-5 h-5" />
            Trouver un infirmier
          </Link>
        </div>

        {/* Top cities for this care type */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1A202C] mb-4">
            {s.shortName} à domicile par ville
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {topCitiesWithCount.map(c => (
              <Link
                key={c.slug}
                href={`/soins/${soin}/${c.slug}`}
                className="flex items-center justify-between px-4 py-3 bg-white hover:bg-[#E3F2FD] text-sm text-[#1A202C] hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] transition-colors"
              >
                <span className="truncate">{c.name}</span>
                <span className="text-xs text-[#718096] ml-2 flex-shrink-0">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-bold text-[#1A202C] mb-6">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-[#1A202C] mb-2">{faq.question}</h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other soins */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#1A202C] mb-4">Autres soins infirmiers à domicile</h3>
          <div className="flex flex-wrap gap-2">
            {SOINS.filter(x => x.slug !== soin).map(x => (
              <Link key={x.slug} href={`/soins/${x.slug}`} className="text-sm px-4 py-2 bg-[#F7FAFC] hover:bg-[#E3F2FD] text-[#1A202C] hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] transition-colors">
                {x.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
