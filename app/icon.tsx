import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0b1825',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: '#c39c5f',
            fontWeight: 700,
            fontSize: 13,
            fontFamily: 'serif',
            letterSpacing: '-0.5px',
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          SK
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  )
}
