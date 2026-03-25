import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Calendar } from 'lucide-react'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog'
import { breadcrumbSchema } from '@/lib/schemas'
import { addInternalLinks, getReadingTime } from '@/lib/internal-links'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
    alternates: { canonical: `https://medicaly.fr/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://medicaly.fr' },
    { name: 'Blog', url: 'https://medicaly.fr/blog' },
    { name: post.title, url: `https://medicaly.fr/blog/${slug}` },
  ])

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `https://medicaly.fr/blog/${slug}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: 'Équipe éditoriale Medicaly',
      url: 'https://medicaly.fr/redaction',
    },
    publisher: { '@type': 'Organization', name: 'Medicaly', url: 'https://medicaly.fr', logo: { '@type': 'ImageObject', url: 'https://medicaly.fr/icon.svg' } },
    mainEntityOfPage: `https://medicaly.fr/blog/${slug}`,
  }

  // Extract TOC from h2 and h3 headings
  const tocItems: { id: string; title: string; level: number }[] = []
  post.content.split('\n\n').forEach(block => {
    if (block.startsWith('### ')) {
      const title = block.slice(4).trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      tocItems.push({ id, title, level: 3 })
    } else if (block.startsWith('## ')) {
      const title = block.slice(3).trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      tocItems.push({ id, title, level: 2 })
    }
  })

  // Simple markdown to HTML (headers, bold, lists, tables, paragraphs)
  const htmlContent = post.content
    .split('\n\n')
    .map(block => {
      if (block.startsWith('### ')) {
        const t = block.slice(4).trim()
        const hid = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return `<h3 id="${hid}" class="text-lg font-bold text-[#1A202C] mt-6 mb-3">${t}</h3>`
      }
      if (block.startsWith('## ')) {
        const title = block.slice(3).trim()
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return `<h2 id="${id}" class="text-xl font-bold text-[#1A202C] mt-8 mb-4">${title}</h2>`
      }
      if (block.includes('|') && block.includes('---')) {
        const rows = block.split('\n').filter(r => !r.includes('---'))
        const headers = rows[0]?.split('|').filter(Boolean).map(h => h.trim()) || []
        const body = rows.slice(1).map(r => r.split('|').filter(Boolean).map(c => c.trim()))
        return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border-collapse">
          <thead><tr>${headers.map(h => `<th class="text-left p-2 border-b border-[#E2E8F0] font-semibold text-[#1A202C]">${h}</th>`).join('')}</tr></thead>
          <tbody>${body.map(row => `<tr>${row.map(c => `<td class="p-2 border-b border-[#E2E8F0] text-[#4A5568]">${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`
      }
      if (block.startsWith('- ') || block.startsWith('1. ')) {
        const items = block.split('\n').map(line => {
          const text = line.replace(/^[-\d.]+\s*/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          return `<li class="text-[#4A5568] leading-relaxed">${text}</li>`
        })
        return `<ul class="list-disc list-inside space-y-1 my-3">${items.join('')}</ul>`
      }
      const text = block.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#1A202C]">$1</strong>')
      return `<p class="text-[#4A5568] leading-relaxed my-3">${text}</p>`
    })
    .join('')

  // Add internal links + reading time
  const linkedContent = addInternalLinks(htmlContent)
  const readingTime = getReadingTime(post.content)

  // Other posts for sidebar
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-[#1E88E5]">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">{post.title}</span>
        </nav>

        <article className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          {/* Hero image */}
          {post.heroImage ? (
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-[#1A202C] text-xs font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="relative h-48 md:h-64 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${post.heroColor}, ${post.heroColorTo})` }}
            >
              <span className="text-7xl md:text-8xl opacity-80">{post.heroEmoji}</span>
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs text-[#718096] mb-4 flex-wrap">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              <span className="mx-1">·</span>
              <span>Mis à jour le {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="mx-1">·</span>
              <span>{post.category}</span>
              <span className="mx-1">·</span>
              <span>{readingTime} min de lecture</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-6">{post.title}</h1>

            {/* Table of contents */}
            {tocItems.length > 3 && (
              <nav className="bg-[#F7FAFC] rounded-lg p-4 mb-8 border border-[#E2E8F0]">
                <div className="text-sm font-semibold text-[#1A202C] mb-2">Sommaire</div>
                <ol className="space-y-1">
                  {tocItems.map((item, i) => (
                    <li key={i} className={item.level === 3 ? 'ml-4' : ''}>
                      <a href={`#${item.id}`} className="text-sm text-[#1E88E5] hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="text-sm" dangerouslySetInnerHTML={{ __html: linkedContent }} />

            {/* Sources */}
            <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-semibold text-[#718096] mb-3 uppercase tracking-wide">Sources et références</div>
              <div className="bg-[#F7FAFC] rounded-lg p-4 text-xs text-[#718096] space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a href="https://www.ameli.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1E88E5] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] flex-shrink-0" />
                    ameli.fr - Assurance Maladie
                  </a>
                  <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1E88E5] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] flex-shrink-0" />
                    service-public.fr
                  </a>
                  <a href="https://www.has-sante.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1E88E5] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] flex-shrink-0" />
                    has-sante.fr - Haute Autorité de Santé
                  </a>
                  <a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1E88E5] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] flex-shrink-0" />
                    legifrance.gouv.fr
                  </a>
                </div>
              </div>
            </div>

            {/* Editorial link */}
            <div className="mt-4 text-xs text-[#718096] flex items-center gap-2">
              <span>Rédigé par</span>
              <Link href="/redaction" className="text-[#1E88E5] hover:underline font-medium">
                l&apos;équipe éditoriale Medicaly
              </Link>
              <span className="mx-1">·</span>
              <Link href="/redaction" className="text-[#1E88E5] hover:underline">
                Découvrir notre équipe éditoriale
              </Link>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-xl p-6 text-center text-white mt-8">
          <h2 className="text-lg font-bold mb-2">Trouvez un infirmier à domicile</h2>
          <p className="text-blue-100 text-sm mb-4">Plus de 100 000 IDEL référencés dans toute la France.</p>
          <Link
            href="/recherche"
            className="inline-flex items-center gap-2 bg-white text-[#1E88E5] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Rechercher un infirmier
          </Link>
        </div>

        {/* Other posts */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#1A202C] mb-4">Autres articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPosts.slice(0, 3).map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#1E88E5] hover:shadow-sm transition-all group"
              >
                {p.heroImage ? (
                  <div className="h-24 overflow-hidden">
                    <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div
                    className="h-24 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${p.heroColor}, ${p.heroColorTo})` }}
                  >
                    <span className="text-3xl opacity-80">{p.heroEmoji}</span>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-[#1A202C] group-hover:text-[#1E88E5] transition-colors mb-1 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#718096] line-clamp-2">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
