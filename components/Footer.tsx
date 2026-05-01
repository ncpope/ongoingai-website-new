import Image from 'next/image';
import Link from 'next/link';

const YOUTUBE_URL =
  'https://www.youtube.com/channel/UCusiu-uFL2PAtdGIaGg7PZw?sub_confirmation=1';
const X_URL = 'https://x.com/ongoingai';

type FooterItem = { label: string; href: string; external?: boolean };

type FooterColProps = {
  heading: string;
  items: FooterItem[];
};

function FooterCol({ heading, items }: FooterColProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-400)',
        }}
      >
        {heading}
      </span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          {...(item.external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          style={{
            color: 'var(--ink-100)',
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink-900)',
        color: 'var(--ink-50)',
        padding: '80px 32px 40px',
        marginTop: 48,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 64,
          }}
        >
          <div style={{ gridColumn: 'span 1', minWidth: 240 }}>
            <Link
              href="/"
              aria-label="OngoingAI — home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                letterSpacing: '-0.02em',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Image
                src="/logo-mark.png"
                alt=""
                width={40}
                height={40}
                style={{ display: 'block', borderRadius: 8 }}
              />
              OngoingAI
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '24px 0 0',
                color: 'var(--ink-50)',
                maxWidth: 360,
              }}
            >
              Be the answer <em style={{ fontStyle: 'italic' }}>LLMs</em> cite.
            </p>
          </div>
          <FooterCol
            heading="Product"
            items={[
              { label: 'How it works', href: '/#how-it-works' },
              { label: 'Join waitlist', href: '/#waitlist' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
          <FooterCol
            heading="Subscribe"
            items={[
              { label: 'Newsletter', href: '/newsletter' },
            ]}
          />
          <FooterCol
            heading="Socials"
            items={[
              { label: 'YouTube', href: YOUTUBE_URL, external: true },
              { label: 'X / Twitter', href: X_URL, external: true },
            ]}
          />
        </div>
        <div
          style={{
            borderTop: '1px solid var(--ink-700)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--ink-400)',
            letterSpacing: '0.04em',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span>© 2026 OngoingAI · Generative Engine Optimization</span>
        </div>
      </div>
    </footer>
  );
}
