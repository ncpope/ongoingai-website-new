import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { NewsletterForm } from './NewsletterForm';

export const metadata: Metadata = {
  title: 'Subscribe — OngoingAI',
  description:
    "Get the OngoingAI newsletter. Product updates, tutorials, changelog, community — pick what you want, on your cadence.",
};

export default function NewsletterPage() {
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
          Newsletter
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
          Stay in the <em style={{ fontStyle: 'italic' }}>loop</em>.
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--fg-2)',
            maxWidth: 540,
            margin: '0 0 40px',
          }}
        >
          The thing we&apos;re building, the things we&apos;re learning, the
          stuff we ship. No spam, no growth-hack tricks.
        </p>
        <NewsletterForm />
      </main>
      <Footer />
    </>
  );
}
