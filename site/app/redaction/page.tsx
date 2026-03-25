import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Shield, FileCheck, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notre équipe éditoriale - Medicaly',
  description:
    'Découvrez l\'équipe éditoriale de Medicaly : professionnels de santé et experts en communication médicale qui rédigent et vérifient nos contenus.',
  alternates: { canonical: 'https://medicaly.fr/redaction' },
}

export default function RedactionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E3F2FD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Medicaly',
            url: 'https://medicaly.fr',
            logo: 'https://medicaly.fr/icon.svg',
            description:
              'Annuaire des infirmiers libéraux en France, contenus vérifiés par des professionnels de santé',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: 'French',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Notre équipe éditoriale</h1>
          </div>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto">
            Des professionnels de la communication médicale au service d'une information fiable et
            accessible sur les soins infirmiers à domicile.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Qui sommes-nous */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#1E88E5]" />
            Qui sommes-nous ?
          </h2>
          <div className="text-[#4A5568] space-y-4 leading-relaxed">
            <p>
              L'équipe éditoriale de Medicaly est composée de{' '}
              <strong>professionnels de la communication médicale</strong> spécialisés dans la
              vulgarisation des soins infirmiers. Nous travaillons en étroite collaboration avec
              des infirmiers diplômés d'État libéraux (IDEL) pour garantir l'exactitude et la
              pertinence de nos contenus.
            </p>
            <p>
              Notre mission : rendre l'information sur les soins infirmiers à domicile accessible,
              compréhensible et fiable pour tous les patients et leurs familles.
            </p>
          </div>
        </section>

        {/* Processus éditorial */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-[#1E88E5]" />
            Notre processus éditorial
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E88E5] font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-2">Recherche et documentation</h3>
                <p className="text-[#4A5568] text-sm">
                  Chaque article s'appuie sur des sources officielles : nomenclature NGAP,
                  recommandations de la Haute Autorité de Santé (HAS), documentation de
                  l'Assurance Maladie (ameli.fr), Code de la Santé Publique.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E88E5] font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-2">Rédaction</h3>
                <p className="text-[#4A5568] text-sm">
                  Nos rédacteurs spécialisés en santé rédigent des contenus clairs, structurés et
                  accessibles, en évitant le jargon médical inutile tout en maintenant la
                  précision technique.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E88E5] font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-2">Révision médicale</h3>
                <p className="text-[#4A5568] text-sm">
                  Nos contenus sont relus et validés par des infirmiers diplômés d'État en exercice
                  pour garantir leur exactitude médicale et leur pertinence pratique.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E88E5] font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A202C] mb-2">Mise à jour régulière</h3>
                <p className="text-[#4A5568] text-sm">
                  Les tarifs NGAP, les recommandations HAS et les réglementations évoluent. Nous
                  mettons à jour nos articles régulièrement pour refléter les dernières
                  informations officielles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos engagements */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#1E88E5]" />
            Nos engagements
          </h2>
          <ul className="space-y-3 text-[#4A5568]">
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] mt-1">✓</span>
              <span>
                <strong>Transparence :</strong> Nous citons toujours nos sources officielles et
                indiquons la date de mise à jour de chaque article.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] mt-1">✓</span>
              <span>
                <strong>Indépendance :</strong> Medicaly est un service gratuit sans publicité.
                Nous ne percevons aucune commission des IDEL référencés.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] mt-1">✓</span>
              <span>
                <strong>Accessibilité :</strong> Nous écrivons pour être compris par tous, sans
                jargon médical inutile.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] mt-1">✓</span>
              <span>
                <strong>Exactitude :</strong> Chaque information médicale est vérifiée et validée
                par des professionnels de santé.
              </span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-[#E3F2FD] rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-[#1A202C] mb-3">Une question sur nos contenus ?</h3>
          <p className="text-[#4A5568] mb-6">
            Vous avez repéré une erreur ou souhaitez suggérer un sujet d'article ?<br />
            Contactez notre équipe éditoriale.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Nous contacter
          </Link>
        </section>

        {/* Retour au blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1E88E5] font-medium hover:underline"
          >
            ← Retour au blog
          </Link>
        </div>
      </div>
    </div>
  )
}
