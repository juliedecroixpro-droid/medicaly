import type { MetadataRoute } from 'next'

// For LLMs: See /llms.txt for structured data about this site
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/recherche'],
      },
    ],
    sitemap: 'https://medicaly.fr/sitemap.xml',
  }
}
