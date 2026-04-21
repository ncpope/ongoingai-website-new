export function Testimonial() {
  return (
    <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <blockquote
        style={{
          margin: 0,
          padding: 0,
          borderLeft: '3px solid var(--orange-400)',
          paddingLeft: 32,
          maxWidth: 880,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--fg-1)',
            margin: 0,
            textWrap: 'pretty',
          }}
        >
          &ldquo;I&apos;d never written a line of code before this year. I got
          four prototypes out in a weekend. Three were trash. The one that
          shipped, shipped — and I still have the other three sitting in
          branches. That&apos;s the whole thing.&rdquo;
        </p>
        <footer
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: 'var(--orange-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              color: 'var(--orange-800)',
            }}
          >
            R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--fg-1)',
              }}
            >
              Ren Takahashi
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--fg-3)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Vibe coder · Kindling
            </span>
          </div>
        </footer>
      </blockquote>
    </section>
  );
}
