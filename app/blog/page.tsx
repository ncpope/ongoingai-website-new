import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { listBlogPosts, isSanityConfigured } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Blog — OngoingAI',
  description:
    'Field notes on getting cited by AI search engines, content engineering, and what actually moves the needle.',
  alternates: { canonical: '/blog' },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const configured = isSanityConfigured();
  const posts = configured ? await listBlogPosts() : [];

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
            Blog
          </span>
          <h1
            className="display-2"
            style={{ marginBottom: 16, maxWidth: 720 }}
          >
            Field notes on AI search visibility.
          </h1>
          <p
            style={{
              maxWidth: 600,
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--fg-3)',
            }}
          >
            Content engineering, citability, and what actually moves the
            needle for early-stage founders.
          </p>
        </header>

        {!configured ? (
          <p style={{ color: 'var(--fg-3)' }}>Blog is not configured yet.</p>
        ) : posts.length === 0 ? (
          <p style={{ color: 'var(--fg-3)' }}>No posts yet.</p>
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
            {posts.map((post, idx) => (
              <li
                key={post._id}
                style={{
                  borderTop:
                    idx === 0 ? '1px solid var(--border-1)' : undefined,
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  prefetch={false}
                  style={{
                    display: 'block',
                    padding: '32px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span
                    className="eyebrow"
                    style={{ display: 'block', marginBottom: 12 }}
                  >
                    {new Date(post.updatedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 32,
                      lineHeight: 1.15,
                      letterSpacing: 'var(--tr-tight)',
                      margin: 0,
                      color: 'var(--fg-1)',
                    }}
                  >
                    {post.title}
                  </h2>
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
