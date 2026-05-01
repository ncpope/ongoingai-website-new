import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import {
  getGlossaryEntry,
  getGlossarySlugs,
} from '@/lib/content/glossary';
import { getAnswer } from '@/lib/content/answers';
import {
  breadcrumbJsonLd,
  definedTermJsonLd,
  renderJsonLd,
} from '@/lib/jsonld';

export const revalidate = 60;

type Params = { slug: string };

export function generateStaticParams() {
  return getGlossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return { title: 'Glossary entry not found — OngoingAI' };
  return {
    title: entry.seoTitle ?? `${entry.term} — Glossary — OngoingAI`,
    description: entry.seoDescription ?? entry.definition,
    alternates: { canonical: `/glossary/${entry.slug}` },
  };
}

export default async function GlossaryEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const answer = entry.answerSlug ? getAnswer(entry.answerSlug) : null;

  const jsonLd = renderJsonLd(
    definedTermJsonLd(entry),
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: entry.term, url: `/glossary/${entry.slug}` },
    ]),
  );

  return (
    <>
      <Nav />
      <article
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '80px 32px 64px',
        }}
      >
        <Link
          href="/glossary"
          style={{
            display: 'inline-block',
            marginBottom: 32,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: 'var(--tr-wide)',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
            textDecoration: 'none',
          }}
        >
          ← All terms
        </Link>

        <header style={{ marginBottom: 32 }}>
          <span
            className="eyebrow"
            style={{ display: 'block', marginBottom: 16 }}
          >
            Glossary
          </span>
          <h1
            className="display-3"
            style={{ margin: 0 }}
          >
            {entry.term}
          </h1>
        </header>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.4,
            letterSpacing: 'var(--tr-snug)',
            color: 'var(--fg-1)',
            margin: '0 0 24px',
          }}
        >
          {entry.definition}
        </p>

        <p
          style={{
            fontSize: 'var(--t-body)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--fg-2)',
            margin: '0 0 16px',
          }}
        >
          {entry.expansion}
        </p>

        {entry.example && (
          <p
            style={{
              fontSize: 'var(--t-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--fg-2)',
              margin: '0 0 16px',
              fontStyle: 'italic',
            }}
          >
            Example: {entry.example}
          </p>
        )}

        {answer && (
          <p
            style={{
              margin: '32px 0 0',
              paddingTop: 24,
              borderTop: '1px solid var(--border-1)',
              color: 'var(--fg-3)',
              fontSize: 'var(--t-small)',
            }}
          >
            Read more:{' '}
            <Link
              href={`/answers/${answer.slug}`}
              style={{
                color: 'var(--orange-600)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--orange-200)',
                textUnderlineOffset: 3,
              }}
            >
              {answer.question}
            </Link>
          </p>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Footer />
    </>
  );
}
