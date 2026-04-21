import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "You're in — OngoingAI",
  description: 'You signed up for the OngoingAI newsletter.',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SearchParams = { email?: string };

export default function NewsletterSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = (searchParams.email ?? '').trim().toLowerCase();
  const email = EMAIL_RE.test(raw) ? raw : null;

  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '64px 32px 96px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'var(--orange-50)',
            border: '1px solid var(--orange-200)',
            color: 'var(--orange-600)',
            marginBottom: 24,
          }}
        >
          <CheckCircle2 size={28} strokeWidth={1.5} />
        </div>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--orange-500)',
          }}
        >
          You&apos;re in
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '12px 0 16px',
          }}
        >
          Almost done.
          <br />
          <em style={{ fontStyle: 'italic' }}>Check your inbox.</em>
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--fg-2)',
            margin: '0 0 32px',
            maxWidth: 540,
          }}
        >
          {email ? (
            <>
              We sent a confirmation link to{' '}
              <strong style={{ color: 'var(--fg-1)' }}>{email}</strong>. Click
              it to finish subscribing — should land in under a minute.
            </>
          ) : (
            <>
              We sent a confirmation link to your inbox. Click it to finish
              subscribing — should land in under a minute.
            </>
          )}
        </p>

        <div
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-1)',
            borderRadius: 14,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            What happens next
          </h2>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <NextStep
              num="1"
              title="Confirm your email"
              body="Open the message from us and click the confirmation link. We won't add you to anything until you do."
            />
            <NextStep
              num="2"
              title="First issue lands soon"
              body="Once confirmed, you'll get the next scheduled issue based on the cadence you picked."
            />
            <NextStep
              num="3"
              title="Change your mind anytime"
              body="Every email has a one-click unsubscribe. No forms, no surveys, no friction."
            />
          </ul>
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.04em',
          }}
        >
          <Mail size={14} strokeWidth={1.5} />
          Didn&apos;t see it? Check your spam folder, or{' '}
          <Link
            href="/newsletter"
            style={{ color: 'var(--orange-600)', textDecoration: 'underline' }}
          >
            try again
          </Link>
          .
        </div>
      </main>
      <Footer />
    </>
  );
}

function NextStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <li style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span
        style={{
          flexShrink: 0,
          width: 26,
          height: 26,
          borderRadius: 999,
          background: 'var(--ink-900)',
          color: 'var(--ink-50)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {num}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>
          {title}
        </span>
        <span style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.55 }}>
          {body}
        </span>
      </div>
    </li>
  );
}
