'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type NavProps = {
  onCta?: () => void;
};

const NAV_LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#how', label: 'How it works' },
  { href: '#changelog', label: 'Changelog' },
  { href: '#docs', label: 'Docs' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/newsletter', label: 'Newsletter' },
] as const;

export function Nav({ onCta }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleCta = () => {
    setMenuOpen(false);
    onCta?.();
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--bg)',
        borderBottom:
          scrolled || menuOpen
            ? '1px solid var(--border-1)'
            : '1px solid transparent',
        transition: 'border-color 160ms cubic-bezier(0.2, 0.9, 0.3, 1)',
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        <Link
          href="/"
          aria-label="OngoingAI — home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: 'var(--fg-1)',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={28}
            height={28}
            style={{ display: 'block', borderRadius: 6 }}
            priority
          />
          OngoingAI
        </Link>

        <div
          className="nav-desktop-links"
          style={{
            gap: 28,
            alignItems: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--fg-2)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="nav-desktop-cta"
          style={{ gap: 10, alignItems: 'center' }}
        >
          <a
            href="#signin"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--fg-2)',
              textDecoration: 'none',
            }}
          >
            Sign in
          </a>
          <button
            onClick={handleCta}
            style={{
              background: 'var(--ink-900)',
              color: 'var(--ink-50)',
              padding: '9px 16px',
              borderRadius: 999,
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try it →
          </button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="nav-mobile-toggle"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            background: 'transparent',
            border: '1px solid var(--border-2)',
            borderRadius: 10,
            color: 'var(--fg-1)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className="nav-mobile-panel"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
        style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--border-1)',
          padding: '16px 32px 24px',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--fg-1)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#signin"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--fg-1)',
                textDecoration: 'none',
              }}
            >
              Sign in
            </a>
          </li>
        </ul>
        <button
          onClick={handleCta}
          style={{
            marginTop: 16,
            width: '100%',
            background: 'var(--ink-900)',
            color: 'var(--ink-50)',
            padding: '14px 20px',
            borderRadius: 10,
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try it →
        </button>
      </div>

    </nav>
  );
}
