import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin, Syringe, Heart, Stethoscope, User, Shield, Clock, FileText } from 'lucide-react'
import { getAllCities, getNursesByCity, getNursesByMetroCity, getArrondissements, getDepartmentByCode, getCitiesByDepartment, MULTI_ARRONDISSEMENT_CITIES, GRANDES_VILLES } from '@/lib/data'
import { parseCitySlug, departmentSlug } from '@/lib/utils'
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/schemas'
import VilleNursesList from '@/components/VilleNursesList'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cities = getAllCities()
  // Clean slugs for grandes villes (e.g. /ville/paris, /ville/marseille)
  const grandesVillesParams = Object.keys(GRANDES_VILLES).map(slug => ({ slug }))
  // Top 500 cities with postal code (SSG), rest are SSR
  const cityParams = cities.slice(0, 500).map(c => ({ slug: c.slug }))
  // Merge, deduplicate
  const allSlugs = new Set([...grandesVillesParams.map(p => p.slug), ...cityParams.map(p => p.slug)])
  return Array.from(allSlugs).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseCitySlug(slug)
  if (!parsed) return {}

  // For metro cities (Paris/Marseille/Lyon) with clean slug, use metro data
  const metroKey = parsed.isGrandeVille
    ? Object.keys(MULTI_ARRONDISSEMENT_CITIES).find(key => key === parsed.citySlug)
    : Object.keys(MULTI_ARRONDISSEMENT_CITIES).find(key => {
        const config = MULTI_ARRONDISSEMENT_CITIES[key]
        return config.deptCode === parsed.postalCode.slice(0, 2) &&
          parsed.citySlug.startsWith(key)
      })

  const nurses = metroKey ? getNursesByMetroCity(metroKey) : getNursesByCity(parsed.postalCode)
  if (nurses.length === 0) return {}

  const grandeVille = GRANDES_VILLES[parsed.citySlug]
  const cityName = metroKey
    ? metroKey.charAt(0).toUpperCase() + metroKey.slice(1)
    : grandeVille?.displayName ?? nurses[0].city
  const postalCode = grandeVille?.postalCode ?? parsed.postalCode
  const withPhone = nurses.filter(n => n.phone || n.phone2).length

  // Canonical URL: use clean slug for grandes villes
  const canonicalSlug = grandeVille ? parsed.citySlug : slug

  const title = `Infirmière à domicile à ${cityName} : ${nurses.length} IDEL disponibles | Medicaly`
  const description = `Trouvez une infirmière à domicile à ${cityName}. ${nurses.length} infirmiers libéraux référencés dont ${withPhone} joignables par téléphone. Pansements, injections, perfusions, nursing. Annuaire gratuit Medicaly.`
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: `https://medicaly.fr/ville/${canonicalSlug}`,
    },
  }
}

const SOINS_VILLE = [
  { icon: Syringe, name: 'Injections et vaccinations' },
  { icon: Heart, name: 'Pansements simples et complexes' },
  { icon: Stethoscope, name: 'Perfusions à domicile' },
  { icon: User, name: 'Nursing et aide a la toilette' },
  { icon: FileText, name: 'Prelevements sanguins' },
  { icon: Shield, name: 'Soins post-operatoires' },
  { icon: Clock, name: 'BSI (Bilan de Soins Infirmiers)' },
  { icon: Heart, name: 'Surveillance diabete et glycemie' },
]

export default async function VillePage({ params }: Props) {
  const { slug } = await params
  const parsed = parseCitySlug(slug)
  if (!parsed) notFound()

  // Detect metro cities (Paris, Marseille, Lyon) to show ALL arrondissements
  // Supports both clean slug (/ville/paris) and postal slug (/ville/paris-75001)
  const metroKey = parsed.isGrandeVille
    ? Object.keys(MULTI_ARRONDISSEMENT_CITIES).find(key => key === parsed.citySlug)
    : Object.keys(MULTI_ARRONDISSEMENT_CITIES).find(key => {
        const config = MULTI_ARRONDISSEMENT_CITIES[key]
        return config.deptCode === parsed.postalCode.slice(0, 2) &&
          parsed.citySlug.startsWith(key)
      })

  const nurses = metroKey ? getNursesByMetroCity(metroKey) : getNursesByCity(parsed.postalCode)
  if (nurses.length === 0) notFound()
  const arrondissements = metroKey ? getArrondissements(metroKey) : []

  // Display name: use GRANDES_VILLES displayName when available
  const grandeVille = GRANDES_VILLES[parsed.citySlug]
  const cityName = metroKey
    ? metroKey.charAt(0).toUpperCase() + metroKey.slice(1)
    : grandeVille?.displayName ?? nurses[0].city

  // Canonical: always use clean slug for grandes villes
  const canonicalSlug = grandeVille ? parsed.citySlug : slug
  const deptCode = nurses[0].department
  const deptName = nurses[0].department_name
  const dept = getDepartmentByCode(deptCode)
  const deptSlugStr = dept ? dept.slug : departmentSlug(deptCode, deptName)

  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const withCabinet = nurses.filter(n => n.cabinet).length
  const femaleCount = nurses.filter(n => n.gender === 'F').length
  const maleCount = nurses.length - femaleCount

  const baseUrl = 'https://medicaly.fr'

  const faqs = [
    {
      question: `Comment trouver une infirmiere à domicile a ${cityName} ?`,
      answer: `Medicaly référence ${nurses.length} infirmier(e)s à domicile a ${cityName}, dont ${withPhone} joignables par telephone. ${femaleCount} infirmières et ${maleCount} infirmiers exercent dans la commune.`,
    },
    {
      question: `Comment contacter une infirmiere à domicile a ${cityName} ?`,
      answer: `Sur Medicaly, cliquez sur la fiche de l'infirmier(e) à domicile de votre choix a ${cityName} pour acceder a ses coordonnées. Vous pouvez appeler directement depuis la fiche ou demander une prise en charge en ligne.`,
    },
    {
      question: `Les soins d'infirmiere à domicile a ${cityName} sont-ils remboursés ?`,
      answer: `Oui, les soins d'infirmiere à domicile sont pris en charge a 60% par l'Assurance Maladie (100% en ALD). Les ${nurses.length} IDEL de ${cityName} sont conventionnes et pratiquent généralement le tiers payant.`,
    },
    {
      question: `Quels soins une infirmiere à domicile peut-elle realiser a ${cityName} ?`,
      answer: `Les infirmier(e)s à domicile de ${cityName} assurent : injections, vaccinations, pansements, prises de sang, perfusions, nursing, aide a la toilette, surveillance glycemique, soins post-operatoires et bilans de soins infirmiers (BSI).`,
    },
  ]

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: baseUrl },
    { name: 'Départements', url: `${baseUrl}/departement` },
    { name: deptName, url: `${baseUrl}/departement/${deptSlugStr}` },
    { name: cityName, url: `${baseUrl}/ville/${canonicalSlug}` },
  ])

  const faqLd = faqSchema(faqs)
  const localBusiness = localBusinessSchema({
    name: `Infirmiere à domicile a ${cityName}`,
    city: cityName,
    postalCode: parsed.postalCode,
    department: deptName,
    nurseCount: nurses.length,
    url: `${baseUrl}/ville/${canonicalSlug}`,
  })

  const nearbyCities = getCitiesByDepartment(deptCode)
    .filter(c => c.name.toLowerCase() !== cityName.toLowerCase())
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] dark:text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/departement" className="hover:text-[#1E88E5]">Départements</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/departement/${deptSlugStr}`} className="hover:text-[#1E88E5]">{deptName}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] dark:text-gray-100 font-medium">{cityName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A202C] dark:text-gray-100 mb-3">
            Infirmiere à domicile a {cityName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-[#718096] dark:text-gray-400">
              <MapPin className="w-4 h-4" /> {parsed.postalCode}, {deptName}
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{nurses.length}</div>
            <div className="text-xs text-[#718096] dark:text-gray-400 mt-1">IDEL référencés</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{withPhone}</div>
            <div className="text-xs text-[#718096] dark:text-gray-400 mt-1">Joignables par tel.</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{withCabinet}</div>
            <div className="text-xs text-[#718096] dark:text-gray-400 mt-1">En cabinet</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-[#1E88E5]">{femaleCount}/{maleCount}</div>
            <div className="text-xs text-[#718096] dark:text-gray-400 mt-1">Femmes / Hommes</div>
          </div>
        </div>

        {/* Intro SEO text */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1A202C] dark:text-gray-100 mb-3">
            Trouvez votre infirmier(e) à domicile a {cityName}
          </h2>
          <div className="text-sm text-[#4A5568] dark:text-gray-300 leading-relaxed space-y-3">
            <p>
              {cityName} ({parsed.postalCode}) compte <strong>{nurses.length} infirmiers libéraux</strong> référencés
              sur Medicaly, dans le département {deptName} ({deptCode}).
              {withPhone > 0 && ` Parmi eux, ${withPhone} sont joignables directement par telephone.`}
              {withCabinet > 0 && ` ${withCabinet} exercent au sein d'un cabinet infirmier.`}
            </p>
            <p>
              Tous les IDEL de {cityName} sont diplomes d&apos;Etat et conventionnes par l&apos;Assurance Maladie.
              Les soins à domicile sont pris en charge a 60% (100% pour les patients en ALD).
              La plupart pratiquent le tiers payant : vous n&apos;avez généralement rien a avancer.
            </p>
          </div>
        </div>

        {/* Soins disponibles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1A202C] dark:text-gray-100 mb-4">
            Soins d&apos;infirmiere à domicile a {cityName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SOINS_VILLE.map((soin, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[#F7FAFC] dark:bg-gray-700">
                <soin.icon className="w-4 h-4 text-[#1E88E5] flex-shrink-0" />
                <span className="text-xs text-[#4A5568] dark:text-gray-300 font-medium">{soin.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nurses list with filters + pagination */}
        <h2 className="text-xl font-bold text-[#1A202C] dark:text-gray-100 mb-4">
          Les {nurses.length} infirmier(e)s à domicile a {cityName}
        </h2>
        <VilleNursesList nurses={nursesForClient} cityName={cityName} totalCount={nurses.length} />

        {/* Arrondissements for metro cities */}
        {metroKey && arrondissements.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-6 mb-8 mt-8">
            <h2 className="text-xl font-bold text-[#1A202C] dark:text-gray-100 mb-2">
              Par arrondissement
            </h2>
            <p className="text-sm text-[#718096] dark:text-gray-400 mb-4">
              Trouvez un(e) infirmier(e) a domicile dans votre arrondissement de {cityName}.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {arrondissements.map(arr => {
                const num = parseInt(arr.postalCode.slice(-2), 10)
                const ordinal = num === 1 ? '1er' : `${num}e`
                return (
                  <Link
                    key={arr.postalCode}
                    href={`/arrondissement/${metroKey}/${arr.postalCode}`}
                    className="flex flex-col items-center p-4 rounded-xl border border-[#E2E8F0] dark:border-gray-700 hover:border-[#1E88E5] hover:bg-[#E3F2FD] dark:hover:bg-gray-700 transition-all group text-center"
                  >
                    <div className="font-semibold text-[#1A202C] dark:text-gray-100 group-hover:text-[#1E88E5] text-sm">
                      {cityName} {ordinal}
                    </div>
                    <div className="text-xs text-[#718096] dark:text-gray-400 mt-1">{arr.postalCode}</div>
                    <div className="text-xs font-medium text-[#1E88E5] mt-2">{arr.count} IDEL</div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-6 mb-8 mt-8">
          <h2 className="text-xl font-bold text-[#1A202C] dark:text-gray-100 mb-6">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-[#1A202C] dark:text-gray-100 mb-2">{faq.question}</h3>
                <p className="text-[#4A5568] dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Villes proches */}
        {nearbyCities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1A202C] dark:text-gray-100 mb-4">
              Infirmiere à domicile dans les villes proches
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {nearbyCities.map(c => (
                <Link
                  key={c.slug}
                  href={`/ville/${c.slug}`}
                  className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 hover:bg-[#E3F2FD] text-sm text-[#1A202C] dark:text-gray-200 hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] dark:border-gray-700 transition-colors"
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-xs text-[#718096] dark:text-gray-400 ml-2 flex-shrink-0">{c.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Demande de prise en charge */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">Besoin d&apos;une infirmiere à domicile a {cityName} ?</h2>
          <p className="text-blue-100 text-sm mb-4">
            Trouvez une infirmiere à domicile et faites une demande de prise en charge.
          </p>
          <Link
            href={`/demande?ville=${encodeURIComponent(cityName)}&cp=${parsed.postalCode}`}
            className="inline-flex items-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Demander une prise en charge
          </Link>
        </div>
      </div>
    </>
  )
}
