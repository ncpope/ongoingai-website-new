import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getBlogPost } from '@/lib/sanity';

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post not found — OngoingAI' };
  return {
    title: `${post.title} — OngoingAI`,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'var(--t-h1)',
          lineHeight: 'var(--lh-heading)',
          letterSpacing: 'var(--tr-tight)',
          color: 'var(--fg-1)',
          margin: '64px 0 16px',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'var(--t-h2)',
          lineHeight: 'var(--lh-heading)',
          letterSpacing: 'var(--tr-tight)',
          color: 'var(--fg-1)',
          margin: '48px 0 16px',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 'var(--t-h3)',
          lineHeight: 'var(--lh-heading)',
          letterSpacing: 'var(--tr-snug)',
          color: 'var(--fg-1)',
          margin: '32px 0 12px',
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 'var(--t-h4)',
          color: 'var(--fg-1)',
          margin: '24px 0 8px',
        }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: '24px 0',
          padding: '4px 0 4px 20px',
          borderLeft: '2px solid var(--orange-400)',
          fontStyle: 'italic',
          color: 'var(--fg-2)',
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p
        style={{
          fontSize: 'var(--t-body)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--fg-2)',
          margin: '16px 0',
        }}
      >
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          margin: '16px 0',
          paddingLeft: 24,
          color: 'var(--fg-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          margin: '16px 0',
          paddingLeft: 24,
          color: 'var(--fg-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ lineHeight: 'var(--lh-body)' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ lineHeight: 'var(--lh-body)' }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: 'var(--fg-1)' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    code: ({ children }) => (
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9em',
          background: 'var(--ink-100)',
          padding: '2px 6px',
          borderRadius: 4,
          color: 'var(--fg-1)',
        }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          style={{
            color: 'var(--orange-600)',
            textDecoration: 'underline',
            textDecorationColor: 'var(--orange-200)',
            textUnderlineOffset: 3,
          }}
          {...(isExternal
            ? { target: '_blank', rel: 'noreferrer noopener' }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

// The dashboard publishes drafts where the markdown begins with `# {title}`.
// The page header already shows the title, so we strip the leading heading
// block when its plain text matches.
function stripDuplicateLeadingHeading(
  body: unknown,
  title: string,
): unknown[] {
  if (!Array.isArray(body) || body.length === 0) return body ?? [];
  const first = body[0] as
    | {
        _type?: string;
        style?: string;
        children?: Array<{ text?: string }>;
      }
    | undefined;
  if (!first || first._type !== 'block') return body;
  const isHeading = first.style && /^h[1-3]$/.test(first.style);
  if (!isHeading) return body;
  const plain = (first.children ?? [])
    .map((c) => c.text ?? '')
    .join('')
    .trim();
  if (plain.toLowerCase() === title.trim().toLowerCase()) {
    return body.slice(1);
  }
  return body;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const blocks = stripDuplicateLeadingHeading(post.body, post.title);

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
          href="/blog"
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
          ← Back to blog
        </Link>

        <header style={{ marginBottom: 56 }}>
          <span
            className="eyebrow"
            style={{ display: 'block', marginBottom: 16 }}
          >
            {new Date(post.updatedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <h1
            className="display-3"
            style={{ margin: 0, maxWidth: 680 }}
          >
            {post.title}
          </h1>
        </header>

        <div>
          <PortableText value={blocks as never} components={components} />
        </div>
      </article>
      <Footer />
    </>
  );
}
