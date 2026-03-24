'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/soins', label: 'Soins' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/couverture', label: 'Couverture' },
  { href: '/departement', label: 'Départements' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/demande', label: 'Demande de prise en charge', cta: true },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#4A5568]" aria-label="Menu">
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-lg z-50 md:hidden">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.cta
                    ? 'bg-[#1E88E5] text-white text-center mt-2'
                    : 'text-[#4A5568] hover:bg-[#F7FAFC] hover:text-[#1E88E5]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
