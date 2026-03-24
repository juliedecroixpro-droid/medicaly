import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de Medicaly.fr : collecte, traitement et protection de vos données personnelles.',
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Politique de confidentialité</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A202C] mb-6">Politique de confidentialité</h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6 text-sm text-[#4A5568] leading-relaxed">
        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Donnees collectees</h2>
          <p>Lors d&apos;une demande de prise en charge, nous collectons :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Prenom, nom</li>
            <li>Numéro de telephone</li>
            <li>Adresse email (optionnel)</li>
            <li>Code postal et ville</li>
            <li>Type de soins demandes</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Finalite du traitement</h2>
          <p>Vos données sont utilisees exclusivement pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Vous mettre en relation avec un infirmier libéral de votre secteur</li>
            <li>Vous recontacter concernant votre demande de soins</li>
            <li>Ameliorer notre service</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Base legale</h2>
          <p>Le traitement de vos données est fonde sur votre consentement (soumission du formulaire) conformement au RGPD (Reglement General sur la Protection des Donnees).</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Duree de conservation</h2>
          <p>Vos données sont conservees pour une duree maximale de 12 mois apres votre derniere interaction avec notre service.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Partage des données</h2>
          <p>Vos données ne sont jamais vendues a des tiers. Elles peuvent etre partagees uniquement avec les infirmiers libéraux dans le cadre de votre demande de prise en charge.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Vos droits</h2>
          <p>Conformement au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Droit d&apos;acces a vos données</li>
            <li>Droit de rectification</li>
            <li>Droit a l&apos;effacement</li>
            <li>Droit a la portabilite</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p className="mt-2">Pour exercer vos droits, contactez-nous a : contact@medicaly.fr</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Cookies</h2>
          <p>Medicaly n&apos;utilise pas de cookies de tracking ou de publicite. Seuls des cookies techniques essentiels au fonctionnement du site sont utilises.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Donnees des professionnels de sante</h2>
          <p>Les informations des infirmiers libéraux affichees sur Medicaly proviennent de données publiques (RPPS, data.gouv.fr). Tout professionnel souhaitant modifier ou supprimer sa fiche peut nous contacter a contact@medicaly.fr.</p>
        </section>
      </div>
    </div>
  )
}
