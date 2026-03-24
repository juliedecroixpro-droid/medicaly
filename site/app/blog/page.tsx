import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - Soins infirmiers à domicile',
  description: 'Guides et conseils sur les soins infirmiers à domicile : tarifs, remboursément, demarches, BSI. Tout pour comprendre les soins IDEL.',
  alternates: { canonical: 'https://medicaly.fr/blog' },
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Blog</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#1A202C] mb-2">Blog Medicaly</h1>
      <p className="text-[#718096] mb-8">Guides et conseils sur les soins infirmiers à domicile</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#1E88E5] hover:shadow-md transition-all group"
          >
            <div
              className="h-36 flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${post.heroColor}, ${post.heroColorTo})` }}
            >
              <span className="text-5xl opacity-80">{post.heroEmoji}</span>
              <div className="absolute top-3 left-3">
                <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-[#718096] mb-2">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <h2 className="text-base font-bold text-[#1A202C] group-hover:text-[#1E88E5] transition-colors mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed line-clamp-2">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
