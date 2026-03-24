import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'
import { getAllDepartments, getAllCities } from '@/lib/data'
import { TOP_CITIES } from '@/lib/cities-top'

export const metadata: Metadata = {
  title: 'Couverture infirmière en France : trouvez votre IDEL',
  description: 'Trouvez une infirmière à domicile partout en France. Plus de 100 000 infirmiers libéraux référencés dans 101 départements. Recherchez par region, département ou ville.',
  alternates: {
    canonical: 'https://medicaly.fr/couverture',
  },
}

const REGIONS: { name: string; departments: string[] }[] = [
  { name: 'Ile-de-France', departments: ['75', '77', '78', '91', '92', '93', '94', '95'] },
  { name: 'Auvergne-Rhone-Alpes', departments: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'] },
  { name: 'Bourgogne-Franche-Comte', departments: ['21', '25', '39', '58', '70', '71', '89', '90'] },
  { name: 'Bretagne', departments: ['22', '29', '35', '56'] },
  { name: 'Centre-Val de Loire', departments: ['18', '28', '36', '37', '41', '45'] },
  { name: 'Corse', departments: ['2A', '2B'] },
  { name: 'Grand Est', departments: ['08', '10', '51', '52', '54', '55', '57', '67', '68'] },
  { name: 'Hauts-de-France', departments: ['02', '59', '60', '62', '80'] },
  { name: 'Normandie', departments: ['14', '27', '50', '61', '76'] },
  { name: 'Nouvelle-Aquitaine', departments: ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'] },
  { name: 'Occitanie', departments: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'] },
  { name: 'Pays de la Loire', departments: ['44', '49', '53', '72', '85'] },
  { name: 'Provence-Alpes-Cote d\'Azur', departments: ['04', '05', '06', '13', '83', '84'] },
  { name: 'Outre-Mer', departments: ['971', '972', '973', '974', '976'] },
]

export default function CouverturePage() {
  const allDepts = getAllDepartments()
  const allCities = getAllCities().sort((a, b) => b.count - a.count)
  
  const totalNurses = allDepts.reduce((sum, d) => sum + d.count, 0)

  // Compute region stats
  const regionStats = REGIONS.map(region => {
    const depts = allDepts.filter(d => region.departments.includes(d.code))
    const count = depts.reduce((sum, d) => sum + d.count, 0)
    return { ...region, depts, count }
  }).sort((a, b) => b.count - a.count)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Couverture infirmière</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">
          Trouvez votre infirmière à domicile partout en France
        </h1>
        <p className="text-[#718096] text-lg max-w-2xl mx-auto">
          {totalNurses.toLocaleString('fr-FR')} infirmiers libéraux référencés dans {allDepts.length} départements.
          Cliquez sur votre region ou département pour trouver un IDEL près de chez vous.
        </p>
      </div>

      {/* Regions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {regionStats.map(region => (
          <div key={region.name} className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1A202C]">{region.name}</h2>
              <span className="text-xs bg-[#E3F2FD] text-[#1565C0] px-2 py-1 rounded-full font-semibold">
                {region.count.toLocaleString('fr-FR')} IDEL
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {region.depts.sort((a, b) => b.count - a.count).map(dept => (
                <Link
                  key={dept.code}
                  href={`/departement/${dept.slug}`}
                  className="text-xs px-2.5 py-1 bg-[#F7FAFC] hover:bg-[#E3F2FD] text-[#4A5568] hover:text-[#1E88E5] rounded-md border border-[#E2E8F0] transition-colors"
                >
                  {dept.code} - {dept.name} ({dept.count})
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SEO text */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-12">
        <h2 className="text-xl font-bold text-[#1A202C] mb-4">
          La couverture infirmière en France sur Medicaly
        </h2>
        <div className="text-[#4A5568] leading-relaxed space-y-4 text-sm">
          <p>
            Medicaly vous permet de trouver simplement et rapidement un(e) infirmier(e) à domicile
            partout en France. Avec une presentation par region et par département, vous identifierez
            le plus efficacement possible les infirmiers libéraux disponibles près de chez vous.
          </p>
          <p>
            Les {totalNurses.toLocaleString('fr-FR')} infirmiers libéraux référencés sur Medicaly
            couvrent l&apos;ensemble du territoire metropolitain et les départements d&apos;Outre-Mer.
            Chaque professionnel est identifie par son numéro RPPS (Repertoire Partage des Professionnels de Sante),
            garantissant des informations fiables et a jour.
          </p>
          <p>
            Que vous ayez besoin de soins à domicile pour des pansements, des injections, des perfusions,
            du nursing ou un suivi post-operatoire, les IDEL de votre quartier sont disponibles 7 jours sur 7.
          </p>
        </div>
      </div>

      {/* Top cities */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#1A202C] mb-6">
          Top villes de recherche pour des infirmières à domicile
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {allCities.slice(0, 60).map(city => (
            <Link
              key={city.slug}
              href={`/ville/${city.slug}`}
              className="flex items-center gap-2 text-sm px-3 py-2 bg-white hover:bg-[#E3F2FD] text-[#4A5568] hover:text-[#1E88E5] rounded-lg border border-[#E2E8F0] transition-colors"
            >
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{city.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
