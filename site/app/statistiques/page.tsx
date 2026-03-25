import { Metadata } from 'next'
import Link from 'next/link'
import { getAllDepartments, getAllCities, loadNurses, getStats } from '@/lib/data'
import { getDepartmentPopulation, calculateRatio } from '@/lib/populations'
import { BarChart, TrendingUp, Users, MapPin, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Statistiques IDEL France 2026 - Répartition des infirmiers libéraux',
  description: 'Statistiques complètes sur les 100 000+ infirmiers libéraux en France : répartition par département, ratio IDEL/habitant, déserts médicaux, genre.',
  alternates: { canonical: 'https://medicaly.fr/statistiques' },
}

export default function StatistiquesPage() {
  const stats = getStats()
  const departments = getAllDepartments()
  const nurses = loadNurses()

  // Top 20 departments by IDEL count
  const topDepts = [...departments]
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map((dept) => {
      const pop = getDepartmentPopulation(dept.code)
      const ratio = pop ? calculateRatio(dept.count, pop) : null
      return { ...dept, population: pop, ratio }
    })

  // Departments with lowest IDEL/hab ratio (medical deserts)
  const medicalDeserts = [...departments]
    .map((dept) => {
      const pop = getDepartmentPopulation(dept.code)
      const ratio = pop ? calculateRatio(dept.count, pop) : 0
      return { ...dept, population: pop, ratio }
    })
    .filter((d) => d.ratio > 0)
    .sort((a, b) => (a.ratio || 0) - (b.ratio || 0))
    .slice(0, 15)

  // Top 20 cities by IDEL count
  const topCities = [...getAllCities()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)

  // Gender distribution
  const genderStats = nurses.reduce(
    (acc, n) => {
      if (n.gender === 'F') acc.female++
      else if (n.gender === 'M') acc.male++
      return acc
    },
    { female: 0, male: 0 }
  )

  const femalePercent = Math.round((genderStats.female / nurses.length) * 100)
  const malePercent = Math.round((genderStats.male / nurses.length) * 100)

  // Average IDEL per city
  const avgPerCity = Math.round(stats.totalNurses / stats.totalCities)

  // National average ratio (approximate)
  const nationalAvg = 150

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E3F2FD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Statistiques IDEL France 2026',
            description:
              'Statistiques sur la répartition des infirmiers libéraux en France',
            url: 'https://medicaly.fr/statistiques',
            inLanguage: 'fr-FR',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Medicaly',
              url: 'https://medicaly.fr',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Statistiques IDEL France 2026
            </h1>
          </div>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl">
            Données complètes sur la répartition des {stats.totalNurses.toLocaleString('fr-FR')}{' '}
            infirmiers diplômés d'État libéraux (IDEL) en France métropolitaine et DOM-TOM.
          </p>
        </div>
      </section>

      {/* Key stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1E88E5]">
            <div className="flex items-center gap-2 text-[#718096] text-sm mb-2">
              <Users className="w-4 h-4" />
              <span>IDEL en France</span>
            </div>
            <div className="text-3xl font-bold text-[#1A202C]">
              {stats.totalNurses.toLocaleString('fr-FR')}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#42A5F5]">
            <div className="flex items-center gap-2 text-[#718096] text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Départements</span>
            </div>
            <div className="text-3xl font-bold text-[#1A202C]">{stats.totalDepartments}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#64B5F6]">
            <div className="flex items-center gap-2 text-[#718096] text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Villes couvertes</span>
            </div>
            <div className="text-3xl font-bold text-[#1A202C]">
              {stats.totalCities.toLocaleString('fr-FR')}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#90CAF9]">
            <div className="flex items-center gap-2 text-[#718096] text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Moyenne par ville</span>
            </div>
            <div className="text-3xl font-bold text-[#1A202C]">{avgPerCity}</div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-12 pb-16">
        {/* Gender distribution */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#1E88E5]" />
            Répartition par genre
          </h2>
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-lg font-semibold text-[#1A202C] mb-2">Femmes</div>
                <div className="text-4xl font-bold text-[#E91E63] mb-3">
                  {genderStats.female.toLocaleString('fr-FR')} ({femalePercent}%)
                </div>
                <div className="bg-[#FCE4EC] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#E91E63] h-full"
                    style={{ width: `${femalePercent}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-[#1A202C] mb-2">Hommes</div>
                <div className="text-4xl font-bold text-[#1E88E5] mb-3">
                  {genderStats.male.toLocaleString('fr-FR')} ({malePercent}%)
                </div>
                <div className="bg-[#E3F2FD] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E88E5] h-full"
                    style={{ width: `${malePercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top 20 departments */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#1E88E5]" />
            Top 20 départements par nombre d'IDEL
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-[#4A5568]">Rang</th>
                    <th className="text-left p-4 font-semibold text-[#4A5568]">Département</th>
                    <th className="text-right p-4 font-semibold text-[#4A5568]">IDEL</th>
                    <th className="text-right p-4 font-semibold text-[#4A5568]">
                      Population
                    </th>
                    <th className="text-right p-4 font-semibold text-[#4A5568]">
                      Ratio / 100k hab
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topDepts.map((dept, idx) => (
                    <tr key={dept.code} className="border-b border-[#E2E8F0] hover:bg-[#F7FAFC]">
                      <td className="p-4 text-[#718096]">#{idx + 1}</td>
                      <td className="p-4">
                        <Link
                          href={`/departement/${dept.slug}`}
                          className="text-[#1E88E5] font-medium hover:underline"
                        >
                          {dept.code} - {dept.name}
                        </Link>
                      </td>
                      <td className="p-4 text-right font-semibold text-[#1A202C]">
                        {dept.count.toLocaleString('fr-FR')}
                      </td>
                      <td className="p-4 text-right text-[#718096]">
                        {dept.population
                          ? `${Math.round(dept.population / 1000)}k`
                          : 'N/A'}
                      </td>
                      <td className="p-4 text-right">
                        {dept.ratio ? (
                          <span
                            className={`font-semibold ${
                              dept.ratio >= nationalAvg
                                ? 'text-green-600'
                                : 'text-orange-600'
                            }`}
                          >
                            {dept.ratio}
                          </span>
                        ) : (
                          <span className="text-[#718096]">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Medical deserts */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-500" />
            Déserts médicaux (ratio IDEL / habitant le plus faible)
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-[#718096] mb-6">
              Départements avec la couverture IDEL la plus faible par rapport à la population.
              Moyenne nationale : environ {nationalAvg} IDEL pour 100 000 habitants.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {medicalDeserts.map((dept) => (
                <Link
                  key={dept.code}
                  href={`/departement/${dept.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] hover:border-orange-300 hover:bg-orange-50 transition-all group"
                >
                  <div>
                    <div className="font-semibold text-[#1A202C] group-hover:text-orange-600">
                      {dept.code} - {dept.name}
                    </div>
                    <div className="text-xs text-[#718096]">
                      {dept.count.toLocaleString('fr-FR')} IDEL
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{dept.ratio}</div>
                    <div className="text-xs text-[#718096]">/ 100k hab</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top 20 cities */}
        <section>
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#1E88E5]" />
            Top 20 villes par nombre d'IDEL
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {topCities.map((city, idx) => (
                <Link
                  key={city.slug}
                  href={`/ville/${city.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] hover:border-[#1E88E5] hover:bg-[#E3F2FD] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1E88E5] font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A202C] group-hover:text-[#1E88E5]">
                        {city.name}
                      </div>
                      <div className="text-xs text-[#718096]">
                        {city.departmentName} ({city.departmentCode})
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#1E88E5]">
                    {city.count.toLocaleString('fr-FR')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#1E88E5]">
          <h3 className="text-lg font-bold text-[#1A202C] mb-4">Sources des données</h3>
          <ul className="space-y-2 text-sm text-[#4A5568]">
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5]">•</span>
              <span>
                <strong>RPPS (Répertoire Partagé des Professionnels de Santé)</strong> :{' '}
                <a
                  href="https://www.data.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E88E5] hover:underline"
                >
                  data.gouv.fr
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5]">•</span>
              <span>
                <strong>Populations départements et villes</strong> : INSEE, estimations 2024
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5]">•</span>
              <span>
                <strong>Mise à jour</strong> : Mars 2026
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
