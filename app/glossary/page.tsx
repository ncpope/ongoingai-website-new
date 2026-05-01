import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { listGlossary } from '@/lib/content/glossary';

export const metadata: Metadata = {
  title: 'Glossary — OngoingAI',
  description:
    'Short, precise definitions of terms used in generative engine optimization (GEO), citability, and AI-search content engineering.',
  alternates: { canonical: '/glossary' },
};

export const revalidate = 60;

export default function GlossaryIndexPage() {
  const entries = listGlossary();

  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '96px 32px 64px',
        }}
      >
        <header style={{ marginBottom: 64 }}>
          <span
            className="eyebrow"
            style={{ display: 'block', marginBottom: 16 }}
          >
            Glossary
          </span>
          <h1
            className="display-2"
            style={{ marginBottom: 16, maxWidth: 720 }}
          >
            Terms used in AI search.
          </h1>
          <p
            style={{
              maxWidth: 620,
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--fg-3)',
            }}
          >
            One-line definitions for GEO, citability, and the rest of the
            content-engineering vocabulary. Each entry links to the deeper
            answer page.
          </p>
        </header>

        {entries.length === 0 ? (
          <p
            style={{
              color: 'var(--fg-3)',
              padding: '32px 0',
              borderTop: '1px solid var(--border-1)',
              borderBottom: '1px solid var(--border-1)',
            }}
          >
            Glossary entries coming soon. In the meantime, the{' '}
            <Link
              href="/answers"
              style={{
                color: 'var(--orange-600)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--orange-200)',
                textUnderlineOffset: 3,
              }}
            >
              answers
            </Link>{' '}
            cover the same vocabulary in depth.
          </p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {entries.map((entry, idx) => (
              <li
                key={entry.slug}
                style={{
                  borderTop:
                    idx === 0 ? '1px solid var(--border-1)' : undefined,
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                <Link
                  href={`/glossary/${entry.slug}`}
                  prefetch={false}
                  style={{
                    display: 'block',
                    padding: '24px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      lineHeight: 1.2,
                      letterSpacing: 'var(--tr-tight)',
                      margin: '0 0 8px',
                      color: 'var(--fg-1)',
                    }}
                  >
                    {entry.term}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--fg-3)',
                      lineHeight: 'var(--lh-body)',
                      maxWidth: 680,
                    }}
                  >
                    {entry.definition}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
