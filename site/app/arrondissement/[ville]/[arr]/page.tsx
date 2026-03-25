import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin, User, Building2, ChevronRight, FileText, ArrowLeft } from 'lucide-react'
import { getNursesByCity, getArrondissements, MULTI_ARRONDISSEMENT_CITIES } from '@/lib/data'
import { formatPhone, genderLabel } from '@/lib/utils'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import { generateIntro, generateFAQ } from '@/lib/city-content'
import VilleNursesList from '@/components/VilleNursesList'

type Props = {
  params: Promise<{ ville: string; arr: string }>
}

function postalToOrdinal(postalCode: string): string {
  const num = parseInt(postalCode.slice(-2), 10)
  return num === 1 ? '1er' : `${num}e`
}

function cityDisplayName(cityKey: string): string {
  return cityKey.charAt(0).toUpperCase() + cityKey.slice(1)
}

export async function generateStaticParams() {
  const result: { ville: string; arr: string }[] = []
  for (const cityKey of Object.keys(MULTI_ARRONDISSEMENT_CITIES)) {
    const arrondissements = getArrondissements(cityKey)
    for (const arr of arrondissements) {
      result.push({ ville: cityKey, arr: arr.postalCode })
    }
  }
  return result
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville, arr } = await params
  if (!MULTI_ARRONDISSEMENT_CITIES[ville]) return {}
  const nurses = getNursesByCity(arr)
  if (nurses.length === 0) return {}
  const cityName = cityDisplayName(ville)
  const ordinal = postalToOrdinal(arr)
  const title = `Infirmiere a domicile a ${cityName} ${ordinal} (${arr}) : ${nurses.length} IDEL`
  const description = `Trouvez une infirmiere a domicile dans le ${ordinal} arrondissement de ${cityName} (${arr}). ${nurses.length} infirmiers libéraux référencés. Pansements, injections, perfusions, nursing. Annuaire gratuit.`
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `https://medicaly.fr/arrondissement/${ville}/${arr}` },
  }
}

export default async function ArrondissementPage({ params }: Props) {
  const { ville, arr } = await params
  if (!MULTI_ARRONDISSEMENT_CITIES[ville]) notFound()

  const nurses = getNursesByCity(arr)
  if (nurses.length === 0) notFound()

  const cityName = cityDisplayName(ville)
  const ordinal = postalToOrdinal(arr)
  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const withCabinet = nurses.filter(n => n.cabinet).length
  const baseUrl = 'https://medicaly.fr'

  // Data-driven unique content per arrondissement
  const contentData = {
    cityName: `${cityName} ${ordinal}`,
    nursesCount: nurses.length,
    withPhone,
    withCabinet,
    deptName: nurses[0].department_name,
    deptCode: nurses[0].department,
    postalCode: arr,
    isMetro: false,
    nurses,
  }
  const faqs = generateFAQ(contentData)
  const introParagraphs = generateIntro(contentData)

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: baseUrl },
    { name: `Infirmiere a domicile a ${cityName}`, url: `${baseUrl}/infirmiere-a-domicile/${ville}` },
    { name: `${cityName} ${ordinal} arrondissement`, url: `${baseUrl}/arrondissement/${ville}/${arr}` },
  ])

  const faqLd = faqSchema(faqs)

  const nursesForClient = nurses.map(n => ({
    rpps: n.rpps,
    gender: n.gender,
    last_name: n.last_name,
    first_name: n.first_name,
    address: n.address,
    postal_code: n.postal_code,
    city: n.city,
    phone: n.phone,
    phone2: n.phone2,
    cabinet: n.cabinet,
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={`/infirmiere-a-domicile/${ville}`}
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour a {cityName} (toutes les IDEL)
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Infirmiere a domicile a {cityName} {ordinal} arrondissement
          </h1>
          <p className="text-blue-100 text-lg">
            {nurses.length} infirmier{nurses.length > 1 ? 's' : ''} libéral{nurses.length > 1 ? 'aux' : ''} dans le {arr}, dont {withPhone} joignables par telephone.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/infirmiere-a-domicile/${ville}`} className="hover:text-[#1E88E5]">
            Infirmiere a {cityName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">{cityName} {ordinal}</span>
        </nav>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{nurses.length}</div>
            <div className="text-xs text-[#718096] mt-1">IDEL référencés</div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{withPhone}</div>
            <div className="text-xs text-[#718096] mt-1">Joignables par tel.</div>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{withCabinet}</div>
            <div className="text-xs text-[#718096] mt-1">En cabinet</div>
          </div>
        </div>

        {/* Intro - unique per arrondissement */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1A202C] mb-3">
            Infirmière à domicile dans le {ordinal} arrondissement de {cityName}
          </h2>
          <div className="text-[#4A5568] leading-relaxed space-y-3 text-sm">
            {introParagraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>

        {/* Nurses list */}
        <h2 className="text-xl font-bold text-[#1A202C] mb-4">
          Les {nurses.length} infirmier(e)s du {ordinal} arrondissement de {cityName}
        </h2>
        <VilleNursesList nurses={nursesForClient} cityName={`${cityName} ${ordinal}`} totalCount={nurses.length} />

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8 mt-8">
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

        {/* Back to metro city */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">
            Besoin d&apos;une infirmiere a domicile dans un autre arrondissement de {cityName} ?
          </h2>
          <p className="text-blue-100 text-sm mb-4">
            Consultez tous les infirmiers libéraux de {cityName} et de ses arrondissements.
          </p>
          <Link
            href={`/infirmiere-a-domicile/${ville}`}
            className="inline-flex items-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Tous les IDEL de {cityName}
          </Link>
        </div>
      </div>
    </>
  )
}
