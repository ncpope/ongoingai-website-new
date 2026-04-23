const DISCORD_URL = 'https://discord.gg/HQKMcrVrxj';
const YOUTUBE_URL =
  'https://www.youtube.com/channel/UCusiu-uFL2PAtdGIaGg7PZw?sub_confirmation=1';

export function CTABanner() {
  return (
    <section style={{ padding: '32px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: 'var(--orange-400)',
          border: '1px solid var(--ink-900)',
          borderRadius: 14,
          padding: '64px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 480px' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--ink-900)',
              textWrap: 'pretty',
            }}
          >
            Build the thing.
            <br />
            Join the builders.
          </h2>
          <p
            style={{
              margin: '16px 0 0',
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              lineHeight: 1.55,
              color: 'var(--ink-800)',
              maxWidth: 480,
            }}
          >
            Free to join. Bring whatever tools you&rsquo;re already using.
            Come meet the builders showing up every day.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexDirection: 'column',
            alignItems: 'stretch',
            minWidth: 240,
          }}
        >
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--ink-900)',
              color: 'var(--ink-50)',
              border: 'none',
              padding: '16px 24px',
              borderRadius: 10,
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Join the Discord →
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: 'var(--ink-900)',
              border: '1px solid var(--ink-900)',
              padding: '15px 24px',
              borderRadius: 10,
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Subscribe on YouTube
          </a>
          <a
            href="/newsletter"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ink-800)',
              textAlign: 'center',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            or get the newsletter →
          </a>
        </div>
      </div>
    </section>
  );
}
