'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { joinWaitlist, type WaitlistState } from '@/app/waitlist-actions';

const INITIAL: WaitlistState = { ok: false };

export function Hero() {
  const [state, action] = useFormState(joinWaitlist, INITIAL);

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
        Generative Engine Optimization · Early access
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
        Be the answer<br />
        <em style={{ fontStyle: 'italic' }}>ChatGPT</em> cites.
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
        When someone asks an LLM about your category, your site should be the
        source. OngoingAI scans what you&rsquo;ve published, finds the gaps
        blocking citation, and gives you the exact pages to write next —
        grounded in your own ICP, not generic keywords.
      </p>

      {state.ok ? (
        <SuccessNote email={state.email ?? ''} />
      ) : (
        <form action={action} style={formStyles.form}>
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            aria-label="Email"
            style={formStyles.input}
          />
          <input
            type="text"
            name="siteUrl"
            placeholder="yourwebsite.com (optional)"
            aria-label="Your website (optional)"
            style={formStyles.input}
          />
          <SubmitButton />
        </form>
      )}

      {state.error ? (
        <p style={{ marginTop: 12, fontSize: 14, color: 'var(--orange-700)' }}>
          {state.error}
        </p>
      ) : (
        <p
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            letterSpacing: '0.04em',
          }}
        >
          We&rsquo;ll email when free scans open up. No spam.
        </p>
      )}
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={formStyles.button}>
      {pending ? 'Joining…' : 'Get on the waitlist →'}
    </button>
  );
}

function SuccessNote({ email }: { email: string }) {
  return (
    <div
      style={{
        marginTop: 36,
        padding: '20px 24px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--orange-200)',
        borderRadius: 12,
        maxWidth: 640,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: 'var(--fg-1)',
        }}
      >
        You&rsquo;re on the list. We&rsquo;ll email <strong>{email}</strong>{' '}
        when scans open up.
      </p>
    </div>
  );
}

const formStyles = {
  form: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 10,
    marginTop: 36,
    alignItems: 'center',
    maxWidth: 640,
  },
  input: {
    flex: '1 1 220px',
    minWidth: 0,
    padding: '13px 16px',
    border: '1px solid var(--border-2)',
    borderRadius: 10,
    background: 'var(--bg-elevated)',
    color: 'var(--fg-1)',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    outline: 'none',
  },
  button: {
    background: 'var(--orange-400)',
    color: 'var(--fg-on-accent)',
    border: '1px solid var(--ink-900)',
    padding: '13px 22px',
    borderRadius: 10,
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
};
