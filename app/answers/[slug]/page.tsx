import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import {
  getAnswer,
  getAnswerSlugs,
  resolveRelatedAnswers,
} from '@/lib/content/answers';
import { getGlossaryEntry } from '@/lib/content/glossary';
import { PEOPLE } from '@/lib/site';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  renderJsonLd,
} from '@/lib/jsonld';

export const revalidate = 60;

type Params = { slug: string };

export function generateStaticParams() {
  return getAnswerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const answer = getAnswer(slug);
  if (!answer) return { title: 'Answer not found — OngoingAI' };
  return {
    title: answer.seoTitle ?? `${answer.question} — OngoingAI`,
    description: answer.seoDescription ?? answer.shortAnswer,
    alternates: { canonical: `/answers/${answer.slug}` },
    openGraph: {
      title: answer.question,
      description: answer.shortAnswer,
      type: 'article',
      url: `/answers/${answer.slug}`,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const answer = getAnswer(slug);
  if (!answer) notFound();

  const related = resolveRelatedAnswers(answer.relatedAnswerSlugs);
  const glossary = answer.glossaryTermSlug
    ? getGlossaryEntry(answer.glossaryTermSlug)
    : null;
  const author = PEOPLE[answer.authorId];

  const jsonLd = renderJsonLd(
    articleJsonLd(answer),
    faqPageJsonLd(answer.faqs),
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Answers', url: '/answers' },
      { name: answer.question, url: `/answers/${answer.slug}` },
    ]),
  );

  return (
    <>
      <Nav />
      <article
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '80px 32px 64px',
        }}
      >
        <Link
          href="/answers"
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
          ← All answers
        </Link>

        <header style={{ marginBottom: 40 }}>
          <span
            className="eyebrow"
            style={{ display: 'block', marginBottom: 16 }}
          >
            Answer
          </span>
          <h1
            className="display-3"
            style={{ margin: 0, maxWidth: 680 }}
          >
            {answer.question}
          </h1>
        </header>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 24,
            lineHeight: 1.4,
            letterSpacing: 'var(--tr-snug)',
            color: 'var(--fg-1)',
            margin: '0 0 40px',
            paddingBottom: 32,
            borderBottom: '1px solid var(--border-1)',
          }}
        >
          {answer.shortAnswer}
        </p>

        <div>
          {answer.expansion.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 'var(--t-body)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--fg-2)',
                margin: '0 0 20px',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {answer.contrast && (
          <blockquote
            style={{
              margin: '40px 0',
              padding: '16px 0 16px 20px',
              borderLeft: '2px solid var(--orange-400)',
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              lineHeight: 1.4,
              fontStyle: 'italic',
              color: 'var(--fg-1)',
            }}
          >
            {answer.contrast}
          </blockquote>
        )}

        <section style={{ margin: '48px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'var(--t-h2)',
              lineHeight: 'var(--lh-heading)',
              letterSpacing: 'var(--tr-tight)',
              color: 'var(--fg-1)',
              margin: '0 0 16px',
            }}
          >
            {answer.criteria.heading}
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: 24,
              color: 'var(--fg-2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {answer.criteria.items.map((item, i) => (
              <li
                key={i}
                style={{
                  lineHeight: 'var(--lh-body)',
                  fontSize: 'var(--t-body)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            margin: '48px 0',
            padding: '24px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'var(--t-h4)',
              color: 'var(--fg-1)',
              margin: '0 0 16px',
            }}
          >
            Example
          </h3>
          <div style={{ marginBottom: 16 }}>
            <span
              className="eyebrow"
              style={{ color: 'var(--danger)', display: 'block', marginBottom: 6 }}
            >
              Bad
            </span>
            <p
              style={{
                margin: 0,
                color: 'var(--fg-2)',
                fontStyle: 'italic',
              }}
            >
              {answer.example.bad}
            </p>
          </div>
          <div>
            <span
              className="eyebrow"
              style={{ color: 'var(--success)', display: 'block', marginBottom: 6 }}
            >
              Good
            </span>
            <p
              style={{
                margin: 0,
                color: 'var(--fg-1)',
                fontWeight: 500,
              }}
            >
              {answer.example.good}
            </p>
          </div>
          {answer.example.note && (
            <p
              style={{
                margin: '16px 0 0',
                fontSize: 'var(--t-small)',
                color: 'var(--fg-3)',
              }}
            >
              {answer.example.note}
            </p>
          )}
        </section>

        {answer.memorableLine && (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 28,
              lineHeight: 1.3,
              letterSpacing: 'var(--tr-tight)',
              color: 'var(--fg-1)',
              textAlign: 'center',
              margin: '64px auto',
              maxWidth: 600,
            }}
          >
            “{answer.memorableLine}”
          </p>
        )}

        {answer.faqs.length > 0 && (
          <section style={{ margin: '48px 0' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'var(--t-h2)',
                lineHeight: 'var(--lh-heading)',
                letterSpacing: 'var(--tr-tight)',
                color: 'var(--fg-1)',
                margin: '0 0 24px',
              }}
            >
              Common follow-up questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {answer.faqs.map((faq, i) => (
                <div key={i}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 'var(--t-h4)',
                      color: 'var(--fg-1)',
                      margin: '0 0 8px',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--fg-2)',
                      lineHeight: 'var(--lh-body)',
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section
            style={{
              margin: '64px 0 0',
              paddingTop: 32,
              borderTop: '1px solid var(--border-1)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'var(--t-h4)',
                color: 'var(--fg-1)',
                margin: '0 0 16px',
              }}
            >
              Related answers
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/answers/${r.slug}`}
                    style={{
                      color: 'var(--orange-600)',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--orange-200)',
                      textUnderlineOffset: 3,
                    }}
                  >
                    {r.question}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {glossary && (
          <p
            style={{
              margin: '32px 0 0',
              color: 'var(--fg-3)',
              fontSize: 'var(--t-small)',
            }}
          >
            See also the glossary entry for{' '}
            <Link
              href={`/glossary/${glossary.slug}`}
              style={{
                color: 'var(--orange-600)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--orange-200)',
                textUnderlineOffset: 3,
              }}
            >
              {glossary.term}
            </Link>
            .
          </p>
        )}

        <footer
          style={{
            margin: '64px 0 0',
            paddingTop: 24,
            borderTop: '1px solid var(--border-1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            color: 'var(--fg-3)',
            fontSize: 'var(--t-small)',
          }}
        >
          {author && <span>By {author.name} · {author.role}</span>}
          <span>
            Published {formatDate(answer.publishedAt)}
            {answer.lastUpdated !== answer.publishedAt &&
              ` · Updated ${formatDate(answer.lastUpdated)}`}
          </span>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Footer />
    </>
  );
}
