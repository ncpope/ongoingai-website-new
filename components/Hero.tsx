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
        A home for vibe coders
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
        Anyone can <em style={{ fontStyle: 'italic' }}>build</em> now.<br />
        We make sure it sticks.
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
        Vibe coding is the future — and it&apos;s already here. OngoingAI helps
        a new generation of builders turn ideas into real software, without
        years of training or a team behind them. Every change is a branch.
        Every branch is a checkpoint. Try anything, lose nothing.
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
        <button
          style={{
            background: 'var(--orange-400)',
            color: 'var(--fg-on-accent)',
            border: '1px solid var(--ink-900)',
            padding: '14px 22px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Start building →
        </button>
        <button
          style={{
            background: 'transparent',
            color: 'var(--fg-1)',
            border: '1px solid var(--border-2)',
            padding: '14px 22px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Join the community
        </button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            marginLeft: 8,
            letterSpacing: '0.04em',
          }}
        >
          ⌘K · install in 30s
        </span>
      </div>
    </section>
  );
}
