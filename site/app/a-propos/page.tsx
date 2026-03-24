import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, MapPin, DollarSign, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'A propos de Medicaly - Notre mission',
  description: 'Medicaly est le plus grand annuaire d\'infirmiers libéraux en France. Plus de 100 000 IDEL référencés, gratuit et sans engagement.',
}

export default function AProposPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C]">A propos</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-6">
        A propos de Medicaly
      </h1>

      <div className="prose max-w-none space-y-8">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Notre mission</h2>
          <p className="text-[#4A5568] leading-relaxed">
            Medicaly est ne d'un constat simple : trouver un infirmier à domicile près de chez soi ne devrait pas etre un parcours du combattant. Nous avons donc cree <strong>l'annuaire le plus complet des infirmiers libéraux en France</strong>, accessible a tous, gratuitement.
          </p>
          <p className="text-[#4A5568] leading-relaxed mt-4">
            Notre ambition est de <strong>faciliter l'acces aux soins infirmiers à domicile</strong> pour tous les Francais, partout en France, en quelques clics.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Nos chiffres</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A202C]">100 978</div>
                <div className="text-sm text-[#718096]">Infirmiers libéraux référencés</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MapPin className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A202C]">101</div>
                <div className="text-sm text-[#718096]">Départements couverts</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A202C]">100% gratuit</div>
                <div className="text-sm text-[#718096]">Sans engagement ni frais caches</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-[#1E88E5]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A202C]">Donnees RPPS</div>
                <div className="text-sm text-[#718096]">Officielles et a jour</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Comment ca marche ?</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-2">1. Recherchez un IDEL</h3>
              <p className="text-[#4A5568]">
                Utilisez notre barre de recherche ou naviguez par département et ville pour trouver les infirmiers libéraux près de chez vous.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-2">2. Consultez les fiches</h3>
              <p className="text-[#4A5568]">
                Chaque fiche affiche les coordonnées complètes de l'IDEL : adresse du cabinet, numéro de telephone, numéro RPPS, soins proposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-2">3. Contactez directement</h3>
              <p className="text-[#4A5568]">
                Appelez ou rendez-vous directement au cabinet pour prendre rendez-vous. Aucun intermédiaire, aucun frais.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Nos valeurs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-1">Transparence</h3>
              <p className="text-[#4A5568]">
                Nos données proviennent du Repertoire Partage des Professionnels de Sante (RPPS), un fichier public et officiel. Nous ne censurons aucun professionnel.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-1">Gratuite</h3>
              <p className="text-[#4A5568]">
                Medicaly est et restera gratuit pour les patients. Aucun abonnement, aucune commission, aucun frais cache.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-1">Simplicite</h3>
              <p className="text-[#4A5568]">
                Pas d'inscription obligatoire, pas de formulaire a rallonge. Recherchez, trouvez, contactez. C'est tout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] mb-1">Exhaustivite</h3>
              <p className="text-[#4A5568]">
                Nous referencons TOUS les infirmiers libéraux en exercice en France (plus de 100 000), pas seulement une selection payante.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Une question ?</h2>
          <p className="text-[#4A5568] mb-4">
            Vous etes un patient, un IDEL ou un professionnel de sante ? Vous avez une question, une remarque, une suggestion ?
          </p>
          <p className="text-[#4A5568]">
            N'hesitez pas a nous contacter via notre page{' '}
            <Link href="/mentions-legales" className="text-[#1E88E5] hover:underline">mentions légales</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
