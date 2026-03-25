import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin, User, Building2, ChevronRight, Search, FileText } from 'lucide-react'
import { getNursesByCity, getNursesByMetroCity, getArrondissements } from '@/lib/data'
import { formatPhone, genderLabel, citySlug } from '@/lib/utils'
import { TOP_CITIES } from '@/lib/cities-top'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import { CITY_POPULATIONS } from '@/lib/populations'
import { generateIntro, generateFAQ, generateIntroTitle } from '@/lib/city-content'

const NATIONAL_AVERAGE_PER_100K = 150

type Props = {
  params: Promise<{ ville: string }>
}

function postalToOrdinal(postalCode: string): string {
  const num = parseInt(postalCode.slice(-2), 10)
  return num === 1 ? '1er' : `${num}e`
}

export async function generateStaticParams() {
  return TOP_CITIES.map(c => ({ ville: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params
  const city = TOP_CITIES.find(c => c.slug === ville)
  if (!city) return {}
  const nurses = city.metro && city.metroKey
    ? getNursesByMetroCity(city.metroKey)
    : getNursesByCity(city.postal)
  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const title = `Infirmiere a domicile a ${city.name} : ${nurses.length} IDEL disponibles`
  const description = `Trouvez une infirmiere a domicile a ${city.name}. ${nurses.length} infirmiers libéraux dont ${withPhone} joignables par telephone. Pansements, injections, perfusions, nursing. Annuaire gratuit.`
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: `https://medicaly.fr/infirmiere-a-domicile/${ville}`,
    },
  }
}

export default async function LandingPage({ params }: Props) {
  const { ville } = await params
  const city = TOP_CITIES.find(c => c.slug === ville)
  if (!city) notFound()

  const nurses = city.metro && city.metroKey
    ? getNursesByMetroCity(city.metroKey)
    : getNursesByCity(city.postal)
  if (nurses.length === 0) notFound()

  const arrondissements = city.metro && city.metroKey ? getArrondissements(city.metroKey) : []
  const deptName = nurses[0].department_name
  const cSlug = citySlug(city.name, city.postal)
  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const withCabinet = nurses.filter(n => n.cabinet).length
  const baseUrl = 'https://medicaly.fr'

  // Coverage stats
  const cityPop = CITY_POPULATIONS[city.postal]
  const ratioPer100K = cityPop ? Math.round((nurses.length / cityPop) * 100_000) : null
  const coverageAboveAverage = ratioPer100K !== null ? ratioPer100K >= NATIONAL_AVERAGE_PER_100K : null

  // Data-driven unique content per city
  const contentData = {
    cityName: city.name,
    nursesCount: nurses.length,
    withPhone,
    withCabinet,
    deptName,
    deptCode: nurses[0].department,
    postalCode: city.postal,
    isMetro: !!city.metro,
    nurses,
  }
  const introParagraphs = generateIntro(contentData)
  const introTitle = generateIntroTitle(city.name)
  const faqs = generateFAQ(contentData)

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: baseUrl },
    { name: `Infirmiere a domicile a ${city.name}`, url: `${baseUrl}/infirmiere-a-domicile/${ville}` },
  ])

  const faqLd = faqSchema(faqs)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Infirmiere a domicile a ${city.name}`,
    description: `Annuaire de ${nurses.length} infirmiers libéraux a ${city.name}`,
    url: `${baseUrl}/infirmiere-a-domicile/${ville}`,
    about: { '@type': 'MedicalSpecialty', name: 'Nursing' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Infirmiere a domicile a {city.name}
          </h1>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            {nurses.length} infirmier{nurses.length > 1 ? 's' : ''} libéral{nurses.length > 1 ? 'aux' : ''} a {city.name},
            dont {withPhone} joignables par telephone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/ville/${cSlug}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              Voir tous les infirmiers
            </Link>
            <Link
              href={`/demande?ville=${encodeURIComponent(city.name)}&cp=${city.postal}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/30"
            >
              <FileText className="w-5 h-5" />
              Demander une prise en charge
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/couverture" className="hover:text-[#1E88E5]">Couverture</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">Infirmiere a domicile a {city.name}</span>
        </nav>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
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

        {/* Coverage stats card */}
        {ratioPer100K !== null && (
          <div
            className={`rounded-xl border p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
              coverageAboveAverage
                ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                : 'bg-[#FFF5F5] border-[#FED7D7]'
            }`}
          >
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A202C] mb-1">
                Couverture infirmière à {city.name}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl font-bold"
                  style={{ color: coverageAboveAverage ? '#16A34A' : '#DC2626' }}
                >
                  {ratioPer100K} IDEL/100K hab.
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    coverageAboveAverage
                      ? 'bg-[#DCFCE7] text-[#16A34A]'
                      : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}
                >
                  {coverageAboveAverage
                    ? 'Couverture supérieure à la moyenne nationale'
                    : 'Couverture inférieure à la moyenne nationale'}
                </span>
              </div>
              <div className="text-xs text-[#718096] mt-1">
                Moyenne nationale : {NATIONAL_AVERAGE_PER_100K} IDEL pour 100 000 habitants
              </div>
            </div>
            <div className="text-xs text-[#718096] sm:text-right">
              <div>Population estimée : {cityPop?.toLocaleString('fr-FR')} hab.</div>
              <Link href="/statistiques" className="text-[#1E88E5] hover:underline">
                Voir les statistiques nationales
              </Link>
            </div>
          </div>
        )}

        {/* Intro SEO - unique per city */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1A202C] mb-3">
            {introTitle}
          </h2>
          <div className="text-[#4A5568] leading-relaxed space-y-3 text-sm">
            {introParagraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>

        {/* Top nurses */}
        <h2 className="text-xl font-bold text-[#1A202C] mb-4">
          Infirmiers libéraux a {city.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {nurses.slice(0, 20).map(nurse => {
            const phone = nurse.phone || nurse.phone2
            return (
              <div
                key={nurse.rpps}
                className="bg-white rounded-xl p-4 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all"
              >
                <Link href={`/infirmier/${nurse.rpps}`} className="block">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-[#1E88E5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1A202C] hover:text-[#1E88E5] transition-colors">
                        {genderLabel(nurse.gender)} {nurse.first_name} {nurse.last_name}
                      </div>
                      {nurse.cabinet && (
                        <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate">
                          <Building2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{nurse.cabinet}</span>
                        </div>
                      )}
                      <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{nurse.address}, {nurse.postal_code}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A0AEC0] flex-shrink-0 mt-1" />
                  </div>
                </Link>
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="mt-3 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler {formatPhone(phone)}
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {nurses.length > 20 && (
          <div className="text-center mb-12">
            <Link
              href={`/ville/${cSlug}`}
              className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Voir les {nurses.length} infirmiers a {city.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Arrondissements section for metro cities */}
        {city.metro && arrondissements.length > 0 && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
            <h2 className="text-xl font-bold text-[#1A202C] mb-2">
              Infirmiere a domicile par arrondissement de {city.name}
            </h2>
            <p className="text-sm text-[#718096] mb-6">
              Trouvez un(e) infirmier(e) dans votre arrondissement.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {arrondissements.map(arr => (
                <Link
                  key={arr.postalCode}
                  href={`/arrondissement/${ville}/${arr.postalCode}`}
                  className="flex flex-col items-center p-4 rounded-xl border border-[#E2E8F0] hover:border-[#1E88E5] hover:bg-[#E3F2FD] transition-all group text-center"
                >
                  <div className="font-semibold text-[#1A202C] group-hover:text-[#1E88E5] text-sm">
                    {city.name} {postalToOrdinal(arr.postalCode)}
                  </div>
                  <div className="text-xs text-[#718096] mt-1">{arr.postalCode}</div>
                  <div className="text-xs font-medium text-[#1E88E5] mt-2">
                    {arr.count} IDEL
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ SEO */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mt-8">
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

        {/* Other cities */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-[#1A202C] mb-4">
            Infirmiere a domicile dans d&apos;autres villes
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOP_CITIES.filter(c => c.slug !== ville).slice(0, 15).map(c => (
              <Link
                key={c.slug}
                href={`/infirmiere-a-domicile/${c.slug}`}
                className="text-sm px-4 py-2 bg-[#F7FAFC] hover:bg-[#E3F2FD] text-[#1A202C] hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
