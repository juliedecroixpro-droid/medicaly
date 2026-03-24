import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Medicaly - Trouvez une infirmière à domicile près de chez vous'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(135deg, #1565C0, #1E88E5, #42A5F5)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            width: '65%',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <span style={{ fontSize: 52, color: 'white', fontWeight: 800 }}>+</span>
            <span style={{ fontSize: 44, color: 'white', fontWeight: 700 }}>medicaly</span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.3,
              marginBottom: '20px',
            }}
          >
            Trouvez une infirmière
            <br />
            à domicile près de chez vous
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.5,
              marginBottom: '32px',
            }}
          >
            Mise en relation gratuite entre patients
            <br />
            et infirmiers libéraux partout en France
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>100 000+</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Infirmiers</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>101</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Départements</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>Gratuit</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Sans engagement</span>
            </div>
          </div>
        </div>

        {/* Right side - visual element */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35%',
            padding: '40px',
          }}
        >
          {/* Nurse icon circle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '70px',
              background: 'rgba(255,255,255,0.15)',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.2)',
                fontSize: '48px',
              }}
            >
              🏥
            </div>
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.5)', margin: '8px 0' }}>⇅</div>

          {/* Patient icon circle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '70px',
              background: 'rgba(255,255,255,0.15)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.2)',
                fontSize: '48px',
              }}
            >
              🏠
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          medicaly.fr
        </div>
      </div>
    ),
    { ...size }
  )
}
