import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Phone, MapPin, User, Building2, FileText } from 'lucide-react'
import { SOINS, getSoin } from '@/lib/soins'
import { TOP_CITIES } from '@/lib/cities-top'
import { getNursesByCity, getNurseSlug } from '@/lib/data'
import { formatPhone, genderLabel, citySlug } from '@/lib/utils'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'

type Props = { params: Promise<{ soin: string; ville: string }> }

export async function generateStaticParams() {
  // Top 50 cities × all soins = 750 pages SSG (rest are SSR)
  // Keeps Vercel build under 10 min limit
  const params: { soin: string; ville: string }[] = []
  const topCitiesSSG = TOP_CITIES.slice(0, 50)
  for (const s of SOINS) {
    for (const c of topCitiesSSG) {
      params.push({ soin: s.slug, ville: c.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { soin, ville } = await params
  const s = getSoin(soin)
  const c = TOP_CITIES.find(x => x.slug === ville)
  if (!s || !c) return {}
  const nurses = getNursesByCity(c.postal)
  const title = `${s.shortName} à domicile a ${c.name} : ${nurses.length} infirmiers`
  const description = `${s.shortName} à domicile a ${c.name} (${c.postal}). ${nurses.length} infirmiers libéraux disponibles. Trouvez un IDEL pour vos ${s.shortName.toLowerCase()} a ${c.name}.`
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `https://medicaly.fr/soins/${soin}/${ville}` },
  }
}

export default async function SoinVillePage({ params }: Props) {
  const { soin, ville } = await params
  const s = getSoin(soin)
  const c = TOP_CITIES.find(x => x.slug === ville)
  if (!s || !c) notFound()

  const nurses = getNursesByCity(c.postal)
  if (nurses.length === 0) notFound()

  const deptName = nurses[0].department_name
  const cSlug = citySlug(c.name, c.postal)
  const baseUrl = 'https://medicaly.fr'

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: baseUrl },
    { name: 'Soins', url: `${baseUrl}/soins` },
    { name: s.shortName, url: `${baseUrl}/soins/${soin}` },
    { name: c.name, url: `${baseUrl}/soins/${soin}/${ville}` },
  ])

  const faqs = [
    {
      question: `Ou trouver un infirmier pour ${s.shortName.toLowerCase()} a ${c.name} ?`,
      answer: `Medicaly référence ${nurses.length} infirmiers libéraux a ${c.name} (${c.postal}) capables de realiser des ${s.shortName.toLowerCase()} à domicile. Consultez leurs fiches et contactez-les directement.`,
    },
    {
      question: `Combien coutent les ${s.shortName.toLowerCase()} à domicile a ${c.name} ?`,
      answer: `Les tarifs sont fixes par la convention nationale et remboursés a 60% par l'Assurance Maladie (100% en ALD). La plupart des IDEL de ${c.name} pratiquent le tiers payant.`,
    },
    {
      question: `Faut-il une ordonnance pour des ${s.shortName.toLowerCase()} à domicile ?`,
      answer: `Oui, une ordonnance medicale est necessaire pour la prise en charge. Contactez un IDEL a ${c.name} qui vous expliquera les demarches.`,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            {s.shortName} à domicile a {c.name}
          </h1>
          <p className="text-blue-100 text-lg">
            {nurses.length} infirmiers libéraux pour vos {s.shortName.toLowerCase()} a {c.name} ({c.postal})
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/soins" className="hover:text-[#1E88E5]">Soins</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/soins/${soin}`} className="hover:text-[#1E88E5]">{s.shortName}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">{c.name}</span>
        </nav>

        {/* Intro */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1A202C] mb-3">
            {s.shortName} à domicile a {c.name}
          </h2>
          <div className="text-sm text-[#4A5568] leading-relaxed space-y-3">
            <p>
              Vous recherchez un(e) infirmier(e) pour des {s.shortName.toLowerCase()} à domicile a {c.name} ?
              Medicaly référence <strong>{nurses.length} infirmiers libéraux</strong> dans le {c.postal}, {deptName}.
              Tous sont diplomes d&apos;Etat et conventionnes par l&apos;Assurance Maladie.
            </p>
            <p>{s.description}</p>
          </div>
        </div>

        {/* Nurses */}
        <h2 className="text-xl font-bold text-[#1A202C] mb-4">
          Infirmiers pour {s.shortName.toLowerCase()} a {c.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {nurses.slice(0, 20).map(nurse => {
            const phone = nurse.phone || nurse.phone2
            return (
              <Link key={nurse.rpps} href={`/infirmier/${getNurseSlug(nurse)}`} className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#1E88E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#1A202C] group-hover:text-[#1E88E5]">
                      {genderLabel(nurse.gender)} {nurse.first_name} {nurse.last_name}
                    </div>
                    {nurse.cabinet && <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate"><Building2 className="w-3 h-3 flex-shrink-0" /><span className="truncate">{nurse.cabinet}</span></div>}
                    <div className="text-xs text-[#718096] flex items-center gap-1 mt-1 truncate"><MapPin className="w-3 h-3 flex-shrink-0" /><span className="truncate">{nurse.address}</span></div>
                    {phone && <div className="text-xs text-[#1E88E5] flex items-center gap-1 mt-1"><Phone className="w-3 h-3" />{formatPhone(phone)}</div>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] flex-shrink-0 mt-1" />
                </div>
              </Link>
            )
          })}
        </div>

        {nurses.length > 20 && (
          <div className="text-center mb-8">
            <Link href={`/ville/${cSlug}`} className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Voir les {nurses.length} infirmiers a {c.name} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-6 text-center text-white mb-8">
          <h2 className="text-lg font-bold mb-2">Besoin de {s.shortName.toLowerCase()} a {c.name} ?</h2>
          <p className="text-blue-100 text-sm mb-4">Faites une demande de prise en charge gratuite.</p>
          <Link href={`/demande?soin=${soin}&ville=${encodeURIComponent(c.name)}&cp=${c.postal}`} className="inline-flex items-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            <FileText className="w-5 h-5" /> Demander une prise en charge
          </Link>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
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

        {/* Other cities for this care */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#1A202C] mb-4">{s.shortName} dans d&apos;autres villes</h3>
          <div className="flex flex-wrap gap-2">
            {TOP_CITIES.filter(x => x.slug !== ville).slice(0, 15).map(x => (
              <Link key={x.slug} href={`/soins/${soin}/${x.slug}`} className="text-sm px-4 py-2 bg-[#F7FAFC] hover:bg-[#E3F2FD] text-[#1A202C] hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] transition-colors">
                {x.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
