import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { faqSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Tarifs infirmier à domicile 2026 - Grille NGAP complète',
  description: 'Tarifs officiels des soins infirmiers à domicile en 2026. Grille NGAP complète : injections, pansements, perfusions, BSI, remboursément Sécurité sociale.',
}

export default function TarifsPage() {
  const faqs = [
    {
      question: 'Quel est le tarif d\'une injection à domicile ?',
      answer: 'Une injection sous-cutanee ou intramusculaire coute 3,15 EUR. Une injection intraveineuse coute 4,73 EUR. Ces tarifs sont remboursés a 60% par l\'Assurance Maladie, les 40% restants par votre mutuelle.',
    },
    {
      question: 'Les soins infirmiers à domicile sont-ils remboursés ?',
      answer: 'Oui, les soins infirmiers à domicile prescrits par un médecin sont pris en charge a 60% par l\'Assurance Maladie. En cas d\'ALD (Affection Longue Duree), la prise en charge est de 100%.',
    },
    {
      question: 'Qu\'est-ce que le tiers payant ?',
      answer: 'Le tiers payant signifie que vous n\'avancez aucun frais. L\'infirmier facture directement l\'Assurance Maladie et votre mutuelle. La quasi-totalite des IDEL le pratiquent.',
    },
    {
      question: 'Quel est le cout d\'un BSI ?',
      answer: 'Le BSI (Bilan de Soins Infirmiers) se decline en 3 forfaits quotidiens : BSI Leger (13 EUR/jour), BSI Intermédiaire (18,20 EUR/jour), BSI Lourd (28,70 EUR/jour). Il est pris en charge a 60% ou 100% selon votre situation.',
    },
  ]

  const faqLd = faqSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C]">Tarifs</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">
          Tarifs des soins infirmiers à domicile en 2026
        </h1>
        <p className="text-lg text-[#718096] mb-8">
          Grille complète des tarifs NGAP (Nomenclature Generale des Actes Professionnels) des infirmiers libéraux.
        </p>

        <div className="space-y-8">
          {/* Actes courants */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Actes courants (AMI)</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Soin</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Code</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#1A202C]">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Injection sous-cutanee ou intramusculaire</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 1</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">3,15 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Injection intraveineuse directe</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 1,5</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">4,73 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Prelevement par piqure veineuse</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 1,5</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">4,73 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Glycemie par prelevement capillaire</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 0,6</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">1,89 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Vaccination (acte + injection)</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 2</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">6,30 EUR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pansements */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Pansements (AIS)</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Soin</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Code</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#1A202C]">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Pansement simple</td>
                      <td className="py-3 px-4 text-[#718096]">AIS 1</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">3,15 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Pansement lourd et complexe</td>
                      <td className="py-3 px-4 text-[#718096]">AIS 3</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">9,45 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Pansement avec meche</td>
                      <td className="py-3 px-4 text-[#718096]">AIS 4</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">12,60 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Ablation de fils ou agrafes</td>
                      <td className="py-3 px-4 text-[#718096]">AIS 2</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">6,30 EUR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Perfusions */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Perfusions</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Soin</th>
                      <th className="text-left py-3 px-4 text-[#718096]">Code</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#1A202C]">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Pose de perfusion intraveineuse</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 4</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">12,60 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#4A5568]">Surveillance de perfusion (par passage)</td>
                      <td className="py-3 px-4 text-[#718096]">AMI 1,5</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">4,73 EUR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* BSI */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-4">
              <h2 className="text-xl font-bold">BSI (Bilan de Soins Infirmiers)</h2>
            </div>
            <div className="p-6">
              <p className="text-[#4A5568] mb-4">
                Le BSI est un forfait quotidien qui rémunère l'ensemble des soins infirmiers chez un patient dependant.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Niveau de dépendance</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Description</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#1A202C]">Tarif/jour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">BSI Leger</td>
                      <td className="py-3 px-4 text-[#4A5568]">Patient relativement autonome, soins ponctuels</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">13,00 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">BSI Intermédiaire</td>
                      <td className="py-3 px-4 text-[#4A5568]">Dependance partielle, soins quotidiens</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">18,20 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">BSI Lourd</td>
                      <td className="py-3 px-4 text-[#4A5568]">Grande dépendance, soins pluriquotidiens</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">28,70 EUR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#718096] mt-4">
                Le BSI couvre : soins d'hygiene, nursing, injections, pansements, surveillance, administration des traitements, prévention.
              </p>
            </div>
          </div>

          {/* Majorations */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#1E88E5] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Majorations et indemnites</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#1A202C]">Conditions</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#1A202C]">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">Dimanche et jours feries</td>
                      <td className="py-3 px-4 text-[#4A5568]">Soins realises un dimanche ou jour ferie</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">+8,50 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">Nuit (20h-8h)</td>
                      <td className="py-3 px-4 text-[#4A5568]">Soins realises entre 20h et 8h</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">+9,15 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">IFD (Indemnité de déplacement)</td>
                      <td className="py-3 px-4 text-[#4A5568]">Par déplacement à domicile</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">2,50 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#1A202C]">IK (Indemnité kilométrique)</td>
                      <td className="py-3 px-4 text-[#4A5568]">Au-dela de 2 km aller-retour</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1A202C]">0,35 EUR/km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Remboursement */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8">
            <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Remboursement par l'Assurance Maladie</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-1">Taux de remboursément standard</h3>
                <p className="text-[#4A5568]">
                  L'Assurance Maladie remboursé <strong>60%</strong> du tarif conventionnel. Les 40% restants sont couverts par votre mutuelle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-1">ALD (Affection Longue Duree)</h3>
                <p className="text-[#4A5568]">
                  Si vous etes en ALD (diabete, cancer, insuffisance cardiaque...), la prise en charge est de <strong>100%</strong> sans reste a charge.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-1">Tiers payant</h3>
                <p className="text-[#4A5568]">
                  La quasi-totalite des infirmiers libéraux pratiquent le tiers payant : vous n'avancez aucun frais, l'Assurance Maladie et votre mutuelle sont facturees directement.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
            <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Questions fréquentes</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-[#1A202C] mb-2">{faq.question}</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Trouvez un infirmier à domicile près de chez vous</h2>
            <p className="mb-6 opacity-90">Plus de 100 000 infirmiers libéraux référencés en France</p>
            <Link
              href="/"
              className="inline-block bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Rechercher un IDEL
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
