import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl font-bold text-[#1E88E5] mb-4">404</div>
      <h1 className="text-2xl font-bold text-[#1A202C] mb-4">Page introuvable</h1>
      <p className="text-[#718096] mb-8">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  )
}
