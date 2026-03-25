import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog'

export const runtime = 'nodejs'
export const alt = 'Article Medicaly'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#1E88E5', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 48 }}>
        Medicaly
      </div>,
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          background: `linear-gradient(135deg, ${post.heroColor}, ${post.heroColorTo})`,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            width: '70%',
          }}
        >
          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                padding: '6px 16px',
                borderRadius: '20px',
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {post.title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.5,
              maxWidth: '600px',
            }}
          >
            {post.description.slice(0, 120)}...
          </div>
        </div>

        {/* Emoji */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30%',
            fontSize: 120,
            opacity: 0.6,
          }}
        >
          {post.heroEmoji}
        </div>

        {/* Bottom bar with logo */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '60px',
            right: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: 24, fontWeight: 700 }}>
            <span style={{ fontSize: 28 }}>+</span>
            <span>medicaly</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            medicaly.fr/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
