import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
  heroEmoji: string
  heroColor: string
  heroColorTo: string
  heroImage?: string
  category: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  heroEmoji: string
  heroColor: string
  heroColorTo: string
  heroImage?: string
  category: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

let _posts: BlogPost[] | null = null

function parsePost(filename: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      content: content.trim(),
      heroEmoji: data.heroEmoji || '📝',
      heroColor: data.heroColor || '#1565C0',
      heroColorTo: data.heroColorTo || '#42A5F5',
      heroImage: data.heroImage || undefined,
      category: data.category || 'Guide pratique',
    }
  } catch {
    return null
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (_posts) return _posts
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse()

  _posts = files
    .map(f => parsePost(f))
    .filter((p): p is BlogPost => p !== null)

  return _posts
}

export const BLOG_POSTS = getAllBlogPosts()

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find(p => p.slug === slug)
}

// Lightweight meta (no content, no fs) for edge-compatible components
export function getBlogPostMeta(slug: string): BlogPostMeta | undefined {
  const post = getAllBlogPosts().find(p => p.slug === slug)
  if (!post) return undefined
  const { content, ...meta } = post
  return meta
}

export function getAllBlogPostMeta(): BlogPostMeta[] {
  return getAllBlogPosts().map(({ content, ...meta }) => meta)
}
