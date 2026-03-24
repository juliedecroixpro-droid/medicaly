import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MobileMenu from './components/MobileMenu'
import HeaderSearch from '@/components/HeaderSearch'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Medicaly - Annuaire des infirmiers libéraux en France',
    template: '%s | Medicaly',
  },
  description:
    'Trouvez une infirmière à domicile en quelques clics. Medicaly met en relation patients et infirmiers libéraux partout en France. 100 000+ IDEL référencés, gratuit et sans engagement.',
  metadataBase: new URL('https://medicaly.fr'),
  alternates: { canonical: 'https://medicaly.fr' },
  openGraph: {
    type: 'website',
    siteName: 'Medicaly',
    locale: 'fr_FR',
    description: 'Besoin de soins à domicile ? Medicaly vous met en relation avec un(e) infirmier(e) libéral(e) près de chez vous. Gratuit, rapide, 100 000+ professionnels en France.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#1A202C]">
        <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm relative">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#1E88E5]">
              <span className="text-2xl">+</span>
              <span>medicaly</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#4A5568]">
              <Link href="/soins" className="hover:text-[#1E88E5] transition-colors">
                Soins
              </Link>
              <Link href="/tarifs" className="hover:text-[#1E88E5] transition-colors">
                Tarifs
              </Link>
              <Link href="/couverture" className="hover:text-[#1E88E5] transition-colors">
                Couverture
              </Link>
              <Link href="/departement" className="hover:text-[#1E88E5] transition-colors">
                Départements
              </Link>
              <Link href="/blog" className="hover:text-[#1E88E5] transition-colors">
                Blog
              </Link>
              <Link href="/a-propos" className="hover:text-[#1E88E5] transition-colors">
                A propos
              </Link>
              <HeaderSearch />
              <Link href="/demande" className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Prise en charge
              </Link>
            </nav>
            <div className="flex items-center gap-2 md:hidden">
              <HeaderSearch />
              <MobileMenu />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-[#E2E8F0] mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-[#718096]">
            <div>
              <div className="font-bold text-[#1E88E5] text-lg mb-2">
                <span>+</span> medicaly
              </div>
              <p className="mb-3">L&apos;annuaire le plus complet des infirmiers libéraux en France.</p>
              <p className="text-xs">Donnees RPPS : source data.gouv.fr</p>
            </div>
            <div>
              <div className="font-semibold text-[#1A202C] mb-3">Navigation</div>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-[#1E88E5]">Accueil</Link></li>
                <li><Link href="/soins" className="hover:text-[#1E88E5]">Soins à domicile</Link></li>
                <li><Link href="/tarifs" className="hover:text-[#1E88E5]">Tarifs NGAP 2026</Link></li>
                <li><Link href="/couverture" className="hover:text-[#1E88E5]">Couverture</Link></li>
                <li><Link href="/departement" className="hover:text-[#1E88E5]">Départements</Link></li>
                <li><Link href="/blog" className="hover:text-[#1E88E5]">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-[#1E88E5]">FAQ</Link></li>
                <li><Link href="/a-propos" className="hover:text-[#1E88E5]">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-[#1E88E5]">Contact</Link></li>
                <li><Link href="/demande" className="hover:text-[#1E88E5]">Demande de prise en charge</Link></li>
              </ul>
            </div>
            <div className="col-span-2">
              <div className="font-semibold text-[#1A202C] mb-3">Soins à domicile</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <Link href="/soins/pansements" className="hover:text-[#1E88E5]">Pansements</Link>
                <Link href="/soins/injections" className="hover:text-[#1E88E5]">Injections</Link>
                <Link href="/soins/vaccination-domicile" className="hover:text-[#1E88E5]">Vaccination</Link>
                <Link href="/soins/prises-de-sang" className="hover:text-[#1E88E5]">Prises de sang</Link>
                <Link href="/soins/perfusions" className="hover:text-[#1E88E5]">Perfusions</Link>
                <Link href="/soins/chimiotherapie-domicile" className="hover:text-[#1E88E5]">Chimiotherapie</Link>
                <Link href="/soins/nursing-toilette" className="hover:text-[#1E88E5]">Nursing / Toilette</Link>
                <Link href="/soins/surveillance-diabete" className="hover:text-[#1E88E5]">Diabete</Link>
                <Link href="/soins/surveillance-constantes" className="hover:text-[#1E88E5]">Constantes vitales</Link>
                <Link href="/soins/distribution-medicaments" className="hover:text-[#1E88E5]">Medicaments</Link>
                <Link href="/soins/soins-post-operatoires" className="hover:text-[#1E88E5]">Post-operatoire</Link>
                <Link href="/soins/ablation-fils-agrafes" className="hover:text-[#1E88E5]">Ablation fils</Link>
                <Link href="/soins/sondes-stomies" className="hover:text-[#1E88E5]">Sondes / Stomies</Link>
                <Link href="/soins/oxygenotherapie" className="hover:text-[#1E88E5]">Oxygenotherapie</Link>
                <Link href="/soins/soins-palliatifs" className="hover:text-[#1E88E5]">Soins palliatifs</Link>
              </div>
            </div>
            <div>
              <div className="font-semibold text-[#1A202C] mb-3">Grandes villes</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <Link href="/ville/paris-75001" className="hover:text-[#1E88E5]">Paris</Link>
                <Link href="/ville/marseille-13001" className="hover:text-[#1E88E5]">Marseille</Link>
                <Link href="/ville/lyon-69001" className="hover:text-[#1E88E5]">Lyon</Link>
                <Link href="/ville/toulouse-31000" className="hover:text-[#1E88E5]">Toulouse</Link>
                <Link href="/ville/nice-06000" className="hover:text-[#1E88E5]">Nice</Link>
                <Link href="/ville/nantes-44000" className="hover:text-[#1E88E5]">Nantes</Link>
                <Link href="/ville/montpellier-34000" className="hover:text-[#1E88E5]">Montpellier</Link>
                <Link href="/ville/strasbourg-67000" className="hover:text-[#1E88E5]">Strasbourg</Link>
                <Link href="/ville/bordeaux-33000" className="hover:text-[#1E88E5]">Bordeaux</Link>
                <Link href="/ville/lille-59000" className="hover:text-[#1E88E5]">Lille</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E2E8F0] py-4">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#718096]">
              <span>Medicaly 2026 - Tous droits réservés</span>
              <div className="flex items-center gap-4">
                <Link href="/faq" className="hover:text-[#1E88E5]">FAQ</Link>
                <Link href="/contact" className="hover:text-[#1E88E5]">Contact</Link>
                <Link href="/mentions-legales" className="hover:text-[#1E88E5]">Mentions légales</Link>
                <Link href="/confidentialite" className="hover:text-[#1E88E5]">Confidentialité</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
