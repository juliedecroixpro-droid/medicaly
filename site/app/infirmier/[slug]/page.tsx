import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, ChevronRight, User, Building2, CreditCard, Heart, Syringe, Stethoscope, Clock, Shield, FileText } from 'lucide-react'
import { getNurseBySlug, getNurseByRpps, getDepartmentByCode, getNearbyNurses, getNurseSlug } from '@/lib/data'
import { formatPhone, genderLabel, genderLabelFull, citySlug, departmentSlug } from '@/lib/utils'
import Avatar from '@/components/Avatar'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Support both new slug and legacy RPPS URLs
  const nurse = getNurseBySlug(slug) || getNurseByRpps(slug)
  if (!nurse) return {}
  const nurseUrl = getNurseSlug(nurse)
  const title = `${genderLabel(nurse.gender)} ${nurse.first_name} ${nurse.last_name} - Infirmier${nurse.gender === 'F' ? 'e' : ''} a ${nurse.city}`
  return {
    title,
    description: `${genderLabelFull(nurse.gender)} ${nurse.first_name} ${nurse.last_name}, infirmier${nurse.gender === 'F' ? 'e' : ''} libéral${nurse.gender === 'F' ? 'e' : ''} a ${nurse.city} (${nurse.postal_code}). Soins à domicile : pansements, injections, perfusions, nursing. Contactez au ${nurse.phone || nurse.phone2 || 'telephone'}.`,
    openGraph: {
      title,
      description: `Contactez ${nurse.first_name} ${nurse.last_name}, infirmier${nurse.gender === 'F' ? 'e' : ''} libéral${nurse.gender === 'F' ? 'e' : ''} a ${nurse.city}. Soins infirmiers à domicile.`,
    },
    alternates: {
      canonical: `https://medicaly.fr/infirmier/${nurseUrl}`,
    },
  }
}

const SOINS = [
  { icon: Syringe, name: 'Injections et vaccinations', desc: 'Injections intramusculaires, sous-cutanees, vaccins' },
  { icon: Heart, name: 'Pansements', desc: 'Pansements simples et complexes, soins de plaies' },
  { icon: Stethoscope, name: 'Perfusions', desc: 'Pose et surveillance de perfusions à domicile' },
  { icon: User, name: 'Nursing et toilette', desc: 'Aide a la toilette, soins d\'hygiene, nursing' },
  { icon: FileText, name: 'Prises de sang', desc: 'Prelevements sanguins à domicile' },
  { icon: Shield, name: 'Suivi post-operatoire', desc: 'Surveillance et soins apres intervention chirurgicale' },
  { icon: Clock, name: 'BSI (Bilan de Soins Infirmiers)', desc: 'Evaluation et plan de soins personnalise' },
  { icon: Heart, name: 'Surveillance glycemique', desc: 'Suivi diabete, glycemie capillaire, éducation thérapeutique' },
]

export default async function InfirmierPage({ params }: Props) {
  const { slug } = await params
  // Support both new slug and legacy RPPS URLs
  let nurse = getNurseBySlug(slug)
  if (!nurse) {
    // Try legacy RPPS lookup and redirect
    nurse = getNurseByRpps(slug)
    if (nurse) {
      const { redirect } = await import('next/navigation')
      redirect(`/infirmier/${getNurseSlug(nurse)}`)
    }
    notFound()
  }

  const dept = getDepartmentByCode(nurse.department)
  const deptSlugStr = dept
    ? dept.slug
    : departmentSlug(nurse.department, nurse.department_name)
  const citySlugStr = citySlug(nurse.city, nurse.postal_code)
  const phone = nurse.phone || nurse.phone2
  const nearby = getNearbyNurses(nurse.postal_code, nurse.rpps, 5)
  const isFemale = nurse.gender === 'F'

  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: nurse.cabinet || `${nurse.first_name} ${nurse.last_name}`,
    medicalSpecialty: 'Nursing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: nurse.address,
      postalCode: nurse.postal_code,
      addressLocality: nurse.city,
      addressCountry: 'FR',
    },
    ...(phone && { telephone: phone.replace(/\s/g, '') }),
    ...(nurse.email && { email: nurse.email }),
    url: `https://medicaly.fr/infirmier/${getNurseSlug(nurse)}`,
    identifier: nurse.rpps,
    availableService: SOINS.map(s => ({
      '@type': 'MedicalProcedure',
      name: s.name,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sticky mobile CTA */}
      {phone && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E2E8F0] p-3 shadow-lg">
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            Appeler maintenant
          </a>
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-4 py-10${phone ? ' pb-24 md:pb-10' : ''}`}>
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/departement" className="hover:text-[#1E88E5]">Départements</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/departement/${deptSlugStr}`} className="hover:text-[#1E88E5]">{nurse.department_name}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/ville/${citySlugStr}`} className="hover:text-[#1E88E5]">{nurse.city}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">{nurse.first_name} {nurse.last_name}</span>
        </nav>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] px-6 py-8">
            <div className="flex items-center gap-5">
              <Avatar name={`${nurse.first_name} ${nurse.last_name}`} size="lg" />
              <div>
                <div className="text-blue-100 text-sm mb-1">{genderLabelFull(nurse.gender)}</div>
                <h1 className="text-2xl font-bold text-white">
                  {nurse.first_name} {nurse.last_name}
                </h1>
                {nurse.cabinet && (
                  <div className="text-blue-100 text-sm mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {nurse.cabinet}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-xs text-[#718096] mb-0.5">Adresse</div>
                <div className="text-[#1A202C] font-medium">{nurse.address}</div>
                <div className="text-sm text-[#4A5568]">{nurse.postal_code} {nurse.city}</div>
              </div>
            </div>

            {/* Phone */}
            {phone && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-xs text-[#718096] mb-0.5">Telephone</div>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#1E88E5] font-semibold hover:underline text-lg">
                    {formatPhone(phone)}
                  </a>
                  {nurse.phone && nurse.phone2 && (
                    <div className="text-sm text-[#4A5568] mt-0.5">{formatPhone(nurse.phone2)}</div>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            {nurse.email && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-xs text-[#718096] mb-0.5">Email</div>
                  <a href={`mailto:${nurse.email}`} className="text-[#1E88E5] hover:underline">{nurse.email}</a>
                </div>
              </div>
            )}

            {/* RPPS */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-4 h-4 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-xs text-[#718096] mb-0.5">Numéro RPPS</div>
                <div className="text-[#1A202C] font-mono text-sm">{nurse.rpps}</div>
              </div>
            </div>

            {/* Specialties */}
            {nurse.specialties && nurse.specialties.length > 0 && (
              <div className="pt-2">
                <div className="text-xs text-[#718096] mb-2">Specialites</div>
                <div className="flex flex-wrap gap-2">
                  {nurse.specialties.map((s, i) => (
                    <span key={i} className="bg-[#E3F2FD] text-[#1565C0] text-xs font-medium px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="px-6 pb-6 space-y-3">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                Appeler {formatPhone(phone)}
              </a>
            )}
            <Link
              href={`/demande?ville=${encodeURIComponent(nurse.city)}&cp=${nurse.postal_code}`}
              className="w-full flex items-center justify-center gap-2 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#1565C0] font-semibold py-3 rounded-xl transition-colors"
            >
              <FileText className="w-5 h-5" />
              Demander une prise en charge
            </Link>
          </div>
        </div>

        {/* 1. Soins proposes */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-bold text-[#1A202C] mb-4">Soins proposes</h2>
          <p className="text-sm text-[#718096] mb-4">
            {isFemale ? 'Infirmiere libérale conventionnee' : 'Infirmier libéral conventionne'} exercant a {nurse.city} ({nurse.postal_code}),
            {' '}{nurse.first_name} {nurse.last_name} assure l&apos;ensemble des soins infirmiers à domicile, notamment :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOINS.map((soin, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F7FAFC]">
                <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                  <soin.icon className="w-4 h-4 text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A202C]">{soin.name}</div>
                  <div className="text-xs text-[#718096]">{soin.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Infos pratiques */}
        <div className="mt-6 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-bold text-[#1A202C] mb-3">Infos pratiques</h2>
          <div className="text-sm text-[#4A5568] leading-relaxed space-y-3">
            <p>
              {nurse.first_name} {nurse.last_name} est {isFemale ? 'une infirmière libérale' : 'un infirmier libéral'} {' '}
              {isFemale ? 'conventionnee' : 'conventionne'} par l&apos;Assurance Maladie, exercant a {nurse.city} dans le département
              {' '}{nurse.department_name} ({nurse.department}).
              {nurse.cabinet && ` ${isFemale ? 'Elle' : 'Il'} exerce au sein du ${nurse.cabinet}.`}
            </p>
            <p>
              Les soins infirmiers à domicile sont pris en charge par l&apos;Assurance Maladie a hauteur de 60% du tarif conventionnel
              (100% en cas d&apos;ALD, affection longue duree). La plupart des IDEL pratiquent le tiers payant,
              vous n&apos;avez donc généralement rien a avancer.
            </p>
            <p>
              Pour beneficier de soins infirmiers à domicile, une ordonnance medicale est necessaire
              (sauf pour les vaccinations antigrippales). Contactez directement {nurse.first_name} {nurse.last_name} pour
              organiser votre prise en charge.
            </p>
          </div>
        </div>

        {/* 2. Autres infirmiers a proximite */}
        {nearby.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#1A202C] mb-4">
              Autres infirmiers a {nurse.city}
            </h2>
            <div className="space-y-2">
              {nearby.map(n => {
                const nPhone = n.phone || n.phone2
                return (
                  <Link
                    key={n.rpps}
                    href={`/infirmier/${getNurseSlug(n)}`}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-sm transition-all group"
                  >
                    <Avatar name={`${n.first_name} ${n.last_name}`} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#1A202C] group-hover:text-[#1E88E5] text-sm">
                        {genderLabel(n.gender)} {n.first_name} {n.last_name}
                      </div>
                      {n.cabinet && (
                        <div className="text-xs text-[#718096] truncate">{n.cabinet}</div>
                      )}
                    </div>
                    {nPhone && (
                      <div className="text-xs text-[#1E88E5] font-medium hidden sm:block">
                        {formatPhone(nPhone)}
                      </div>
                    )}
                    <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] flex-shrink-0" />
                  </Link>
                )
              })}
            </div>
            <Link
              href={`/ville/${citySlugStr}`}
              className="mt-3 inline-flex items-center gap-1 text-sm text-[#1E88E5] hover:underline"
            >
              Voir tous les infirmiers a {nurse.city}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
