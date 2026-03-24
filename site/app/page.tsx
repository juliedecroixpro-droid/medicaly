import Link from 'next/link'
import { MapPin, Users, Phone, ChevronRight, Shield, Heart, Syringe, FileText, Stethoscope, User, Clock, CheckCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import { getAllDepartments, getStats } from '@/lib/data'

export default function HomePage() {
  const departments = getAllDepartments()
  const stats = getStats()
  const topDepartments = [...departments].sort((a, b) => b.count - a.count).slice(0, 12)

  const soins = [
    { icon: Heart, name: 'Pansements', href: '/soins/pansements' },
    { icon: Syringe, name: 'Injections', href: '/soins/injections' },
    { icon: Syringe, name: 'Vaccination', href: '/soins/vaccination-domicile' },
    { icon: FileText, name: 'Prises de sang', href: '/soins/prises-de-sang' },
    { icon: Stethoscope, name: 'Perfusions', href: '/soins/perfusions' },
    { icon: Stethoscope, name: 'Chimiotherapie', href: '/soins/chimiotherapie-domicile' },
    { icon: User, name: 'Nursing / Toilette', href: '/soins/nursing-toilette' },
    { icon: Clock, name: 'Diabete', href: '/soins/surveillance-diabete' },
    { icon: Stethoscope, name: 'Constantes vitales', href: '/soins/surveillance-constantes' },
    { icon: Clock, name: 'Medicaments', href: '/soins/distribution-medicaments' },
    { icon: Shield, name: 'Post-operatoire', href: '/soins/soins-post-operatoires' },
    { icon: Shield, name: 'Ablation fils', href: '/soins/ablation-fils-agrafes' },
    { icon: FileText, name: 'Sondes / Stomies', href: '/soins/sondes-stomies' },
    { icon: Stethoscope, name: 'Oxygenotherapie', href: '/soins/oxygenotherapie' },
    { icon: Heart, name: 'Soins palliatifs', href: '/soins/soins-palliatifs' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Trouvez votre infirmier(e) à domicile
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10">
            {stats.totalNurses.toLocaleString('fr-FR')} infirmiers libéraux référencés dans{' '}
            {stats.totalDepartments} départements
          </p>
          <SearchBar placeholder="Ville, code postal ou nom d'infirmier..." size="lg" />
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white py-6 px-4 border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-[#4A5568]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span><strong className="text-[#1A202C]">{stats.totalNurses.toLocaleString('fr-FR')}</strong> IDEL référencés</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#1E88E5]" />
            <span>Donnees <strong className="text-[#1A202C]">RPPS officielles</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span><strong className="text-[#1A202C]">100% gratuit</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#1E88E5]" />
            <span><strong className="text-[#1A202C]">{stats.totalDepartments}</strong> départements couverts</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 px-4 border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#1E88E5]">
              {stats.totalNurses.toLocaleString('fr-FR')}
            </div>
            <div className="text-sm text-[#718096] mt-1">Infirmiers libéraux</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1E88E5]">{stats.totalDepartments}</div>
            <div className="text-sm text-[#718096] mt-1">Départements</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1E88E5]">
              {stats.totalCities.toLocaleString('fr-FR')}
            </div>
            <div className="text-sm text-[#718096] mt-1">Villes couvertes</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-[#1A202C]">
            Comment ca marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl border border-[#E2E8F0] p-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1E88E5] font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Recherchez</h3>
              <p className="text-sm text-[#718096]">
                Entrez votre ville ou code postal pour trouver les IDEL de votre quartier
              </p>
            </div>
            <div className="text-center bg-white rounded-xl border border-[#E2E8F0] p-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1E88E5] font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Consultez les profils</h3>
              <p className="text-sm text-[#718096]">
                Parcourez les fiches detaillees : coordonnées, cabinet, soins proposes
              </p>
            </div>
            <div className="text-center bg-white rounded-xl border border-[#E2E8F0] p-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <h3 className="font-semibold mb-2">Contactez directement</h3>
              <p className="text-sm text-[#718096]">
                Appelez l&apos;IDEL de votre choix ou faites une demande de prise en charge
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/demande" className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              <FileText className="w-5 h-5" /> Demander une prise en charge
            </Link>
          </div>
        </div>
      </section>

      {/* Soins */}
      <section className="bg-white border-y border-[#E2E8F0] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1A202C]">Soins à domicile</h2>
            <Link href="/soins" className="text-[#1E88E5] text-sm font-medium hover:underline flex items-center gap-1">
              Tous les soins <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {soins.map(soin => (
              <Link
                key={soin.href}
                href={soin.href}
                className="flex items-center gap-3 bg-[#F7FAFC] hover:bg-[#E3F2FD] p-4 rounded-xl border border-[#E2E8F0] hover:border-[#1E88E5] transition-all group"
              >
                <soin.icon className="w-5 h-5 text-[#1E88E5] flex-shrink-0" />
                <span className="text-sm font-medium text-[#4A5568] group-hover:text-[#1E88E5]">{soin.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top departments */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1A202C]">Départements les plus actifs</h2>
          <Link
            href="/departement"
            className="text-[#1E88E5] text-sm font-medium hover:underline flex items-center gap-1"
          >
            Voir tous <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topDepartments.map(dept => (
            <Link
              key={dept.code}
              href={`/departement/${dept.slug}`}
              className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#1E88E5] hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="bg-[#E3F2FD] text-[#1E88E5] text-xs font-bold px-2 py-1 rounded-lg">
                  {dept.code}
                </span>
                <MapPin className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#1E88E5] transition-colors" />
              </div>
              <div className="font-semibold text-[#1A202C] text-sm leading-snug mb-1">
                {dept.name}
              </div>
              <div className="text-xs text-[#718096] flex items-center gap-1">
                <Users className="w-3 h-3" />
                {dept.count.toLocaleString('fr-FR')} infirmiers
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-[#1A202C] text-center mb-8">Ce qu'ils pensent de Medicaly</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-1 mb-3 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="text-[#4A5568] mb-4 italic">
              "Tres pratique pour trouver rapidement une infirmière apres mon operation. J'ai trouve une IDEL a 500 m de chez moi en quelques clics !"
            </p>
            <div className="text-sm">
              <div className="font-semibold text-[#1A202C]">Marie L.</div>
              <div className="text-[#718096]">Paris 15e</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-1 mb-3 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="text-[#4A5568] mb-4 italic">
              "Ma mere avait besoin de soins quotidiens. Medicaly m'a permis de comparer plusieurs infirmiers et de choisir le plus proche. Service gratuit et efficace."
            </p>
            <div className="text-sm">
              <div className="font-semibold text-[#1A202C]">Thomas D.</div>
              <div className="text-[#718096]">Lyon 6e</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-1 mb-3 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="text-[#4A5568] mb-4 italic">
              "Enfin un site qui référence TOUS les infirmiers ! Beaucoup plus complet que les autres annuaires. Je recommande."
            </p>
            <div className="text-sm">
              <div className="font-semibold text-[#1A202C]">Sophie M.</div>
              <div className="text-[#718096]">Marseille 8e</div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-[#718096] mt-6">Temoignages illustratifs</p>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin de soins infirmiers à domicile ?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Trouvez un infirmier libéral près de chez vous en quelques secondes. Gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/recherche" className="inline-flex items-center justify-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Rechercher un infirmier
            </Link>
            <Link href="/demande" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/30">
              Demande de prise en charge
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
