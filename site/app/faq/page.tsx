import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { faqSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes sur les soins infirmiers à domicile',
  description: 'Toutes les réponses à vos questions sur les soins infirmiers à domicile : tarifs, remboursement, BSI, ordonnance, urgences. Guide complet.',
  alternates: { canonical: 'https://medicaly.fr/faq' },
}

const FAQ_SECTIONS = [
  {
    title: 'Trouver un infirmier',
    faqs: [
      {
        question: 'Comment trouver un infirmier à domicile près de chez moi ?',
        answer: 'Utilisez la barre de recherche Medicaly en entrant votre ville, code postal ou département. Vous verrez la liste de tous les infirmiers libéraux (IDEL) disponibles dans votre secteur avec leurs coordonnées complètes.',
      },
      {
        question: 'Faut-il une ordonnance pour faire appel à un infirmier à domicile ?',
        answer: 'Oui, dans la plupart des cas. Une ordonnance médicale est nécessaire pour que les soins soient pris en charge par l\'Assurance Maladie. Seule exception : la vaccination antigrippale pour les personnes à risque, que l\'IDEL peut réaliser sans ordonnance.',
      },
      {
        question: 'Peut-on choisir son infirmier libéral ?',
        answer: 'Oui, absolument. Vous êtes libre de choisir l\'IDEL de votre choix. Sur Medicaly, vous pouvez comparer les infirmiers de votre secteur et les contacter directement.',
      },
      {
        question: 'L\'infirmier se déplace-t-il le week-end et les jours fériés ?',
        answer: 'Oui, les IDEL assurent la continuité des soins 7 jours sur 7, y compris les dimanches et jours fériés. Une majoration de 8,50 EUR s\'applique pour les passages le dimanche et les jours fériés.',
      },
      {
        question: 'Que faire si j\'ai besoin d\'un infirmier en urgence la nuit ?',
        answer: 'Contactez le 15 (SAMU) pour une urgence médicale. Pour des soins infirmiers urgents mais non vitaux, certains IDEL proposent une astreinte de nuit. Vous pouvez aussi contacter un service de soins infirmiers à domicile (SSIAD) ou l\'hospitalisation à domicile (HAD).',
      },
    ],
  },
  {
    title: 'Tarifs et remboursement',
    faqs: [
      {
        question: 'Combien coûtent les soins infirmiers à domicile ?',
        answer: 'Les tarifs sont fixés par la convention nationale. Exemples : injection 3,15 EUR, pansement simple 6,30 EUR, prise de sang 4,73 EUR, perfusion 12,60 EUR. Consultez notre page Tarifs pour la grille complète.',
      },
      {
        question: 'Les soins infirmiers sont-ils remboursés ?',
        answer: 'Oui, les soins prescrits par un médecin sont pris en charge à 60% par l\'Assurance Maladie. Les 40% restants sont couverts par votre mutuelle. En ALD (Affection Longue Durée), la prise en charge est de 100%.',
      },
      {
        question: 'Qu\'est-ce que le tiers payant ?',
        answer: 'Le tiers payant signifie que vous n\'avancez aucun frais. L\'infirmier facture directement l\'Assurance Maladie et votre mutuelle. La quasi-totalité des IDEL le pratiquent.',
      },
      {
        question: 'Y a-t-il des frais de déplacement ?',
        answer: 'Oui, une indemnité forfaitaire de déplacement (IFD) de 2,50 EUR par passage est facturée, plus une indemnité kilométrique (IK) de 0,35 EUR/km au-delà de 2 km. Ces frais sont également pris en charge par l\'Assurance Maladie.',
      },
    ],
  },
  {
    title: 'Types de soins',
    faqs: [
      {
        question: 'Quels soins un infirmier peut-il réaliser à domicile ?',
        answer: 'Les IDEL réalisent une grande variété de soins : injections, pansements, prises de sang, perfusions, chimiothérapie, nursing et toilette, surveillance du diabète, distribution de médicaments, soins de sondes et stomies, vaccination, soins post-opératoires, soins palliatifs, et bien plus.',
      },
      {
        question: 'Qu\'est-ce que le BSI (Bilan de Soins Infirmiers) ?',
        answer: 'Le BSI est un forfait quotidien qui couvre l\'ensemble des soins infirmiers pour les patients dépendants. Il existe 3 niveaux : BSI Léger (13 EUR/jour), BSI Intermédiaire (18,20 EUR/jour), BSI Lourd (28,70 EUR/jour). Il est prescrit par le médecin et pris en charge par l\'Assurance Maladie.',
      },
      {
        question: 'Un infirmier peut-il faire une prise de sang à domicile ?',
        answer: 'Oui, les prélèvements sanguins font partie des actes courants de l\'IDEL. Le tarif est de 4,73 EUR (AMI 1,5). L\'infirmier apporte le matériel et dépose les tubes au laboratoire d\'analyse.',
      },
      {
        question: 'L\'infirmier peut-il administrer une chimiothérapie à domicile ?',
        answer: 'Oui, sous certaines conditions : protocole validé par l\'oncologue, patient stable, dispositif d\'accès veineux adapté (chambre implantable, PICC line). La chimiothérapie à domicile est prise en charge à 100% en ALD.',
      },
    ],
  },
  {
    title: 'À propos de Medicaly',
    faqs: [
      {
        question: 'Medicaly est-il gratuit ?',
        answer: 'Oui, Medicaly est 100% gratuit pour les patients. Aucun abonnement, aucune commission, aucun frais caché. Vous recherchez un infirmier et le contactez directement.',
      },
      {
        question: 'D\'où viennent les données des infirmiers ?',
        answer: 'Nos données proviennent du RPPS (Répertoire Partagé des Professionnels de Santé), un fichier public officiel géré par l\'État. Il est mis à jour régulièrement et référence tous les professionnels de santé en exercice en France.',
      },
      {
        question: 'Comment signaler une erreur sur une fiche infirmier ?',
        answer: 'Les données proviennent du RPPS officiel. Si une information est incorrecte (adresse, téléphone), l\'infirmier concerné doit mettre à jour sa fiche directement auprès de l\'Ordre des Infirmiers ou de l\'ARS.',
      },
    ],
  },
]

export default function FaqPage() {
  const allFaqs = FAQ_SECTIONS.flatMap(s => s.faqs)
  const faqLd = faqSchema(allFaqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C]">FAQ</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">
          Questions fréquentes
        </h1>
        <p className="text-lg text-[#718096] mb-10">
          Tout ce que vous devez savoir sur les soins infirmiers à domicile
        </p>

        <div className="space-y-10">
          {FAQ_SECTIONS.map((section, si) => (
            <div key={si}>
              <h2 className="text-xl font-bold text-[#1A202C] mb-4 flex items-center gap-2">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.faqs.map((faq, fi) => (
                  <details key={fi} className="bg-white rounded-xl border border-[#E2E8F0] group">
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-[#1A202C] flex items-center justify-between hover:text-[#1E88E5] transition-colors list-none">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-5 h-5 text-[#A0AEC0] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-4 text-[#4A5568] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-8 text-center text-white mt-10">
          <h2 className="text-2xl font-bold mb-3">Vous n&apos;avez pas trouvé votre réponse ?</h2>
          <p className="mb-6 opacity-90">Consultez nos guides détaillés ou recherchez un infirmier près de chez vous</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/blog" className="inline-block bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Lire nos guides
            </Link>
            <Link href="/" className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/30">
              Rechercher un IDEL
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
