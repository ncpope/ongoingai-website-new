export function LogoRow() {
  const names = ['Kindling', 'Overcast', 'Mercato', 'Northfield', 'Penny', 'Halcyon'];
  return (
    <section
      style={{
        padding: '24px 32px 56px',
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
        Builders already shipping with OngoingAI
      </span>
      <div
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          marginTop: 18,
          flexWrap: 'wrap',
        }}
      >
        {names.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              letterSpacing: '-0.02em',
              color: 'var(--fg-3)',
              opacity: 0.85,
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
