import Image from 'next/image';
import Link from 'next/link';

type FooterItem = { label: string; href: string };

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
                fontSize: 32,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '24px 0 0',
                color: 'var(--ink-50)',
                maxWidth: 360,
              }}
            >
              Keep <em style={{ fontStyle: 'italic' }}>vibing</em>. Keep building.
            </p>
          </div>
          <FooterCol
            heading="Product"
            items={[
              { label: 'Overview', href: '#' },
              { label: 'Checkpoints', href: '#' },
              { label: 'Time travel', href: '#' },
              { label: 'Pricing', href: '#pricing' },
            ]}
          />
          <FooterCol
            heading="Resources"
            items={[
              { label: 'Newsletter', href: '/newsletter' },
              { label: 'Docs', href: '#' },
              { label: 'Changelog', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Guides', href: '#' },
            ]}
          />
          <FooterCol
            heading="Company"
            items={[
              { label: 'About', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Status', href: '#' },
              { label: 'Contact', href: '#' },
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
          <span>© 2026 OngoingAI · Built by and for vibe coders</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Privacy
            </a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Terms
            </a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
