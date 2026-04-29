import { Eye, ListChecks, FileText, type LucideIcon } from 'lucide-react';

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
      id="how-it-works"
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
        How it works
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
        Audit, plan, <em style={{ fontStyle: 'italic' }}>publish</em>.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        <UniqueCard
          icon={Eye}
          number="01"
          title="See what LLMs see"
          body="Free site scan surfaces every page&rsquo;s citability — title shape, answer structure, missing alt text, OG tags, thin content, intent cannibalization. The audit you&rsquo;d do by hand if you had a week."
        />
        <UniqueCard
          icon={ListChecks}
          number="02"
          title="Plans, not problems"
          body="A prioritized list of pages to write — with the literal Q&A blocks LLMs lift, the structural rules that make them citable, and the evidence to gather. You leave knowing exactly what to build this week."
          tone="hero"
        />
        <UniqueCard
          icon={FileText}
          number="03"
          title="Grounded in your thinking"
          body="Upload your ICP, positioning, and brand docs. Every suggestion ties back to a doc by name. No keyword lists, no generic SaaS copy — just what your audience needs to hear from you."
          tone="ink"
        />
      </div>
    </section>
  );
}
