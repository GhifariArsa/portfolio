import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon: same terminal-prompt glyph as icon.svg, sized for iOS.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#282c34',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 20 L31 32 L18 44"
            stroke="#98c379"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="34" y="38" width="16" height="6.5" rx="3" fill="#61afef" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
