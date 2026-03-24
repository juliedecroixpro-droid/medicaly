import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Medicaly.fr, annuaire des infirmiers libéraux en France.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Mentions légales</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A202C] mb-6">Mentions légales</h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6 text-sm text-[#4A5568] leading-relaxed">
        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Editeur du site</h2>
          <p>Le site medicaly.fr est edite par Medicaly.</p>
          <p>Adresse : France</p>
          <p>Email : contact@medicaly.fr</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Hebergement</h2>
          <p>Le site est heberge par Vercel Inc.</p>
          <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
          <p>Site : <a href="https://vercel.com" className="text-[#1E88E5] hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Propriete intellectuelle</h2>
          <p>L&apos;ensemble du contenu du site (textes, graphismes, logos, icones) est la propriete de Medicaly ou de ses partenaires. Toute reproduction est interdite sans autorisation prealable.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Donnees personnelles</h2>
          <p>Les données personnelles collectees via le formulaire de demande de prise en charge sont utilisees uniquement pour vous mettre en relation avec un professionnel de sante. Consultez notre <Link href="/confidentialite" className="text-[#1E88E5] hover:underline">politique de confidentialité</Link> pour plus d&apos;informations.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Source des données</h2>
          <p>Les informations sur les infirmiers libéraux proviennent du RPPS (Repertoire Partage des Professionnels de Sante), base de données publique mise a disposition par le Ministere de la Sante via <a href="https://data.gouv.fr" className="text-[#1E88E5] hover:underline" target="_blank" rel="noopener noreferrer">data.gouv.fr</a>.</p>
        </section>

        <section>
          <h2 className="font-bold text-[#1A202C] mb-2">Responsabilite</h2>
          <p>Medicaly s&apos;efforce de fournir des informations exactes et a jour. Toutefois, Medicaly ne saurait etre tenu responsable des erreurs, omissions ou résultats obtenus suite a l&apos;utilisation de ces informations.</p>
        </section>
      </div>
    </div>
  )
}
