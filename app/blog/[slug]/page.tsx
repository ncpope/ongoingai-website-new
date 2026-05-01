import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PortableText,
  type PortableTextBlockComponent,
  type PortableTextComponents,
} from '@portabletext/react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getBlogPost } from '@/lib/sanity';
import { getAnswersForPost } from '@/lib/content/answers';
import { NATHAN, PEOPLE, SITE_URL, absoluteUrl } from '@/lib/site';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  renderJsonLd,
} from '@/lib/jsonld';
import {
  blockPlainText,
  excerptFromBody,
  slugifyHeading,
} from '@/lib/portable-text-utils';

export const revalidate = 60;

type Params = { slug: string };

function ogImageUrl(title: string): string {
  const params = new URLSearchParams({
    title,
    eyebrow: 'OngoingAI · Blog',
  });
  return `${SITE_URL}/og?${params.toString()}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post not found — OngoingAI' };

  const description =
    post.description?.trim() || excerptFromBody(post.body) || undefined;
  const url = `/blog/${post.slug}`;
  const ogImage = ogImageUrl(post.title);

  return {
    title: `${post.title} — OngoingAI`,
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      ...(description ? { description } : {}),
      url,
      siteName: 'OngoingAI',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [NATHAN.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      ...(description ? { description } : {}),
      images: [ogImage],
    },
    authors: [{ name: NATHAN.name }],
  };
}

function buildHeadingComponent(level: 'h1' | 'h2' | 'h3' | 'h4') {
  const margin =
    level === 'h1'
      ? '64px 0 16px'
      : level === 'h2'
        ? '48px 0 16px'
        : level === 'h3'
          ? '32px 0 12px'
          : '24px 0 8px';
  const fontFamily =
    level === 'h1' || level === 'h2'
      ? 'var(--font-display)'
      : 'var(--font-sans)';
  const fontWeight = level === 'h1' || level === 'h2' ? 400 : 600;
  const fontSize = `var(--t-${level})`;
  const letterSpacing =
    level === 'h1' || level === 'h2'
      ? 'var(--tr-tight)'
      : level === 'h3'
        ? 'var(--tr-snug)'
        : undefined;

  const Heading: PortableTextBlockComponent = ({ children, value }) => {
    const Tag = level;
    const text = blockPlainText(value);
    const id = text ? slugifyHeading(text) : undefined;
    return (
      <Tag
        id={id}
        style={{
          fontFamily,
          fontWeight,
          fontSize,
          lineHeight: 'var(--lh-heading)',
          ...(letterSpacing ? { letterSpacing } : {}),
          color: 'var(--fg-1)',
          margin,
          scrollMarginTop: 80,
        }}
      >
        {children}
      </Tag>
    );
  };
  return Heading;
}

const components: PortableTextComponents = {
  block: {
    h1: buildHeadingComponent('h1'),
    h2: buildHeadingComponent('h2'),
    h3: buildHeadingComponent('h3'),
    h4: buildHeadingComponent('h4'),
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
  types: {
    image: ({ value }) => {
      const v = value as { url?: string; alt?: string; caption?: string };
      if (!v?.url) return null;
      return (
        <figure style={{ margin: '32px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.url}
            alt={v.alt ?? ''}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 8,
            }}
          />
          {v.caption && (
            <figcaption
              style={{
                marginTop: 8,
                fontSize: 'var(--t-small)',
                color: 'var(--fg-3)',
                textAlign: 'center',
              }}
            >
              {v.caption}
            </figcaption>
          )}
        </figure>
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
  if (!Array.isArray(body) || body.length === 0) return [];
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
  const relatedAnswers = getAnswersForPost(post.slug);
  const author = PEOPLE[NATHAN.id];

  const description =
    post.description?.trim() || excerptFromBody(post.body) || undefined;
  const ogImage = ogImageUrl(post.title);

  const jsonLd = renderJsonLd(
    blogPostingJsonLd({
      title: post.title,
      slug: post.slug,
      description,
      image: ogImage,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      authorId: NATHAN.id,
    }),
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  );

  const showUpdated =
    new Date(post.updatedAt).toDateString() !==
    new Date(post.publishedAt).toDateString();

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

        <header style={{ marginBottom: 48 }}>
          <span
            className="eyebrow"
            style={{ display: 'block', marginBottom: 16 }}
          >
            {formatDate(post.publishedAt)}
            {showUpdated && ` · Updated ${formatDate(post.updatedAt)}`}
          </span>
          <h1
            className="display-3"
            style={{ margin: 0, maxWidth: 680 }}
          >
            {post.title}
          </h1>
          {author && (
            <p
              style={{
                margin: '20px 0 0',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--t-small)',
                color: 'var(--fg-3)',
              }}
            >
              By <span style={{ color: 'var(--fg-2)' }}>{author.name}</span> ·{' '}
              {author.role}
            </p>
          )}
        </header>

        <div>
          <PortableText value={blocks as never} components={components} />
        </div>

        {relatedAnswers.length > 0 && (
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
              {relatedAnswers.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/answers/${a.slug}`}
                    style={{
                      color: 'var(--orange-600)',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--orange-200)',
                      textUnderlineOffset: 3,
                    }}
                  >
                    {a.question}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
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
