import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0b1825',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: '#c39c5f',
            fontWeight: 700,
            fontSize: 76,
            fontFamily: 'serif',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          SK
        </span>
      </div>
    ),
    { width: 180, height: 180 }
  )
}
