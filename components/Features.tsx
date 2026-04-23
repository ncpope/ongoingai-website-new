import { CalendarCheck, Wrench, Users, type LucideIcon } from 'lucide-react';

type Tone = 'paper' | 'hero' | 'ink';

type UniqueCardProps = {
  icon: LucideIcon;
  number: string;
  title: string;
  body: string;
  tone?: Tone;
};

function UniqueCard({ icon: Icon, number, title, body, tone = 'paper' }: UniqueCardProps) {
  const toneStyles: Record<Tone, React.CSSProperties> = {
    paper: {
      background: 'var(--bg-elevated)',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-1)',
    },
    hero: {
      background: 'var(--orange-400)',
      color: 'var(--fg-on-accent)',
      border: '1px solid var(--ink-900)',
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--ink-50)',
      border: '1px solid var(--ink-900)',
    },
  };

  return (
    <div
      style={{
        ...toneStyles[tone],
        borderRadius: 14,
        padding: '28px 28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Icon size={26} strokeWidth={1.5} color="currentColor" />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.12em',
            opacity: 0.65,
          }}
        >
          {number}
        </span>
      </div>
      <h3
        style={{
          margin: '4px 0 0',
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: 'inherit',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          lineHeight: 1.55,
          color: tone === 'paper' ? 'var(--fg-2)' : 'inherit',
          opacity: tone === 'paper' ? 1 : 0.88,
          textWrap: 'pretty',
        }}
      >
        {body}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="community"
      style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--orange-500)',
        }}
      >
        What makes this different
      </span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5.5vw, 48px)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: '12px 0 48px',
          color: 'var(--fg-1)',
          maxWidth: 820,
        }}
      >
        It&rsquo;s not a hub. It&rsquo;s a <em style={{ fontStyle: 'italic' }}>habit</em>.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        <UniqueCard
          icon={CalendarCheck}
          number="01"
          title="A daily builder environment"
          body="This isn&rsquo;t a content feed you scroll. It&rsquo;s a rhythm that puts you in a seat and helps you ship something — today, tomorrow, the day after."
        />
        <UniqueCard
          icon={Wrench}
          number="02"
          title="Tool-agnostic, always current"
          body="No loyalty to any one tool or platform. We adopt what&rsquo;s working this week and teach it while it&rsquo;s still fresh."
          tone="hero"
        />
        <UniqueCard
          icon={Users}
          number="03"
          title="Build in public, grow faster"
          body="Share real work. Get real feedback. Improve faster because you&rsquo;re surrounded by people doing the same thing."
          tone="ink"
        />
      </div>
    </section>
  );
}
