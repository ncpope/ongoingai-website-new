import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { listAnswers } from '@/lib/content/answers';

export const metadata: Metadata = {
  title: 'Answers — OngoingAI',
  description:
    'Direct, citable answers to the most common questions about generative engine optimization, citability, and getting your content used by AI systems like ChatGPT, Claude, Perplexity, and Gemini.',
  alternates: { canonical: '/answers' },
};

export const revalidate = 60;

export default function AnswersIndexPage() {
  const answers = listAnswers();

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
            Answers
          </span>
          <h1
            className="display-2"
            style={{ marginBottom: 16, maxWidth: 720 }}
          >
            Citable answers about AI search.
          </h1>
          <p
            style={{
              maxWidth: 620,
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--fg-3)',
            }}
          >
            Direct answers to the questions founders are asking ChatGPT,
            Claude, Perplexity, and Gemini about generative engine
            optimization. Each page answers one question, end to end.
          </p>
        </header>

        {answers.length === 0 ? (
          <p style={{ color: 'var(--fg-3)' }}>No answers yet.</p>
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
            {answers.map((answer, idx) => (
              <li
                key={answer.slug}
                style={{
                  borderTop:
                    idx === 0 ? '1px solid var(--border-1)' : undefined,
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                <Link
                  href={`/answers/${answer.slug}`}
                  prefetch={false}
                  style={{
                    display: 'block',
                    padding: '32px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 32,
                      lineHeight: 1.15,
                      letterSpacing: 'var(--tr-tight)',
                      margin: '0 0 12px',
                      color: 'var(--fg-1)',
                    }}
                  >
                    {answer.question}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: 'var(--fg-3)',
                      maxWidth: 680,
                    }}
                  >
                    {answer.shortAnswer}
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
