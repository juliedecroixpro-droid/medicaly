import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin, User, Building2, ChevronRight, Search, FileText } from 'lucide-react'
import { getNursesByCity } from '@/lib/data'
import { formatPhone, genderLabel, citySlug } from '@/lib/utils'
import { TOP_CITIES } from '@/lib/cities-top'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'

type Props = {
  params: Promise<{ ville: string }>
}

export async function generateStaticParams() {
  return TOP_CITIES.map(c => ({ ville: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params
  const city = TOP_CITIES.find(c => c.slug === ville)
  if (!city) return {}
  const nurses = getNursesByCity(city.postal)
  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const title = `Infirmiere à domicile a ${city.name} : ${nurses.length} IDEL disponibles`
  const description = `Trouvez une infirmière à domicile a ${city.name} (${city.postal}). ${nurses.length} infirmiers libéraux dont ${withPhone} joignables par telephone. Pansements, injections, perfusions, nursing. Annuaire gratuit.`
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

  const nurses = getNursesByCity(city.postal)
  if (nurses.length === 0) notFound()

  const deptName = nurses[0].department_name
  const cSlug = citySlug(city.name, city.postal)
  const withPhone = nurses.filter(n => n.phone || n.phone2).length
  const withCabinet = nurses.filter(n => n.cabinet).length
  const baseUrl = 'https://medicaly.fr'

  const faqs = [
    {
      question: `Comment trouver une infirmière à domicile a ${city.name} ?`,
      answer: `Medicaly référence ${nurses.length} infirmiers libéraux a ${city.name} (${city.postal}). Utilisez notre annuaire pour trouver un IDEL, consulter sa fiche et le contacter directement par telephone. ${withPhone} IDEL sont joignables par telephone.`,
    },
    {
      question: `Les soins infirmiers à domicile a ${city.name} sont-ils remboursés ?`,
      answer: `Oui, les soins infirmiers à domicile sont pris en charge par l'Assurance Maladie a 60% du tarif conventionnel (100% en cas d'ALD). Les IDEL de ${city.name} sont conventionnes et pratiquent le tiers payant.`,
    },
    {
      question: `Quels soins un infirmier à domicile peut-il realiser a ${city.name} ?`,
      answer: `Les IDEL de ${city.name} assurent tous les soins infirmiers à domicile : injections et vaccinations, pansements, prises de sang, perfusions, nursing et aide a la toilette, surveillance glycemique, soins post-operatoires et bilans de soins infirmiers (BSI).`,
    },
    {
      question: `Faut-il une ordonnance pour des soins infirmiers à domicile ?`,
      answer: `Oui, une ordonnance medicale est necessaire pour la prise en charge des soins infirmiers à domicile (sauf vaccination antigrippale). Contactez un IDEL a ${city.name} qui vous guidera dans les demarches.`,
    },
    {
      question: `Combien coute une infirmière à domicile a ${city.name} ?`,
      answer: `Les tarifs sont fixes par la convention nationale. Un soin infirmier (injection, pansement) coute entre 3€ et 15€, remboursé a 60% (100% en ALD). Avec le tiers payant, vous n'avancez généralement rien.`,
    },
  ]

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: baseUrl },
    { name: `Infirmiere à domicile a ${city.name}`, url: `${baseUrl}/infirmiere-a-domicile/${ville}` },
  ])

  const faqLd = faqSchema(faqs)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Infirmiere à domicile a ${city.name}`,
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
            Infirmiere à domicile a {city.name}
          </h1>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            {nurses.length} infirmier{nurses.length > 1 ? 's' : ''} libéral{nurses.length > 1 ? 'aux' : ''} a {city.name} ({city.postal}), dont {withPhone} joignables par telephone.
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
          <span className="text-[#1A202C] font-medium">Infirmiere à domicile a {city.name}</span>
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

        {/* Intro SEO */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1A202C] mb-3">
            Trouvez votre infirmier(e) à domicile a {city.name}
          </h2>
          <div className="text-[#4A5568] leading-relaxed space-y-3 text-sm">
            <p>
              Vous recherchez un(e) infirmier(e) pour des soins à domicile a {city.name} ?
              Medicaly référence <strong>{nurses.length} infirmiers libéraux</strong> (IDEL)
              dans le {city.postal} et ses alentours, dans le département {deptName}.
              Tous sont diplomes d&apos;Etat et conventionnes par l&apos;Assurance Maladie.
            </p>
            <p>
              Les IDEL de {city.name} assurent l&apos;ensemble des soins infirmiers à domicile :
              pansements simples et complexes, injections et vaccinations, prises de sang, perfusions,
              nursing et aide a la toilette, surveillance post-operatoire, accompagnement BSI et
              suivi des patients chroniques (diabete, ALD).
            </p>
            <p>
              Pour beneficier de soins infirmiers à domicile, une ordonnance medicale est necessaire.
              Contactez directement un IDEL a {city.name} via notre annuaire : la plupart pratiquent
              le tiers payant, vous n&apos;avez donc rien a avancer.
            </p>
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
              <Link
                key={nurse.rpps}
                href={`/infirmier/${nurse.rpps}`}
                className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#1E88E5]" />
                  </div>
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
                    <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{nurse.address}</span>
                    </div>
                    {phone && (
                      <div className="text-xs text-[#1E88E5] flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" />
                        {formatPhone(phone)}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
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
            Infirmiere à domicile dans d&apos;autres villes
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
