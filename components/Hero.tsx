const DISCORD_URL = 'https://discord.gg/HQKMcrVrxj';

export function Hero() {
  return (
    <section
      style={{
        padding: '80px 32px 64px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          background: 'var(--orange-50)',
          border: '1px solid var(--orange-200)',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--orange-700)',
          marginBottom: 28,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'var(--orange-500)',
          }}
        />
        New community · Free to join
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 9vw, 88px)',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--fg-1)',
          maxWidth: 980,
        }}
      >
        Build with AI.<br />
        <em style={{ fontStyle: 'italic' }}>Every</em> day.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 19,
          lineHeight: 1.55,
          color: 'var(--fg-2)',
          maxWidth: 640,
          marginTop: 24,
          textWrap: 'pretty',
        }}
      >
        OngoingAI is a community for people who create with AI daily —
        sharing real work, learning in public, and pulling each other
        forward. No gatekeeping, no guru act. Just builders helping
        builders ship.
      </p>
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 36,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'var(--orange-400)',
            color: 'var(--fg-on-accent)',
            border: '1px solid var(--ink-900)',
            padding: '14px 22px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Join the Discord →
        </a>
        <a
          href="/newsletter"
          style={{
            background: 'transparent',
            color: 'var(--fg-1)',
            border: '1px solid var(--border-2)',
            padding: '14px 22px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Get the newsletter
        </a>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            marginLeft: 8,
            letterSpacing: '0.04em',
          }}
        >
          We stream daily on YouTube
        </span>
      </div>
    </section>
  );
}
