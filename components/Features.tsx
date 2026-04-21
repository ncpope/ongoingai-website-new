import {
  GitBranch,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  type LucideIcon,
} from 'lucide-react';

type Tone = 'paper' | 'hero' | 'ink';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: Tone;
};

function FeatureCard({ icon: Icon, title, body, tone = 'paper' }: FeatureCardProps) {
  const toneStyles: Record<Tone, React.CSSProperties> =
    {
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
        padding: '24px 24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Icon size={24} strokeWidth={1.5} color="currentColor" />
      <h3
        style={{
          margin: '4px 0 0',
          fontFamily: 'var(--font-sans)',
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'inherit',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: 1.55,
          color: tone === 'paper' ? 'var(--fg-2)' : 'inherit',
          opacity: tone === 'paper' ? 1 : 0.85,
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
      id="product"
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
        Built for builders
      </span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5.5vw, 48px)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: '12px 0 48px',
          color: 'var(--fg-1)',
          maxWidth: 780,
        }}
      >
        A safety net for <em style={{ fontStyle: 'italic' }}>bold ideas</em>.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        <FeatureCard
          icon={GitBranch}
          title="Checkpoints"
          body="Every change is a branch. Try five ideas, keep the one that works, throw away the rest with zero regret."
        />
        <FeatureCard
          icon={RotateCcw}
          title="Time travel"
          body="Scrub through your project like a video. See what the agent did, where, and why — no git degree required."
          tone="hero"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Guardrails"
          body="Tests run on every checkpoint. Secrets stay out of prompts. You stay in flow, not firefighting."
        />
        <FeatureCard
          icon={Sparkles}
          title="Vibe-first prompts"
          body="Describe the feel. The agent handles the plumbing. If it&rsquo;s not right, just say so — in plain language."
        />
        <FeatureCard
          icon={Terminal}
          title="CLI that stays put"
          body="One install, zero config. Works alongside whatever editor, terminal, or workflow you already love."
        />
        <FeatureCard
          icon={Users}
          title="A real community"
          body="Thousands of vibe coders swapping prompts, patterns, and first-launch wins. You&rsquo;re not building alone."
          tone="ink"
        />
      </div>
    </section>
  );
}
