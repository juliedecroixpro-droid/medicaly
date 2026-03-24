import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Mail, MessageSquare, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Medicaly',
  description: 'Contactez l\'équipe Medicaly pour toute question, suggestion ou signalement. Nous sommes à votre écoute.',
  alternates: { canonical: 'https://medicaly.fr/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C]">Contact</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">
        Nous contacter
      </h1>
      <p className="text-lg text-[#718096] mb-10">
        Une question, une suggestion, un signalement ? Nous sommes à votre écoute.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-[#1E88E5]" />
            </div>
            <h2 className="text-lg font-bold text-[#1A202C]">Par email</h2>
          </div>
          <p className="text-[#4A5568] text-sm mb-3">
            Pour toute question générale, suggestion d&apos;amélioration ou demande de partenariat.
          </p>
          <a href="mailto:contact@medicaly.fr" className="text-[#1E88E5] font-medium hover:underline">
            contact@medicaly.fr
          </a>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-lg font-bold text-[#1A202C]">Signaler une erreur</h2>
          </div>
          <p className="text-[#4A5568] text-sm mb-3">
            Les données proviennent du RPPS (fichier officiel). Si une fiche contient une erreur, l&apos;infirmier concerné doit mettre à jour ses informations auprès de l&apos;Ordre des Infirmiers.
          </p>
          <a href="https://www.ordre-infirmiers.fr" target="_blank" rel="noopener noreferrer" className="text-[#1E88E5] font-medium hover:underline">
            Ordre des Infirmiers →
          </a>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-[#1A202C]">Vous êtes infirmier(e) ?</h2>
          </div>
          <p className="text-[#4A5568] text-sm mb-3">
            Vous souhaitez enrichir votre fiche (photo, horaires, spécialités) ou nous signaler un problème ?
          </p>
          <a href="mailto:pro@medicaly.fr" className="text-[#1E88E5] font-medium hover:underline">
            pro@medicaly.fr
          </a>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-lg font-bold text-[#1A202C]">FAQ</h2>
          </div>
          <p className="text-[#4A5568] text-sm mb-3">
            Consultez notre page de questions fréquentes avant de nous contacter. Vous y trouverez peut-être votre réponse.
          </p>
          <Link href="/faq" className="text-[#1E88E5] font-medium hover:underline">
            Consulter la FAQ →
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 text-center">
        <h2 className="text-xl font-bold text-[#1A202C] mb-2">Temps de réponse</h2>
        <p className="text-[#4A5568]">
          Nous nous efforçons de répondre à tous les emails sous 48 heures ouvrées.
        </p>
      </div>
    </div>
  )
}
