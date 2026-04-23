const VALUES = [
  { title: 'Build Daily', blurb: 'Consistency over intensity. Show up and ship.' },
  { title: 'Speed Over Perfection', blurb: 'Action creates clarity. Iterate in public.' },
  { title: 'Best Tool for the Job', blurb: 'No loyalty to tools. Use what works now.' },
  { title: 'Learn in Public', blurb: 'Share what worked, what didn’t, and why.' },
  { title: 'Help the Community Win', blurb: 'Teach, support, push each other forward.' },
];

export function LogoRow() {
  return (
    <section
      id="values"
      style={{
        padding: '24px 32px 72px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
        }}
      >
        How we show up
      </span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginTop: 20,
          borderTop: '1px solid var(--border-1)',
          paddingTop: 24,
        }}
      >
        {VALUES.map((value, i) => (
          <div
            key={value.title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--orange-500)',
                letterSpacing: '0.08em',
              }}
            >
              0{i + 1}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                letterSpacing: '-0.02em',
                color: 'var(--fg-1)',
                lineHeight: 1.15,
              }}
            >
              {value.title}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.5,
                color: 'var(--fg-2)',
              }}
            >
              {value.blurb}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
