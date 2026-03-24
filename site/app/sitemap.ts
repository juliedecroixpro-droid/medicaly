import type { MetadataRoute } from 'next'
import { getAllDepartments, getAllCities, loadNurses } from '@/lib/data'
import { TOP_CITIES } from '@/lib/cities-top'
import { BLOG_POSTS } from '@/lib/blog'
import { SOINS } from '@/lib/soins'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://medicaly.fr'

  // Homepage
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/departement`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/soins`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tarifs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/couverture`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/demande`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/recherche`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    ...BLOG_POSTS.map(p => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // Soins pages
  const soinsPages = SOINS.flatMap(s => [
    { url: `${baseUrl}/soins/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...TOP_CITIES.map(c => ({
      url: `${baseUrl}/soins/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ])

  // Departments (103 pages)
  const departments = getAllDepartments().map(d => ({
    url: `${baseUrl}/departement/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Landing pages SEO (50 pages)
  const landings = TOP_CITIES.map(c => ({
    url: `${baseUrl}/infirmiere-a-domicile/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Cities (top 2000 by nurse count to keep sitemap manageable)
  const allCities = getAllCities()
    .sort((a, b) => b.count - a.count)
    .slice(0, 2000)
    .map(c => ({
      url: `${baseUrl}/ville/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  // Top nurses with phone (first 5000 for sitemap size limit)
  const nurses = loadNurses()
    .filter(n => n.phone || n.phone2)
    .slice(0, 5000)
    .map(n => ({
      url: `${baseUrl}/infirmier/${n.rpps}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }))

  return [...staticPages, ...soinsPages, ...departments, ...landings, ...allCities, ...nurses]
}
